/**
 * ===================================================================
 * Sukoon Saathi — Unified Google Sheets Webhook Backend
 * ===================================================================
 * 
 * ONE SINGLE SPREADSHEET FOR ALL WEBSITE SUBMISSIONS:
 *  1. "Orders"         — Customer product orders from the Store / Checkout
 *  2. "Book a Session" — Therapy & mindfulness session appointment requests
 *  3. "Contact Us"     — General inquiries and contact messages
 *
 * NOTIFICATION FEATURES:
 *  - Bulletproof HTML Email Receipts (Gmail / Outlook / Apple Mail tested)
 *  - Zero display:flex (Uses robust HTML <table> architecture that never breaks)
 *  - Instant Admin Email Alerts to store owner (NOTIFY_EMAIL)
 *  - Automated Customer Order Confirmation Receipts
 *  - Automated Client Session Booking Confirmations
 *  - Automated Sender Contact Confirmations
 *
 * -------------------------------------------------------------------
 * QUICK 1-MINUTE SETUP GUIDE:
 * -------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) and create a blank spreadsheet.
 *    Name it: "Sukoon Saathi Database"
 * 2. In the top menu, go to: Extensions > Apps Script
 * 3. Delete any default code in the editor, copy and paste this ENTIRE file.
 * 4. Set NOTIFY_EMAIL below to YOUR email to receive instant alerts.
 * 5. Click "Deploy" (top right) > "New deployment"
 *      - Click the gear icon > select "Web app"
 *      - Description: "Sukoon Saathi Unified Webhook"
 *      - Execute as: "Me" (your Google account)
 *      - Who has access: "Anyone" (crucial so website visitors can submit)
 * 6. Click "Deploy", review/grant standard Google permissions if asked.
 * 7. Copy the "Web app URL" (looks like: https://script.google.com/macros/s/.../exec)
 * 8. Open "js/main.js" on line 6 and paste your URL into window.SUKOON_SHEET_ENDPOINT:
 *      window.SUKOON_SHEET_ENDPOINT = "PASTE_YOUR_COPIED_URL_HERE";
 * ===================================================================
 */

// ===================================================================
// CONFIGURATION
// ===================================================================
// Enter the admin email address that should receive instant alerts for every submission.
// Replace with your actual email address (e.g. your Gmail).
const NOTIFY_EMAIL = "eleyeshussainmollah@gmail.com";

// Set to true to automatically send confirmation email receipts to users.
const SEND_CUSTOMER_CONFIRMATION = true;

// Your customer support WhatsApp number (with country code, e.g. 919876543210)
const SUPPORT_WHATSAPP = "916002085412";


/**
 * Health check / Status endpoint
 * Visit the Web App URL in your browser to verify it is active.
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets().map(function (s) { return s.getName(); });
    var info = {
      status: "connected",
      message: "Sukoon Saathi Unified Webhook is active and receiving orders, bookings, and contact inquiries into a single Google Sheet.",
      spreadsheetName: ss.getName(),
      spreadsheetUrl: ss.getUrl(),
      activeTabs: sheets,
      adminNotificationEmail: NOTIFY_EMAIL.indexOf("example.com") === -1 ? NOTIFY_EMAIL : "Not configured yet",
      customerReceiptsEnabled: SEND_CUSTOMER_CONFIRMATION
    };
    return ContentService
      .createTextOutput(JSON.stringify(info, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Main Webhook Receiver
 * Handles POST requests from the website (Orders, Bookings, Contact messages)
 */
