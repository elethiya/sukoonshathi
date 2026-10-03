# Sukoon Saathi — Admin Studio

A dedicated, lightweight Go backend designed **strictly for product, specialist, and content management with one-click GitHub deployments, safe ZIP archive backups, and comprehensive activity logging**.

> [!IMPORTANT]
> **This backend does NOT host or link with the static public website.**
> The public website remains 100% static (HTML/CSS/JS) and can be hosted anywhere (GitHub Pages, Netlify, Cloudflare Pages, Vercel).
> This Go backend runs locally (or on your private admin machine) only when you want to update content and push to GitHub.

---

## Features

1. **Terminal & File Activity Logging (`backend/logs/<date>/<time>.log`)**:
   - Every single minor activity (HTTP requests with methods, durations, status codes, payload bytes; login attempts; data reads/writes; image uploads; backup operations; deploy/git actions) is logged to the terminal stdout in real-time.
   - Clean, professional format without emojis or colored tags: `YYYY-MM-DD HH:MM:SS [CATEGORY] Message`.
   - Simultaneously recorded and immediately synced to disk in `backend/logs/<date>/<time>.log` (e.g. `backend/logs/2026-10-03/13-22-06.log`).
   - Automatically ignored by Git via `.gitignore`.

2. **Built-in History Page in Admin Studio**:
   - A dedicated **History** tab in the admin panel to monitor and inspect session activity logs.
   - Browse previous log dates and session log files.
   - Live auto-refresh toggle to watch activities stream in real-time.
   - Filter logs by category (`ALL`, `HTTP`, `DATA`, `AUTH`, `BACKUP`, `DEPLOY`, `UPLOAD`, `GIT`) or search text.
   - One-click log file download button (`/api/history/download?date=...&file=...`).

3. **.env Authentication & Access Limiting**:
   - Protected with login authentication using credentials configured in `backend/.env`.
   - In-memory secure cookie sessions (`sukoon_admin_session`).
   - Unauthorized API access blocked with `401 Unauthorized`.
   - Session tracking and logout functionality.

4. **Configurable Target Project Path**:
   - Customize `PROJECT_PATH` and `WEBSITE_NAME` in `.env` to point to any static website root.
   - The UI top bar clearly displays which project is currently active and its filesystem location.

5. **Real ZIP File Backups (No Git Risk)**:
   - Direct Git branch/tag manipulation can break the repository history or corrupt working states.
   - We use real `.zip` archives generated using Go's standard `archive/zip` library.
   - Backups are stored safely in `backend/backups/` and ignored by Git.
   - Automated ZIP creation prior to any Deploy or Reset, plus manual on-demand backups.
   - Download ZIPs directly from your browser, restore any previous snapshot with 1 click, or delete old archives.

6. **Monochromatic & Modern Dark Theme**:
   - Deep obsidian palette with monochromatic neutral tags and clean typography.
   - Zero emojis or distracting colored tags.

7. **Multi-Section Management**:
   - **Products**: Add, edit, delete products, set pricing, calculate MRP discount, upload PNG images into `data/products/`.
   - **Specialists**: Add, edit, delete care practitioners, update credentials, upload avatar PNGs into `data/pfp/`.
   - **About Page**: Edit mission statement, headline, tagline, story paragraphs, stats (`1:1`, `100%`), and care team header.

8. **Reset Changes Safety Button**:
   - Discards uncommitted changes in `data/` and safely reverts to the latest Git commit (`git checkout HEAD -- data/products.json data/specialists.json data/about.json`).
   - Automatically generates a `.zip` archive before resetting so no work is ever permanently lost.

---

## Configuration (`.env`)

Create or edit `backend/.env` (a template is provided in `backend/.env.example`):

```ini
# Admin Studio Credentials
ADMIN_USERNAME=elethiya
ADMIN_PASSWORD=your_password_here

# Session Secret (change in production)
SESSION_SECRET=sukoon-saathi-admin-secret-key-change-this

# Target Static Website Configuration
PROJECT_PATH=..
WEBSITE_NAME=Sukoon Saathi Static Website

# Server Port
PORT=8080
```

---

## How to Run

From the project root:
```bash
cd backend
go run main.go
```

Open your browser to:
```
http://localhost:8080
```

Log in using the credentials defined in your `.env`.

---

## Admin Workflow

```
+---------------------------------------------------------------------------------------------------+
|                         Admin Studio (http://localhost:8080)                                      |
|   [Products]     [Specialists]     [About Page]     [ZIP Backups & Archive]     [History]         |
+---------------------------------------------------------------------------------------------------+
        |                |                |                      |                   |
   Edit/Add/Upload  Edit/Add/Upload  Edit Text/Stats   Download / Restore ZIP   View Activity Logs
        |                |                |                      |              (Live Streaming &
        v                v                v                      v               Category Filter)
 [data/products] [data/specialists] [data/about.json]  [backend/backups/*.zip]       |
        |                                                                            v
 Click "Deploy to GitHub" OR "Reset Changes"                         [backend/logs/<date>/<time>.log]
        |
        v
 1. Automatically creates a safety ZIP archive in backend/backups/
 2. If Deploy:
      git add data/
      git commit -m "<custom message>"
      git push origin <branch>
    (No Git tags modified — zero risk of breaking repository)
 3. If Reset:
      git checkout HEAD -- data/products.json data/specialists.json data/about.json
 4. Every step logged to terminal stdout & backend/logs/<date>/<time>.log
```
