# ECWCPFC — elethiya clients website control panels for clients

A dedicated, lightweight Go backend designed and engineered by **ELETHIYA** strictly for **client website management with real-time live preview, one-click GitHub deployments, safe non-destructive ZIP backups, and comprehensive audit & activity logging**.

> [!IMPORTANT]
> **This backend does NOT host or link with the static public website.**
> The public website remains 100% static (HTML/CSS/JS) and can be hosted anywhere (GitHub Pages, Netlify, Cloudflare Pages, Vercel).
> This Go backend runs locally (or on your private admin workstation) only when you want to update content and push changes to GitHub.

---

## Features

1. **Terminal & Disk Activity Logging (`backend/logs/<date>/<time>.log`)**:
   - Every single minor activity (HTTP requests with methods, durations, status codes, payload bytes; login attempts; data reads/writes; image uploads; backup operations; deploy/git actions) is logged to the terminal stdout in real-time.
   - Clean, professional format without emojis or colored tags: `YYYY-MM-DD HH:MM:SS [CATEGORY] Message`.
   - Simultaneously recorded and immediately flushed to disk in `backend/logs/<date>/<time>.log` (e.g. `backend/logs/2026-10-03/14-28-24.log`).
   - Automatically ignored by Git via `.gitignore`.

2. **Administrative Audit Logs in History Page**:
   - The **History** tab in the Admin Panel exclusively displays structured **Audit Logs** (who modified what, uploaded what file, deployed, or backed up data).
   - Columns: `Timestamp`, `Category`, `Action`, `Target`, `Details`, `User & Client IP`, and `Status`.
   - Category filtering chips (`All Categories`, `Products`, `Specialists`, `About`, `Backups`, `Deploy`, `Reset`, `Auth`, `Uploads`).
   - Live search input across actions, targets, details, users, and IPs.
   - Live auto-refresh polling every 3 seconds.
   - One-click CSV audit trail download (`/api/audit-logs/export`).
   - Terminal logs are kept strictly in the console stdout and disk log files for technical diagnosis.

3. **About Page with Real-Time Live Preview**:
   - Dual split layout: Edit content fields on the left and see an authentic, simulated view of the static website on the right.
   - Real-time reactivity: Keystrokes instantly update the header, mission statement, story paragraphs, stat numbers, and multidisciplinary care team banner.
   - Authentic website aesthetics: Renders in the serene cream paper palette (`#f5eee1`) and forest green serif typography matching the public site.
   - "Reset to Saved" button to quickly revert unsaved edits.

4. **Background Scroll Lock & Modal Stability**:
   - Fixes scroll bleed: Background page scrolling is strictly contained whenever any floating modal (Product, Specialist, Reset, or Deploy) is active (`html.modal-open, body.modal-open`).
   - Zero horizontal layout shift: Built-in `scrollbar-gutter: stable` prevents the window from jiggling or shifting when scrollbars toggle.
   - Smooth popup transitions and backdrop click-to-dismiss.

5. **Deploy to GitHub with Safety ZIP Backups**:
   - Non-destructive: Direct Git branch/tag manipulation is avoided.
   - Every deploy automatically archives all current `data/` files into a timestamped `.zip` inside `backend/backups/` before committing.
   - Staged changes are committed with your custom commit message and pushed to the remote repository.
   - **Post-Deploy "Close" Action**: Once deployment succeeds, the action button immediately switches to a prominent "Close" button for clean one-click dismissal.

6. **.env Authentication & Access Limiting**:
   - Protected with login authentication using credentials configured in `backend/.env`.
   - In-memory secure cookie sessions (`sukoon_admin_session`).
   - Unauthorized API access blocked with `401 Unauthorized`.
   - Configurable `PROJECT_PATH` and `WEBSITE_NAME` to manage any static website repository.

7. **Multi-Section Management**:
   - **Products**: Add, edit, delete products, set pricing, calculate MRP discount, upload PNG images into `data/products/`.
   - **Specialists**: Add, edit, delete care practitioners, update credentials, upload avatar PNGs into `data/pfp/`.
   - **About Page**: Edit mission statement, headline, tagline, story paragraphs, stats (`1:1`, `100%`), and care team header with live preview.
   - **Reset Changes**: Safely revert uncommitted changes in `data/` to the latest Git commit, after creating an automatic safety ZIP archive.

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
+-----------------------------------------------------------------------------------------------------------------+
|                               ECWCPFC by ELETHIYA (http://localhost:8080)                                      |
|   [Products]       [Specialists]       [About Page]           [ZIP Backups & Archive]       [History]           |
|  (Catalog CRUD)  (Care Team CRUD)  (Live Preview Below)      (Safe Non-Git Archives)     (Audit Logs Table)     |
+-----------------------------------------------------------------------------------------------------------------+
         |                 |                 |                           |                         |
    Edit/Upload       Edit/Upload     Live Real-Time View       Download / Restore ZIP         View Audit Actions
         |                 |                 |                           |                   (Filter / CSV Export)
         v                 v                 v                           v                         |
   [data/products]   [data/pfp]       [data/about.json]        [backend/backups/*.zip]             v
         |                 |                 |                                             [backend/logs/audit.json]
         +-----------------+-----------------+
                           |
                           v
          Click "Deploy to GitHub" OR "Reset Changes"
                           |
                           v
          1. Creates a safety ZIP archive in backend/backups/
          2. If Deploy:
               git add data/
               git commit -m "<custom message>"
               git push origin <branch>
               Changes button to "Close" upon completion
          3. If Reset:
               git checkout HEAD -- data/products.json data/specialists.json data/about.json
          4. Full HTTP & system trace logged to terminal stdout & backend/logs/<date>/<time>.log
```