function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var formType = data.form_type || "";

    // Auto-detect form type if not explicitly supplied
    if (!formType) {
      if (data.orderId || data.itemsSummary || data.totalAmount) {
        formType = "order";
      } else if (data.service || data.preferred_date) {
        formType = "book";
      } else {
        formType = "contact";
      }
    }

    // -------------------------------------------------------------
    // 1. ORDER SUBMISSIONS (From Store / Checkout Floating Window)
    // -------------------------------------------------------------
    if (formType === "order") {
      var orderId = data.orderId || "OD-SUKOON-" + Math.floor(100000 + Math.random() * 900000);
      data.orderId = orderId;

      writeRow(
        ss,
        "Orders",
        [
          "Order ID",
          "Timestamp (IST)",
          "Customer Name",
          "Phone / WhatsApp",
          "Email",
          "Delivery Address",
          "City",
          "PIN Code",
          "Items Ordered",
          "Total Items",
          "Total Amount",
          "Customer Notes",
          "Order Status"
        ],
        [
          orderId,
          data.date || getISTTimestamp(data.submitted_at),
          data.customerName || data.name || "",
          data.phone || "",
          data.email || "",
          data.address || "",
          data.city || "",
          data.pincode || "",
          data.itemsSummary || "",
          data.totalItems || 1,
          data.totalAmount || "",
          data.notes || "",
          data.orderStatus || "New Order (Pending Fulfillment)"
        ]
      );

      // (A) Admin Alert Email
      sendAdminNotificationEmail("New Order Placed — " + orderId, "New Order Received", [
        ["Order ID", orderId],
        ["Customer Name", data.customerName || data.name],
        ["Phone / WhatsApp", data.phone],
        ["Email", data.email],
        ["Total Amount", data.totalAmount],
        ["Total Items", data.totalItems],
        ["Items Ordered", data.itemsSummary],
        ["Delivery Address", (data.address || "") + (data.city ? ", " + data.city : "") + (data.pincode ? " - " + data.pincode : "")],
        ["Customer Notes", data.notes || "None"]
      ]);

      // (B) Customer Order Confirmation Email (Beautiful bulletproof HTML receipt)
      if (SEND_CUSTOMER_CONFIRMATION) {
        sendCustomerOrderConfirmation(data);
      }

      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", type: "order", orderId: orderId })
      ).setMimeType(ContentService.MimeType.JSON);

    // -------------------------------------------------------------
    // 2. BOOK A SESSION SUBMISSIONS (Therapy / Counseling Booking)
    // -------------------------------------------------------------
    } else if (formType === "book") {
      var bookingId = data.bookingId || "BK-" + Math.floor(10000 + Math.random() * 90000);
      data.bookingId = bookingId;

      writeRow(
        ss,
        "Book a Session",
        [
          "Booking ID",
          "Timestamp (IST)",
          "Client Name",
          "Phone / WhatsApp",
          "Email",
          "Session Type",
          "Preferred Date",
          "Preferred Time",
          "Client Notes",
          "Booking Status"
        ],
        [
          bookingId,
          getISTTimestamp(data.submitted_at),
          data.name || "",
          data.phone || "",
          data.email || "",
          data.service || "Standard Session",
          data.preferred_date || "",
          data.preferred_time || "",
          data.notes || "",
          "New Request (Pending Confirmation)"
        ]
      );

      // (A) Admin Alert Email
      sendAdminNotificationEmail("New Session Booking — " + bookingId, "New Therapy / Session Request", [
        ["Booking ID", bookingId],
        ["Client Name", data.name],
        ["Phone / WhatsApp", data.phone],
        ["Email", data.email],
        ["Session Type", data.service],
        ["Preferred Date", data.preferred_date],
        ["Preferred Time", data.preferred_time],
        ["Client Notes", data.notes || "None"]
      ]);

      // (B) Client Booking Confirmation Email
      if (SEND_CUSTOMER_CONFIRMATION) {
        sendClientBookingConfirmation(data);
      }

      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", type: "book", bookingId: bookingId })
      ).setMimeType(ContentService.MimeType.JSON);

    // -------------------------------------------------------------
    // 3. CONTACT US SUBMISSIONS (General Inquiries & Messages)
    // -------------------------------------------------------------
    } else {
      var inquiryId = data.inquiryId || "INQ-" + Math.floor(10000 + Math.random() * 90000);
      data.inquiryId = inquiryId;

      writeRow(
        ss,
        "Contact Us",
        [
          "Inquiry ID",
          "Timestamp (IST)",
          "Sender Name",
          "Phone / WhatsApp",
          "Email",
          "Subject",
          "Message",
          "Inquiry Status"
        ],
        [
          inquiryId,
          getISTTimestamp(data.submitted_at),
          data.name || "",
          data.phone || "",
          data.email || "",
          data.subject || "General Inquiry",
          data.message || "",
          "New Message (Unread)"
        ]
      );

      // (A) Admin Alert Email
      sendAdminNotificationEmail("New Contact Message — " + inquiryId, "New Message from Website", [
        ["Inquiry ID", inquiryId],
        ["Sender Name", data.name],
        ["Phone / WhatsApp", data.phone],
        ["Email", data.email],
        ["Subject", data.subject],
        ["Message", data.message]
      ]);

      // (B) Sender Contact Confirmation Email
      if (SEND_CUSTOMER_CONFIRMATION) {
        sendSenderContactConfirmation(data);
      }

      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", type: "contact", inquiryId: inquiryId })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Appends a row into the specified sheet tab within the SINGLE spreadsheet.
 * Automatically formats header row, creates sheet tab if missing, and resizes columns.
 */
function writeRow(ss, sheetName, headers, rowValues) {
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    // If initial default "Sheet1" is empty, rename it instead of leaving an unused tab
    var firstSheet = ss.getSheets()[0];
    if (
      ss.getSheets().length === 1 &&
      firstSheet.getLastRow() === 0 &&
      (firstSheet.getName() === "Sheet1" || firstSheet.getName() === "Sheet 1")
    ) {
      sheet = firstSheet;
      sheet.setName(sheetName);
    } else {
      sheet = ss.insertSheet(sheetName);
    }
  }

  // Format header row if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange
      .setFontWeight("bold")
      .setBackground("#0f3d34") // Sukoon Forest green brand color
      .setFontColor("#ffffff")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 38);
  }

  sheet.appendRow(rowValues);

  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, headers.length).setVerticalAlignment("middle");

  try {
    sheet.autoResizeColumns(1, headers.length);
  } catch (e) {}
}

