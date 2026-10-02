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
 * NOTIFICATION FEATURES INCLUDED:
 *  - Instant Admin Email Notifications (order alerts sent to store owner)
 *  - Automated Customer Order Confirmation Emails (sent to customer with receipt)
 *  - Automated Client Session Booking Confirmation Emails
 *
 * -------------------------------------------------------------------
 * QUICK 1-MINUTE SETUP GUIDE:
 * -------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) and create a blank spreadsheet.
 *    Name it: "Sukoon Saathi Database"
 * 2. In the top menu, go to: Extensions > Apps Script
 * 3. Delete any default code in the editor, copy and paste this ENTIRE file.
 * 4. Set NOTIFY_EMAIL below to YOUR email to receive instant order alerts.
 * 5. Click "Deploy" (top right) > "New deployment"
 *      - Click the gear icon > select "Web app"
 *      - Description: "Sukoon Saathi Unified Webhook"
 *      - Execute as: "Me" (your Google account)
 *      - Who has access: "Anyone" (crucial so website can submit data)
 * 6. Click "Deploy", review/grant standard Google permissions if asked.
 * 7. Copy the "Web app URL" (looks like: https://script.google.com/macros/s/.../exec)
 * 8. Open "js/main.js" on line 6 and paste your URL into window.SUKOON_SHEET_ENDPOINT:
 *      window.SUKOON_SHEET_ENDPOINT = "PASTE_YOUR_COPIED_URL_HERE";
 * ===================================================================
 */

// ===================================================================
// CONFIGURATION
// ===================================================================
// Enter the admin email address that should receive instant alerts for every new order.
// Replace with your actual email address (e.g. "contact@sukoonsaathi.com" or your Gmail).
const NOTIFY_EMAIL = "eleyeshussainmollah@gmail.com";

// Set to true to also automatically send an email receipt to the customer/client.
const SEND_CUSTOMER_CONFIRMATION = true;


/**
 * Health check / Status endpoint
 * Visit the Web App URL in your browser to verify it's active.
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets().map(function (s) { return s.getName(); });
    var info = {
      status: "connected",
      message: "Sukoon Saathi Unified Webhook is active and receiving submissions into a single Google Sheet.",
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
          "Customer Notes",
          "Ordered Items",
          "Total Items",
          "Total Amount",
          "Order Status"
        ],
        [
          data.orderId || "",
          data.date || getISTTimestamp(data.submitted_at),
          data.customerName || data.name || "",
          data.phone || "",
          data.email || "",
          data.address || "",
          data.city || "",
          data.pincode || "",
          data.notes || "",
          data.itemsSummary || "",
          data.totalItems || 1,
          data.totalAmount || "",
          data.orderStatus || "New Order (Pending Fulfillment)"
        ]
      );

      // (A) Admin Notification: Instant alert email to store owner
      sendAdminNotificationEmail("New Order Placed — " + (data.orderId || "Sukoon Saathi"), [
        ["Order ID", data.orderId],
        ["Customer Name", data.customerName || data.name],
        ["Phone / WhatsApp", data.phone],
        ["Email", data.email],
        ["Total Amount", data.totalAmount],
        ["Total Items", data.totalItems],
        ["Items Ordered", data.itemsSummary],
        ["Delivery Address", (data.address || "") + (data.city ? ", " + data.city : "") + (data.pincode ? " - " + data.pincode : "")],
        ["Customer Notes", data.notes]
      ]);

      // (B) Customer Confirmation: Instant order receipt sent to customer
      if (SEND_CUSTOMER_CONFIRMATION) {
        sendCustomerOrderConfirmation(data);
      }

      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", type: "order", orderId: data.orderId })
      ).setMimeType(ContentService.MimeType.JSON);

    // -------------------------------------------------------------
    // 2. BOOK A SESSION SUBMISSIONS (Therapy / Mindfulness Booking)
    // -------------------------------------------------------------
    } else if (formType === "book") {
      writeRow(
        ss,
        "Book a Session",
        [
          "Timestamp (IST)",
          "Name",
          "Phone / WhatsApp",
          "Email",
          "Service Requested",
          "Preferred Date",
          "Preferred Time",
          "Client Notes"
        ],
        [
          getISTTimestamp(data.submitted_at),
          data.name || "",
          data.phone || "",
          data.email || "",
          data.service || "",
          data.preferred_date || "",
          data.preferred_time || "",
          data.notes || ""
        ]
      );

      // (A) Admin Notification
      sendAdminNotificationEmail("New Session Booking Request", [
        ["Client Name", data.name],
        ["Phone / WhatsApp", data.phone],
        ["Email", data.email],
        ["Service Requested", data.service],
        ["Preferred Date", data.preferred_date],
        ["Preferred Time", data.preferred_time],
        ["Client Notes", data.notes]
      ]);

      // (B) Client Confirmation
      if (SEND_CUSTOMER_CONFIRMATION) {
        sendClientBookingConfirmation(data);
      }

      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", type: "book" })
      ).setMimeType(ContentService.MimeType.JSON);

    // -------------------------------------------------------------
    // 3. CONTACT US SUBMISSIONS (General Inquiries & Messages)
    // -------------------------------------------------------------
    } else {
      writeRow(
        ss,
        "Contact Us",
        [
          "Timestamp (IST)",
          "Name",
          "Phone / WhatsApp",
          "Email",
          "Subject",
          "Message"
        ],
        [
          getISTTimestamp(data.submitted_at),
          data.name || "",
          data.phone || "",
          data.email || "",
          data.subject || "",
          data.message || ""
        ]
      );

      // Admin Notification
      sendAdminNotificationEmail("New Contact Message", [
        ["Sender Name", data.name],
        ["Phone / WhatsApp", data.phone],
        ["Email", data.email],
        ["Subject", data.subject],
        ["Message", data.message]
      ]);

      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", type: "contact" })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Helper: Appends a row into the specified sheet tab within the SINGLE spreadsheet.
 * Auto-creates the tab and formats header row if empty.
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
      .setBackground("#0f3d34") // Forest green brand color
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
 * Helper: Formats ISO timestamp to Indian Standard Time (IST)
 */
function getISTTimestamp(isoString) {
  var d = isoString ? new Date(isoString) : new Date();
  return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

/**
 * Helper: Sends Admin Notification Email with clean HTML layout
 */
function sendAdminNotificationEmail(subjectPrefix, rows) {
  if (!NOTIFY_EMAIL || NOTIFY_EMAIL.indexOf("example.com") !== -1) return;

  var bodyLines = rows
    .filter(function (r) { return r[1]; })
    .map(function (r) { return r[0] + ": " + r[1]; })
    .join("\n");

  var htmlRows = rows
    .filter(function (r) { return r[1]; })
    .map(function (r) {
      return "<tr><td style='padding: 9px 12px; border-bottom: 1px solid #e8e2d5; font-weight: 600; color: #0f3d34; width: 140px; vertical-align: top;'>" +
        r[0] + "</td><td style='padding: 9px 12px; border-bottom: 1px solid #e8e2d5; color: #242019; vertical-align: top;'>" +
        String(r[1]).replace(/\n/g, "<br>") + "</td></tr>";
    })
    .join("");

  var htmlBody = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fffdf8; border: 1px solid #e2dac9; border-radius: 12px; overflow: hidden;'>" +
    "<div style='background: #0f3d34; color: #ffffff; padding: 20px 24px; text-align: center;'>" +
    "<h2 style='margin: 0; font-size: 1.3rem; letter-spacing: 0.5px;'>Sukoon Saathi</h2>" +
    "<p style='margin: 6px 0 0; font-size: 0.88rem; opacity: 0.9;'>Admin Alert: " + subjectPrefix + "</p>" +
    "</div>" +
    "<div style='padding: 24px;'>" +
    "<table style='width: 100%; border-collapse: collapse; font-size: 0.92rem;'>" +
    htmlRows +
    "</table>" +
    "<p style='margin-top: 20px; font-size: 0.8rem; color: #888; text-align: center;'>Received at (IST): " + getISTTimestamp() + "</p>" +
    "</div></div>";

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "Sukoon Saathi — " + subjectPrefix,
      body: bodyLines + "\n\nReceived at (IST): " + getISTTimestamp(),
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log("Admin email send error: " + err);
  }
}

/**
 * Helper: Sends Customer Order Confirmation Email with branded receipt
 */
function sendCustomerOrderConfirmation(data) {
  if (!data.email || data.email.indexOf("@") === -1) return;

  var orderId = data.orderId || "SS-" + Math.floor(10000 + Math.random() * 90000);
  var customerName = data.customerName || data.name || "Valued Customer";
  var itemsList = data.itemsSummary || "";
  var totalAmount = data.totalAmount || "";
  var deliveryAddress = (data.address || "") + (data.city ? ", " + data.city : "") + (data.pincode ? " - " + data.pincode : "");

  var htmlBody = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fffdf8; border: 1px solid #e2dac9; border-radius: 14px; overflow: hidden;'>" +
    "<div style='background: #0f3d34; color: #ffffff; padding: 24px; text-align: center;'>" +
    "<h1 style='margin: 0; font-size: 1.45rem; letter-spacing: 0.5px;'>Sukoon Saathi</h1>" +
    "<p style='margin: 6px 0 0; font-size: 0.92rem; color: #c9a35c; font-weight: 600;'>Order Confirmed</p>" +
    "</div>" +
    "<div style='padding: 28px 24px; color: #242019;'>" +
    "<h3 style='margin: 0 0 10px; color: #0f3d34;'>Thank You for Your Order, " + customerName + "!</h3>" +
    "<p style='margin: 0 0 20px; font-size: 0.92rem; line-height: 1.5; color: #5a5348;'>" +
    "We have received your order and our team is preparing it with care. Here is your order receipt:" +
    "</p>" +
    "<div style='background: #fbf7ef; border: 1px solid #ece4d4; border-radius: 10px; padding: 16px 18px; margin-bottom: 20px;'>" +
    "<div style='display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #d9d0be; padding-bottom: 8px;'>" +
    "<strong style='color: #0f3d34;'>Order ID:</strong>" +
    "<span style='font-family: monospace; font-weight: 700; color: #1f5c4f;'>" + orderId + "</span>" +
    "</div>" +
    "<div style='margin-bottom: 10px;'><strong style='color: #0f3d34;'>Items Ordered:</strong><br><span style='color: #444;'>" + itemsList + "</span></div>" +
    "<div style='margin-bottom: 10px;'><strong style='color: #0f3d34;'>Total Amount:</strong> <span style='font-weight: 700; color: #0f3d34;'>" + totalAmount + "</span></div>" +
    "<div><strong style='color: #0f3d34;'>Delivery Address:</strong><br><span style='color: #555;'>" + deliveryAddress + "</span></div>" +
    "</div>" +
    "<p style='font-size: 0.88rem; color: #5a5348; line-height: 1.5;'>" +
    "If you have any questions about your delivery, feel free to reply directly to this email or connect with us on WhatsApp." +
    "</p>" +
    "<div style='text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #ece4d4; font-size: 0.8rem; color: #888;'>" +
    "Sukoon Saathi — Holistic Mindfulness & Wellness<br>Thank you for letting us be part of your wellness journey." +
    "</div>" +
    "</div></div>";

  var plainText = "Thank you for your order with Sukoon Saathi!\n\n" +
    "Order ID: " + orderId + "\n" +
    "Customer: " + customerName + "\n" +
    "Items: " + itemsList + "\n" +
    "Total Amount: " + totalAmount + "\n" +
    "Delivery Address: " + deliveryAddress + "\n\n" +
    "We have received your order and are preparing it with care.\n\nWarm regards,\nSukoon Saathi Team";

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: "Order Confirmed #" + orderId + " — Sukoon Saathi",
      body: plainText,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log("Customer email send error: " + err);
  }
}

