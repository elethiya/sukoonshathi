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
4. *(Optional)* At the top of the script, change `NOTIFY_EMAIL` from `"eleyeshussainmollah@gmail.com"` to your own email address to receive instant email notifications for every order, booking, and message.

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
- **Booking ID**: Auto-generated tracking ID (e.g. `BK-84201`)
- **Timestamp (IST)**: Date and time formatted in Indian Standard Time
- **Client Name**: Full client name
- **Phone / WhatsApp**: Contact phone number
- **Email**: Client email
- **Session Type**: Requested service (e.g. Single Session, 4-Session Package, Couples Therapy)
- **Preferred Date**: Requested appointment date
- **Preferred Time**: Requested appointment slot (Morning, Afternoon, Evening)
- **Client Notes**: Background notes or areas of focus
- **Booking Status**: Defaults to `New Request (Pending Confirmation)`

### 3. `Contact Us` Tab
Captures general inquiries and messages:
- **Inquiry ID**: Auto-generated reference ID (e.g. `INQ-39210`)
- **Timestamp (IST)**: Date and time formatted in Indian Standard Time
- **Sender Name**: Name of sender
- **Phone / WhatsApp**: Contact phone number
- **Email**: Sender email
- **Subject**: Message subject / reason for writing
- **Message**: Complete message body
- **Inquiry Status**: Defaults to `New Message (Unread)`

> [!NOTE]
> All 3 tabs are created automatically upon the first submission and styled with Sukoon Forest Green headers (`#0f3d34`), bold white text, frozen top rows, and auto-adjusted column widths.

---

## Complete Multi-Tier Notification System

Sukoon Saathi includes bulletproof HTML email templates designed using pure HTML `<table>` architecture (no flexbox bugs) to ensure clean rendering on all devices (Gmail Web & Mobile, Apple Mail, Outlook):

### 1. Store Orders
- **Admin Alert Email**: Sent immediately to `NOTIFY_EMAIL` with full customer details, phone, delivery address, items table, and total amount.
- **Customer Order Confirmation Receipt**: Sent automatically to customer's email with their Order ID, itemized receipt breakdown table, delivery address, and direct WhatsApp support link.

### 2. Therapy Session Bookings
- **Admin Alert Email**: Sent immediately to `NOTIFY_EMAIL` with Booking ID, client contact details, session type, preferred date & time slot, and client notes.
- **Client Confirmation Email**: Sent automatically to client's email with their Booking ID, booking summary, confidentiality assurance, and next steps.

### 3. Contact Us Inquiries
- **Admin Alert Email**: Sent immediately to `NOTIFY_EMAIL` with Inquiry ID, sender name, contact phone, email, subject, and full message.
- **Sender Confirmation Email**: Sent automatically to sender's email confirming receipt of their inquiry with their Reference ID and expected response time (within 24 hours).

### 4. Direct WhatsApp Alerts & Mobile Google Sheets Notifications
- **Immediate On-Screen WhatsApp Link**: The customer sees their reference ID and a 1-tap WhatsApp button to reach your team directly.
- **Google Sheets Mobile Alerts**: Install the Google Sheets app on your phone, open your spreadsheet on desktop &rarr; **Tools** &rarr; **Notification settings** &rarr; select *"Any changes are made"* and *"Email - right away"* to get instant notifications whenever a new order, booking, or contact inquiry is saved!

---

## Key Features

- **Single Google Sheet Backend**: No MySQL, MongoDB, or paid database services. Everything is saved live in Google Sheets.
- **Instant Order Notifications**: Owner email alert + customer receipt + direct WhatsApp connection.
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