/**
 * Formats ISO timestamp to Indian Standard Time (IST)
 */
function getISTTimestamp(isoString) {
  var d = isoString ? new Date(isoString) : new Date();
  return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

/**
 * Escapes HTML entities to avoid broken tags in emails
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Universal Responsive Email Shell
 * Built with rock-solid HTML <table> structure (Zero display:flex)
 * Renders flawlessly across Gmail, Apple Mail, Outlook, Android, iOS.
 */
function renderEmailShell(badgeText, bodyContentHtml) {
  return '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>Sukoon Saathi</title>' +
    '</head>' +
    '<body style="margin: 0; padding: 0; background-color: #f5eee1; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; color: #242019; -webkit-text-size-adjust: 100%;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5eee1" style="width: 100%; background-color: #f5eee1; padding: 24px 8px;">' +
    '<tr>' +
    '<td align="center" style="padding: 0;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 14px; border: 1px solid #e2dac9; overflow: hidden; box-shadow: 0 4px 18px rgba(15, 61, 52, 0.08);">' +
    '<!-- HEADER -->' +
    '<tr>' +
    '<td bgcolor="#0f3d34" style="background-color: #0f3d34; padding: 26px 20px; text-align: center;">' +
    '<h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; color: #ffffff; letter-spacing: 0.5px; font-weight: normal;">Sukoon Saathi</h1>' +
    '<p style="margin: 4px 0 0 0; font-size: 11px; color: #d4bc88; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">Holistic Wellness & Mindful Living</p>' +
    '<div style="margin-top: 12px;">' +
    '<span style="display: inline-block; background-color: #175245; color: #ffffff; border: 1px solid #c9a35c; padding: 5px 14px; border-radius: 99px; font-size: 11px; font-weight: bold; letter-spacing: 0.8px; text-transform: uppercase;">' +
    escapeHtml(badgeText) +
    '</span>' +
    '</div>' +
    '</td>' +
    '</tr>' +
    '<!-- MAIN CONTENT -->' +
    '<tr>' +
    '<td style="padding: 28px 24px; color: #242019; font-size: 15px; line-height: 1.55;">' +
    bodyContentHtml +
    '</td>' +
    '</tr>' +
    '<!-- FOOTER -->' +
    '<tr>' +
    '<td bgcolor="#fbf7ef" style="background-color: #fbf7ef; padding: 20px 24px; border-top: 1px solid #ece4d4; text-align: center; font-size: 12px; color: #766f65; line-height: 1.5;">' +
    '<p style="margin: 0 0 6px 0; font-weight: bold; color: #0f3d34; font-size: 13px;">Sukoon Saathi</p>' +
    '<p style="margin: 0 0 8px 0;">Mindful healing, conscious therapy sessions, and wellness essentials for your peaceful journey.</p>' +
    '<p style="margin: 0; font-size: 11px; color: #9c958a;">© Sukoon Saathi. All rights reserved.</p>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '</body>' +
    '</html>';
}

/**
 * 1. Customer Order Confirmation Email
 * Pure table layout with itemized receipt, order ID, address card, and WhatsApp link
 */
function sendCustomerOrderConfirmation(data) {
  if (!data.email || data.email.indexOf("@") === -1) return;

  var orderId = data.orderId || "OD-SUKOON-000000";
  var customerName = data.customerName || data.name || "Valued Customer";
  var totalAmount = data.totalAmount || "₹0";
  var deliveryAddress = (data.address || "") + (data.city ? ", " + data.city : "") + (data.pincode ? " - " + data.pincode : "");

  // Build itemized receipt rows using pure HTML tables
  var itemsTableRows = "";
  if (data.items && Array.isArray(data.items) && data.items.length > 0) {
    for (var i = 0; i < data.items.length; i++) {
      var itm = data.items[i];
      var itmPrice = itm.itemTotal ? "₹" + Number(itm.itemTotal).toLocaleString("en-IN") : (itm.price ? "₹" + Number(itm.price * (itm.qty || 1)).toLocaleString("en-IN") : "");
      itemsTableRows += '<tr>' +
        '<td style="padding: 11px 12px; border-bottom: 1px solid #ece4d4; font-size: 14px; color: #242019; vertical-align: middle;">' +
        '<strong>' + escapeHtml(itm.title) + '</strong>' +
        (itm.variant ? '<br><span style="font-size: 12px; color: #766f65;">Variant: ' + escapeHtml(itm.variant) + '</span>' : '') +
        '</td>' +
        '<td align="center" style="padding: 11px 8px; border-bottom: 1px solid #ece4d4; font-size: 14px; color: #242019; vertical-align: middle; white-space: nowrap;">' +
        (itm.qty || 1) +
        '</td>' +
        '<td align="right" style="padding: 11px 12px; border-bottom: 1px solid #ece4d4; font-size: 14px; color: #0f3d34; font-weight: bold; vertical-align: middle; white-space: nowrap;">' +
        itmPrice +
        '</td>' +
        '</tr>';
    }
  } else if (data.itemsSummary) {
    var rawItems = String(data.itemsSummary).split(" | ");
    for (var j = 0; j < rawItems.length; j++) {
      var singleItem = rawItems[j].trim();
      if (!singleItem) continue;
      itemsTableRows += '<tr>' +
        '<td colspan="2" style="padding: 11px 12px; border-bottom: 1px solid #ece4d4; font-size: 14px; color: #242019; vertical-align: middle;">' +
        escapeHtml(singleItem) +
        '</td>' +
        '<td align="right" style="padding: 11px 12px; border-bottom: 1px solid #ece4d4; font-size: 14px; color: #0f3d34; font-weight: bold; vertical-align: middle;">' +
        'Included' +
        '</td>' +
        '</tr>';
    }
  } else {
    itemsTableRows = '<tr><td colspan="3" style="padding: 12px; color: #766f65; text-align: center;">Wellness Essentials</td></tr>';
  }

  var whatsappMsg = encodeURIComponent("Hello Sukoon Saathi! I have placed order #" + orderId + ". Please confirm my delivery.");
  var whatsappUrl = "https://wa.me/" + SUPPORT_WHATSAPP + "?text=" + whatsappMsg;

  var contentHtml = 
    '<h2 style="margin: 0 0 10px 0; color: #0f3d34; font-size: 20px; font-family: Georgia, serif;">Thank You for Your Order, ' + escapeHtml(customerName) + '!</h2>' +
    '<p style="margin: 0 0 18px 0; color: #5a5348; font-size: 14px; line-height: 1.5;">' +
    'We have safely received your order and our fulfillment team is preparing your package with mindfulness and care. Below is your complete order receipt:' +
    '</p>' +
    '<!-- DETAILS TABLE -->' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fbf7ef" style="background-color: #fbf7ef; border: 1px solid #ece4d4; border-radius: 8px; margin: 16px 0;">' +
    '<tr>' +
    '<td style="padding: 14px 16px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 14px;">' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65; width: 130px;">Order ID:</td>' +
    '<td style="padding: 5px 0; font-family: monospace; font-weight: bold; color: #0f3d34; font-size: 15px;">' + escapeHtml(orderId) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65;">Recipient:</td>' +
    '<td style="padding: 5px 0; color: #242019; font-weight: bold;">' + escapeHtml(customerName) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65;">Phone / WhatsApp:</td>' +
    '<td style="padding: 5px 0; color: #242019;">' + escapeHtml(data.phone || "") + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65; vertical-align: top;">Delivery Address:</td>' +
    '<td style="padding: 5px 0; color: #242019; line-height: 1.4;">' + escapeHtml(deliveryAddress) + '</td>' +
    '</tr>' +
    (data.notes ? '<tr><td style="padding: 5px 0; color: #766f65; vertical-align: top;">Delivery Notes:</td><td style="padding: 5px 0; color: #242019; font-style: italic;">' + escapeHtml(data.notes) + '</td></tr>' : '') +
    '</table>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '<!-- ITEMIZED RECEIPT TABLE -->' +
    '<p style="margin: 20px 0 8px 0; font-weight: bold; color: #0f3d34; font-size: 15px;">Itemized Receipt</p>' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #ffffff; border: 1px solid #ece4d4; border-radius: 8px; overflow: hidden;">' +
    '<thead>' +
    '<tr bgcolor="#f6f1e7" style="background-color: #f6f1e7;">' +
    '<th align="left" style="padding: 10px 12px; font-size: 13px; font-weight: bold; color: #0f3d34; border-bottom: 2px solid #0f3d34;">Item</th>' +
    '<th align="center" style="padding: 10px 8px; font-size: 13px; font-weight: bold; color: #0f3d34; width: 50px; border-bottom: 2px solid #0f3d34;">Qty</th>' +
    '<th align="right" style="padding: 10px 12px; font-size: 13px; font-weight: bold; color: #0f3d34; width: 90px; border-bottom: 2px solid #0f3d34;">Total</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    itemsTableRows +
    '</tbody>' +
    '<tfoot>' +
    '<tr bgcolor="#faf6ef" style="background-color: #faf6ef;">' +
    '<td colspan="2" align="right" style="padding: 12px; font-size: 14px; font-weight: bold; color: #0f3d34;">Grand Total:</td>' +
    '<td align="right" style="padding: 12px; font-size: 16px; font-weight: bold; color: #0f3d34;">' + escapeHtml(totalAmount) + '</td>' +
    '</tr>' +
    '</tfoot>' +
    '</table>' +
    '<!-- WHATSAPP CALLOUT -->' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5eee1" style="background-color: #f5eee1; border-radius: 8px; padding: 14px; text-align: center; margin: 18px 0;">' +
    '<tr>' +
    '<td align="center">' +
    '<p style="margin: 0 0 10px 0; font-size: 13px; color: #0f3d34; font-weight: 600;">Have questions about your order or delivery tracking?</p>' +
    '<table cellpadding="0" cellspacing="0" border="0">' +
    '<tr>' +
    '<td align="center" bgcolor="#0f3d34" style="border-radius: 8px;">' +
    '<a href="' + whatsappUrl + '" target="_blank" style="display: inline-block; padding: 10px 20px; font-family: Arial, sans-serif; font-size: 13px; color: #ffffff; text-decoration: none; font-weight: bold;">Connect with Us on WhatsApp</a>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '<p style="margin: 16px 0 0 0; font-size: 13px; color: #766f65; text-align: center;">You will receive your dispatch details as soon as your package ships.</p>';

  var fullHtml = renderEmailShell("Order Confirmed", contentHtml);

  var plainText = "Thank you for your order with Sukoon Saathi!\n\n" +
    "Order ID: " + orderId + "\n" +
    "Recipient: " + customerName + "\n" +
    "Total Amount: " + totalAmount + "\n" +
    "Delivery Address: " + deliveryAddress + "\n" +
    "Items: " + (data.itemsSummary || "Wellness Essentials") + "\n\n" +
    "We have received your order and are preparing it with care.\n\nWarm regards,\nSukoon Saathi Team";

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: "Order Confirmed #" + orderId + " — Sukoon Saathi",
      body: plainText,
      htmlBody: fullHtml
    });
  } catch (err) {
    Logger.log("Customer order confirmation send error: " + err);
  }
}

