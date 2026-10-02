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
 * All 3 tabs are created automatically with formatted header rows 
 * when the first submission arrives. Zero manual sheet setup required!
 *
 * -------------------------------------------------------------------
 * QUICK 1-MINUTE SETUP GUIDE:
 * -------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) and create a blank spreadsheet.
 *    Name it: "Sukoon Saathi Database"
 * 2. In the top menu, go to: Extensions > Apps Script
 * 3. Delete any default code in the editor, copy and paste this ENTIRE file.
 * 4. (Optional) Set NOTIFY_EMAIL below to your email to receive instant alerts.
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

// OPTIONAL: Enter your email address to receive instant email notifications.
// Leave as "you@example.com" if you do not want email alerts.
const NOTIFY_EMAIL = "you@example.com";

/**
 * Health check / Status endpoint
 * Visit the Web App URL in your browser to verify it's working.
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
      activeTabs: sheets
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

      sendNotificationEmail("New Order Placed — " + (data.orderId || "Sukoon Saathi"), [
        ["Order ID", data.orderId],
        ["Customer Name", data.customerName || data.name],
        ["Phone", data.phone],
        ["Email", data.email],
        ["Total Amount", data.totalAmount],
        ["Total Items", data.totalItems],
        ["Items Ordered", data.itemsSummary],
        ["Delivery Address", (data.address || "") + ", " + (data.city || "") + " - " + (data.pincode || "")],
        ["Customer Notes", data.notes]
      ]);

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

      sendNotificationEmail("New Session Booking Request", [
        ["Client Name", data.name],
        ["Phone", data.phone],
        ["Email", data.email],
        ["Service Requested", data.service],
        ["Preferred Date", data.preferred_date],
        ["Preferred Time", data.preferred_time],
        ["Notes", data.notes]
      ]);

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

      sendNotificationEmail("New Contact Message", [
        ["Sender Name", data.name],
        ["Phone", data.phone],
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
 * Helper: Sends optional email notification when new submissions arrive
 */
function sendNotificationEmail(subjectPrefix, rows) {
  if (!NOTIFY_EMAIL || NOTIFY_EMAIL.indexOf("example.com") !== -1) return;

  var bodyLines = rows
    .filter(function (r) { return r[1]; })
    .map(function (r) { return r[0] + ": " + r[1]; })
    .join("\n");

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "Sukoon Saathi — " + subjectPrefix,
    body: bodyLines + "\n\nReceived at (IST): " + getISTTimestamp()
  });
}
