# Sukoon Saathi — Mental Health & Holistic Wellness Platform

A serene, mobile-first holistic wellness website and store designed with calming aesthetics, zero external payment gateways, a **single unified Google Sheets backend** for instant customer orders, session bookings, and inquiries, and a **private local Go Admin Studio** for seamless content management.

---

## Architecture Overview

```
                      +---------------------------------------+
                      |         Sukoon Saathi Website         |
                      |   (Static HTML5 / CSS3 / Vanilla JS)  |
                      |  Reads: data/products.json,           |
                      |         data/specialists.json,        |
                      |         data/about.json               |
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

                      +---------------------------------------+
                      |         ECWCPFC by ELETHIYA           |
                      |     (Local Go Backend in backend/)    |
                      |  * elethiya clients website control   |
                      |    panels for clients                 |
                      |  * Manages data/ products/specialists |
                      |  * Live About Page Preview (Stacked)  |
                      |  * Safe ZIP Backups                   |
                      |  * 1-Click Deploy & Push to GitHub   |
                      +---------------------------------------+
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

## Dynamic Catalog & Content System (`data/`)

The website's catalog and core content are cleanly separated into JSON data files and local assets:

1. **E-Commerce Products (`data/products.json`)**:
   - Stores item IDs, pricing, MRP, discounts, badges, stock status, highlights, and variants.
   - Images are saved locally as high-resolution PNGs in [`data/products/`](data/products/) for lightning-fast loading and zero external CDN dependencies.
   - Product detail modal has a clean presentation without cluttered breadcrumb trails.

2. **Care Specialists (`data/specialists.json`)**:
   - Profiles of psychologists and counselors with their names, roles, and registration credentials.
   - Profile photos are stored locally as PNGs in [`data/pfp/`](data/pfp/).
   - Clean, focused card design highlighting therapeutic expertise and direct session booking.

3. **About Page Content (`data/about.json`)**:
   - Dynamically controls the page eyebrow, main headline, mission statement, story paragraphs, key stats (`1:1`, `100%`), core values, and multidisciplinary care team banner.

---

## ECWCPFC — elethiya clients website control panels for clients (`backend/`)

A dedicated, private Go application engineered by **ELETHIYA** strictly for content editing and zero-risk deployments:
- **Zero Coupling**: Does NOT host the public static site; runs locally whenever you wish to edit content.
- **About Page Live Preview**: Edit copy in the upper form and watch an authentic, real-time simulated client preview update directly below it.
- **Safe ZIP Backups**: Automatic non-destructive `.zip` archives generated prior to any Deploy or Reset in `backend/backups/`.
- **1-Click GitHub Deploy**: Stages `data/`, commits changes, pushes to your repository, and switches to a clean "Close" button upon completion.
- **Audit Logging**: The History tab records all administrative changes with search, category filtering, and CSV export.
- **Scroll Stabilization**: Background page scrolling is locked (`html.modal-open, body.modal-open`) whenever a modal is open, preventing background movement and layout shifts.

See [`backend/README.md`](backend/README.md) for full configuration and run instructions.

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

---

## Complete Multi-Tier Notification System

Sukoon Saathi includes bulletproof HTML email templates designed using pure HTML `<table>` architecture:

1. **Store Orders**:
   - Admin Alert Email with itemized breakdown and customer delivery details.
   - Customer Order Confirmation Receipt with Order ID, itemized receipt breakdown, and WhatsApp link.
2. **Therapy Session Bookings**:
   - Admin Alert Email with Booking ID, service type, preferred date/time slot, and client notes.
   - Client Confirmation Email with booking summary and next steps.
3. **Contact Us Inquiries**:
   - Admin Alert Email with Inquiry ID, sender details, subject, and message.
   - Sender Confirmation Email with reference ID.
4. **Direct WhatsApp Alerts & Mobile Google Sheets Notifications**:
   - Immediate on-screen 1-tap WhatsApp button to reach fulfillment.
   - Native mobile notifications via the Google Sheets app.

---

## Local Development

To run the static website locally on your computer:

```bash
# Using Python 3:
python3 -m http.server 8000

# Or using Node.js:
npx serve .
```

Open `http://localhost:8000` in your web browser.

To start ECWCPFC (elethiya clients website control panels for clients):
```bash
cd backend
go run main.go
```
Open `http://localhost:8080` in your browser.