/**
 * 2. Client Session Booking Confirmation Email
 * Pure table layout with appointment details, confidentiality notice, and care contact
 */
function sendClientBookingConfirmation(data) {
  if (!data.email || data.email.indexOf("@") === -1) return;

  var bookingId = data.bookingId || "BK-00000";
  var clientName = data.name || "Valued Client";
  var service = data.service || "Wellness Session";
  var date = data.preferred_date || "To be confirmed";
  var time = data.preferred_time || "To be confirmed";

  var whatsappMsg = encodeURIComponent("Hello Sukoon Saathi! I have requested session booking #" + bookingId + ". Please confirm my appointment slot.");
  var whatsappUrl = "https://wa.me/" + SUPPORT_WHATSAPP + "?text=" + whatsappMsg;

  var contentHtml = 
    '<h2 style="margin: 0 0 10px 0; color: #0f3d34; font-size: 20px; font-family: Georgia, serif;">Session Request Received, ' + escapeHtml(clientName) + '</h2>' +
    '<p style="margin: 0 0 18px 0; color: #5a5348; font-size: 14px; line-height: 1.5;">' +
    'Thank you for reaching out to Sukoon Saathi. We have safely received your session booking request. Our dedicated care coordinator will contact you via Phone or WhatsApp shortly to confirm your exact appointment timing and answer any questions.' +
    '</p>' +
    '<!-- BOOKING DETAILS CARD -->' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fbf7ef" style="background-color: #fbf7ef; border: 1px solid #ece4d4; border-radius: 8px; margin: 16px 0;">' +
    '<tr>' +
    '<td style="padding: 16px 18px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 14px;">' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65; width: 140px;">Booking ID:</td>' +
    '<td style="padding: 5px 0; font-family: monospace; font-weight: bold; color: #0f3d34; font-size: 15px;">' + escapeHtml(bookingId) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65;">Client Name:</td>' +
    '<td style="padding: 5px 0; color: #242019; font-weight: bold;">' + escapeHtml(clientName) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65;">Service / Session:</td>' +
    '<td style="padding: 5px 0; color: #0f3d34; font-weight: bold;">' + escapeHtml(service) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65;">Preferred Date:</td>' +
    '<td style="padding: 5px 0; color: #242019;">' + escapeHtml(date) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65;">Preferred Time:</td>' +
    '<td style="padding: 5px 0; color: #242019;">' + escapeHtml(time) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65;">Contact Phone:</td>' +
    '<td style="padding: 5px 0; color: #242019;">' + escapeHtml(data.phone || "") + '</td>' +
    '</tr>' +
    (data.notes ? '<tr><td style="padding: 5px 0; color: #766f65; vertical-align: top;">Your Notes:</td><td style="padding: 5px 0; color: #242019; font-style: italic;">' + escapeHtml(data.notes) + '</td></tr>' : '') +
    '</table>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '<!-- CONFIDENTIALITY NOTE -->' +
    '<div style="background-color: #f6f1e7; border-left: 4px solid #1f5c4f; padding: 12px 14px; margin: 18px 0; border-radius: 0 8px 8px 0;">' +
    '<strong style="color: #0f3d34; font-size: 13px;">Confidentiality Commitment:</strong><br>' +
    '<span style="font-size: 13px; color: #5a5348;">Your personal information, background, and therapy sessions are strictly private and protected under professional healthcare ethics.</span>' +
    '</div>' +
    '<!-- WHATSAPP CALLOUT -->' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5eee1" style="background-color: #f5eee1; border-radius: 8px; padding: 14px; text-align: center; margin: 18px 0;">' +
    '<tr>' +
    '<td align="center">' +
    '<p style="margin: 0 0 10px 0; font-size: 13px; color: #0f3d34; font-weight: 600;">Want to connect directly with our care coordinator?</p>' +
    '<table cellpadding="0" cellspacing="0" border="0">' +
    '<tr>' +
    '<td align="center" bgcolor="#0f3d34" style="border-radius: 8px;">' +
    '<a href="' + whatsappUrl + '" target="_blank" style="display: inline-block; padding: 10px 20px; font-family: Arial, sans-serif; font-size: 13px; color: #ffffff; text-decoration: none; font-weight: bold;">Message Us on WhatsApp</a>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '</td>' +
    '</tr>' +
    '</table>';

  var fullHtml = renderEmailShell("Session Request Received", contentHtml);

  var plainText = "Hello " + clientName + ",\n\n" +
    "Thank you for scheduling a session with Sukoon Saathi.\n" +
    "Booking ID: " + bookingId + "\n" +
    "Service Requested: " + service + "\n" +
    "Preferred Date: " + date + "\n" +
    "Preferred Time: " + time + "\n\n" +
    "Our care coordinator will reach out shortly to confirm your session.\n\nWarm regards,\nSukoon Saathi Team";

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: "Session Request Received #" + bookingId + " — Sukoon Saathi",
      body: plainText,
      htmlBody: fullHtml
    });
  } catch (err) {
    Logger.log("Client booking confirmation send error: " + err);
  }
}