/**
 * Helper: Sends Client Session Booking Confirmation Email
 */
function sendClientBookingConfirmation(data) {
  if (!data.email || data.email.indexOf("@") === -1) return;

  var clientName = data.name || "Valued Client";
  var service = data.service || "Wellness Session";
  var date = data.preferred_date || "To be confirmed";
  var time = data.preferred_time || "To be confirmed";

  var htmlBody = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fffdf8; border: 1px solid #e2dac9; border-radius: 14px; overflow: hidden;'>" +
    "<div style='background: #0f3d34; color: #ffffff; padding: 24px; text-align: center;'>" +
    "<h1 style='margin: 0; font-size: 1.45rem; letter-spacing: 0.5px;'>Sukoon Saathi</h1>" +
    "<p style='margin: 6px 0 0; font-size: 0.92rem; color: #c9a35c; font-weight: 600;'>Session Request Received</p>" +
    "</div>" +
    "<div style='padding: 28px 24px; color: #242019;'>" +
    "<h3 style='margin: 0 0 10px; color: #0f3d34;'>Hello " + clientName + ",</h3>" +
    "<p style='margin: 0 0 20px; font-size: 0.92rem; line-height: 1.5; color: #5a5348;'>" +
    "Thank you for reaching out to Sukoon Saathi. We have received your session booking request. Our practitioner will contact you shortly to confirm your appointment time." +
    "</p>" +
    "<div style='background: #fbf7ef; border: 1px solid #ece4d4; border-radius: 10px; padding: 16px 18px; margin-bottom: 20px;'>" +
    "<div style='margin-bottom: 8px;'><strong style='color: #0f3d34;'>Service:</strong> " + service + "</div>" +
    "<div style='margin-bottom: 8px;'><strong style='color: #0f3d34;'>Preferred Date:</strong> " + date + "</div>" +
    "<div><strong style='color: #0f3d34;'>Preferred Time:</strong> " + time + "</div>" +
    "</div>" +
    "<p style='font-size: 0.88rem; color: #5a5348; line-height: 1.5;'>" +
    "If you need immediate assistance, feel free to reply to this email or reach us on WhatsApp." +
    "</p>" +
    "<div style='text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #ece4d4; font-size: 0.8rem; color: #888;'>" +
    "Sukoon Saathi — Mindful Living & Therapy" +
    "</div>" +
    "</div></div>";

  var plainText = "Hello " + clientName + ",\n\n" +
    "We have received your session booking request for: " + service + ".\n" +
    "Preferred Date: " + date + "\n" +
    "Preferred Time: " + time + "\n\n" +
    "Our team will get in touch shortly to confirm your session.\n\nWarm regards,\nSukoon Saathi Team";

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: "Session Request Received — Sukoon Saathi",
      body: plainText,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log("Client email send error: " + err);
  }
}
