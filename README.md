# Sukoon Saathi — Mental Health & Holistic Wellness Platform

A serene, mobile-first holistic wellness website and store designed with calming aesthetics, zero external payment gateways, and a **single unified Google Sheets backend** for instant order processing, session bookings, and customer inquiries.

---

## Architecture Overview

```
                      +---------------------------------------+
                      |         Sukoon Saathi Website         |
                      |   (Static HTML5 / CSS3 / Vanilla JS)  |
                      +---------------------------------------+
                                          |
                      +-------------------+-------------------+
                      |                   |                   |
               (Product Orders)   (Session Bookings)   (Contact Messages)
                      |                   |                   |
                      +-------------------+-------------------+
                                          |
                     POST fetch (mode: "no-cors", text/plain)
                                          |
                                          v
                      +---------------------------------------+
                      |       Google Apps Script Webhook      |
                      |       (google-apps-script.gs)         |
                      +---------------------------------------+
                                          |
                                          v
               +-----------------------------------------------------+
               |         ONE SINGLE GOOGLE SHEET DATABASE            |
               |                                                     |
               |  [Tab 1: Orders]         -> E-commerce store orders |
               |  [Tab 2: Book a Session] -> Therapy appointments    |
               |  [Tab 3: Contact Us]     -> General inquiries       |
               +-----------------------------------------------------+
```

---

## 1-Minute Google Sheets Setup Guide

You only need **ONE single Google Sheet** for the entire website. The automated script creates and formats the separate tabs (`Orders`, `Book a Session`, `Contact Us`) automatically.

### Step 1: Create Your Google Sheet
1. Open [Google Sheets](https://sheets.new) in your browser.
2. Name your spreadsheet **"Sukoon Saathi Database"**.

### Step 2: Open Google Apps Script
1. In the Google Sheets top menu, click **Extensions** &rarr; **Apps Script**.
2. Delete any existing starter code in the editor (`myFunction`).
3. Copy the entire contents of [`google-apps-script.gs`](google-apps-script.gs) and paste it into the script editor.
4. *(Optional)* At the top of the script, change `NOTIFY_EMAIL` from `"you@example.com"` to your own email address to receive instant email notifications for every order, booking, and message.

### Step 3: Deploy as a Web App
1. Click **Deploy** (top-right blue button) &rarr; **New deployment**.
2. Click the gear icon (**Select type**) &rarr; choose **Web app**.
3. Configure the deployment settings:
   - **Description**: `Sukoon Saathi Unified Webhook`
   - **Execute as**: `Me (your email address)`
   - **Who has access**: `Anyone` *(Crucial: This allows visitors on your website to submit forms without logging into Google)*
4. Click **Deploy**.
5. When prompted for authorization:
   - Click **Authorize access**.
   - Choose your Google account.
   - If Google displays *"Google hasn’t verified this app"*, click **Advanced** &rarr; click **Go to Sukoon Saathi Unified Webhook (unsafe)** &rarr; click **Allow**.
6. Copy the generated **Web app URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 4: Paste Your URL into the Website
Open [`js/main.js`](js/main.js) and paste your copied Web App URL on **line 6**:

```javascript
// Single Google Sheet Web App URL for Orders, Bookings, and Contact forms
window.SUKOON_SHEET_ENDPOINT = "https://script.google.com/macros/s/PASTE_YOUR_COPIED_URL_HERE/exec";
```

> [!TIP]
> Both the Store checkout ([`js/store.js`](js/store.js)) and the Booking/Contact forms ([`js/main.js`](js/main.js)) share `window.SUKOON_SHEET_ENDPOINT`. You only need to paste the URL **once** in [`js/main.js`](js/main.js)!

---

## How the Single Sheet Works

All submissions automatically route into their designated tab inside the same spreadsheet:

### 1. `Orders` Tab
Captures all product orders placed from the store floating checkout window:
- **Order ID**: Unique alphanumeric identifier (e.g. `SS-47291`)
- **Timestamp (IST)**: Date and time formatted in Indian Standard Time
- **Customer Name**: Full delivery name
- **Phone / WhatsApp**: Customer contact number
- **Email**: Customer email
- **Delivery Address**: Street / House address
- **City**: Destination city
- **PIN Code**: 6-digit postal code
- **Customer Notes**: Special delivery or packaging instructions
- **Ordered Items**: Complete itemized summary with quantities and variant selections
- **Total Items**: Total units ordered
- **Total Amount**: Final payable sum (e.g. `₹1,198`)
- **Order Status**: Defaults to `New Order (Pending Fulfillment)`

### 2. `Book a Session` Tab
Captures therapy, counseling, and mindfulness booking requests:
- **Timestamp (IST)**
- **Name**
- **Phone / WhatsApp**
- **Email**
- **Service Requested** (e.g. 1-on-1 Counseling, Art Therapy, Guided Meditation)
- **Preferred Date**
- **Preferred Time**
- **Client Notes**

### 3. `Contact Us` Tab
Captures general inquiries:
- **Timestamp (IST)**
- **Name**
- **Phone / WhatsApp**
- **Email**
- **Subject**
- **Message**

> [!NOTE]
> When the first submission of any type arrives, the script automatically formats the sheet with a Forest Green brand header (`#0f3d34`), bold white text, frozen header row, and auto-adjusted column widths.

---

## Key Features

- **Single Google Sheet Backend**: No MySQL, MongoDB, or paid database services. Everything is saved live in Google Sheets.
- **Local Backup Protection**: Even if the customer loses internet or the Google Sheets webhook is misconfigured, orders are permanently saved to browser `localStorage` under `sukoon_orders`.
- **Direct WhatsApp Confirmation**: Customers receive their Order ID immediately on screen alongside a one-click WhatsApp button to message your fulfillment team.
- **Scroll Bleed Prevention**: Background page scrolling is strictly contained when any modal, drawer, or checkout floating window is active on both desktop and mobile viewports.
- **Zero Ongoing Server Costs**: Can be hosted on any static platform (GitHub Pages, Vercel, Netlify, Cloudflare Pages, etc.).

---

## Updating the Apps Script Code

If you ever modify [`google-apps-script.gs`](google-apps-script.gs):
1. In Google Sheets, click **Extensions** &rarr; **Apps Script**.
2. Paste the updated code and save (**Ctrl+S** or floppy disk icon).
3. Click **Deploy** &rarr; **Manage deployments**.
4. Click the **Pencil (Edit)** icon on your active deployment.
5. In the **Version** dropdown, select **New version**.
6. Click **Deploy**. (The URL stays exactly the same; you do not need to update your website code).

---

## Local Development

To run the site locally on your computer:

```bash
# Using Python 3:
python3 -m http.server 8000

# Or using Node.js:
npx serve .
```

Open `http://localhost:8000` in your web browser.