/**
 * 3. Sender Contact Us Confirmation Email
 * Pure table layout confirming receipt of general inquiries
 */
function sendSenderContactConfirmation(data) {
  if (!data.email || data.email.indexOf("@") === -1) return;

  var inquiryId = data.inquiryId || "INQ-00000";
  var senderName = data.name || "Friend";
  var subject = data.subject || "General Inquiry";
  var message = data.message || "";

  var whatsappMsg = encodeURIComponent("Hello Sukoon Saathi! I sent an inquiry reference #" + inquiryId + ". Looking forward to connecting.");
  var whatsappUrl = "https://wa.me/" + SUPPORT_WHATSAPP + "?text=" + whatsappMsg;

  var contentHtml = 
    '<h2 style="margin: 0 0 10px 0; color: #0f3d34; font-size: 20px; font-family: Georgia, serif;">Thank You for Reaching Out, ' + escapeHtml(senderName) + '</h2>' +
    '<p style="margin: 0 0 18px 0; color: #5a5348; font-size: 14px; line-height: 1.5;">' +
    'We have received your message and appreciate you connecting with Sukoon Saathi. A member of our team will review your note and get back to you within 24 hours.' +
    '</p>' +
    '<!-- INQUIRY DETAILS CARD -->' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fbf7ef" style="background-color: #fbf7ef; border: 1px solid #ece4d4; border-radius: 8px; margin: 16px 0;">' +
    '<tr>' +
    '<td style="padding: 16px 18px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 14px;">' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65; width: 140px;">Inquiry Reference:</td>' +
    '<td style="padding: 5px 0; font-family: monospace; font-weight: bold; color: #0f3d34; font-size: 15px;">' + escapeHtml(inquiryId) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65;">Sender Name:</td>' +
    '<td style="padding: 5px 0; color: #242019; font-weight: bold;">' + escapeHtml(senderName) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65;">Subject:</td>' +
    '<td style="padding: 5px 0; color: #0f3d34; font-weight: bold;">' + escapeHtml(subject) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="padding: 5px 0; color: #766f65; vertical-align: top;">Your Message:</td>' +
    '<td style="padding: 5px 0; color: #242019; line-height: 1.4; font-style: italic;">' + escapeHtml(message) + '</td>' +
    '</tr>' +
    '</table>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '<!-- WHATSAPP CALLOUT -->' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5eee1" style="background-color: #f5eee1; border-radius: 8px; padding: 14px; text-align: center; margin: 18px 0;">' +
    '<tr>' +
    '<td align="center">' +
    '<p style="margin: 0 0 10px 0; font-size: 13px; color: #0f3d34; font-weight: 600;">Need immediate assistance or support?</p>' +
    '<table cellpadding="0" cellspacing="0" border="0">' +
    '<tr>' +
    '<td align="center" bgcolor="#0f3d34" style="border-radius: 8px;">' +
    '<a href="' + whatsappUrl + '" target="_blank" style="display: inline-block; padding: 10px 20px; font-family: Arial, sans-serif; font-size: 13px; color: #ffffff; text-decoration: none; font-weight: bold;">Chat with Us on WhatsApp</a>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '</td>' +
    '</tr>' +
    '</table>';

  var fullHtml = renderEmailShell("Message Received", contentHtml);

  var plainText = "Hello " + senderName + ",\n\n" +
    "Thank you for contacting Sukoon Saathi.\n" +
    "Reference ID: " + inquiryId + "\n" +
    "Subject: " + subject + "\n\n" +
    "Your message:\n" + message + "\n\n" +
    "Our team will get back to you within 24 hours.\n\nWarm regards,\nSukoon Saathi Team";

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: "Message Received #" + inquiryId + " — Sukoon Saathi",
      body: plainText,
      htmlBody: fullHtml
    });
  } catch (err) {
    Logger.log("Sender contact confirmation send error: " + err);
  }
}

/**
 * 4. Admin Notification Email
 * Pure table layout sent to store owner / care team for every new order, booking, or inquiry
 */
function sendAdminNotificationEmail(subjectPrefix, categoryTitle, rows) {
  if (!NOTIFY_EMAIL || NOTIFY_EMAIL.indexOf("example.com") !== -1) return;

  var bodyLines = rows
    .filter(function (r) { return r[1]; })
    .map(function (r) { return r[0] + ": " + r[1]; })
    .join("\n");

  var htmlRows = "";
  for (var i = 0; i < rows.length; i++) {
    var label = rows[i][0];
    var val = rows[i][1];
    if (val === undefined || val === null) val = "";
    htmlRows += '<tr>' +
      '<td style="padding: 9px 12px; border-bottom: 1px solid #ece4d4; font-weight: bold; color: #0f3d34; width: 140px; vertical-align: top; font-size: 13px;">' +
      escapeHtml(label) +
      '</td>' +
      '<td style="padding: 9px 12px; border-bottom: 1px solid #ece4d4; color: #242019; vertical-align: top; font-size: 14px; line-height: 1.4;">' +
      escapeHtml(val).replace(/\n/g, "<br>") +
      '</td>' +
      '</tr>';
  }

  var contentHtml = 
    '<h2 style="margin: 0 0 12px 0; color: #0f3d34; font-size: 19px; font-family: Georgia, serif;">' + escapeHtml(categoryTitle) + '</h2>' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin: 12px 0; background-color: #ffffff; border: 1px solid #ece4d4; border-radius: 8px; overflow: hidden;">' +
    htmlRows +
    '</table>' +
    '<p style="margin: 14px 0 0 0; font-size: 12px; color: #766f65; text-align: center;">Submission received at (IST): ' + getISTTimestamp() + '</p>';

  var fullHtml = renderEmailShell("Admin Alert", contentHtml);

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "Sukoon Saathi — " + subjectPrefix,
      body: bodyLines + "\n\nReceived at (IST): " + getISTTimestamp(),
      htmlBody: fullHtml
    });
  } catch (err) {
    Logger.log("Admin email send error: " + err);
  }
}
