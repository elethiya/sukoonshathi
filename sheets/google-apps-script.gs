/**
 * Sukoon Saathi — Form-to-Google-Sheet connector with email notifications
 *
 * SETUP:
 * 1. Create a new Google Sheet (or use your existing one).
 * 2. In the Sheet, go to Extensions > Apps Script
 * 3. Delete any starter code and paste this entire file in
 * 4. Set NOTIFY_EMAIL below to the address that should receive alerts
 * 5. Click Deploy > New deployment > select type "Web app"
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 6. Click Deploy, authorize the permissions when prompted
 * 7. Copy the Web App URL it gives you
 * 8. Paste that URL into SHEET_ENDPOINT in main.js
 */

// ⚠️ Set this to the email address that should get notified on every submission
const NOTIFY_EMAIL = "you@example.com";

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets().map(function (s) { return s.getName(); });
    const info = {
      status: "connected",
      message: "Sukoon Saathi Form Handler is active and receiving submissions.",
      spreadsheetName: ss.getName(),
      spreadsheetUrl: ss.getUrl(),
      tabs: sheets
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

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.form_type === "book") {
      writeRow(ss, "Book a Session", [
        "Timestamp", "Name", "Phone", "Email", "Service", "Preferred Date", "Preferred Time", "Notes"
      ], [
        formatDate(data.submitted_at),
        data.name || "",
        data.phone || "",
        data.email || "",
        data.service || "",
        data.preferred_date || "",
        data.preferred_time || "",
        data.notes || ""
      ]);
      sendNotificationEmail("New Session Booking", [
        ["Name", data.name], ["Phone", data.phone], ["Email", data.email],
        ["Service", data.service], ["Preferred Date", data.preferred_date],
        ["Preferred Time", data.preferred_time], ["Notes", data.notes]
      ]);
    } else {
      writeRow(ss, "Contact Us", [
        "Timestamp", "Name", "Phone", "Email", "Subject", "Message"
      ], [
        formatDate(data.submitted_at),
        data.name || "",
        data.phone || "",
        data.email || "",
        data.subject || "",
        data.message || ""
      ]);
      sendNotificationEmail("New Contact Message", [
        ["Name", data.name], ["Phone", data.phone], ["Email", data.email],
        ["Subject", data.subject], ["Message", data.message]
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function writeRow(ss, sheetName, headers, rowValues) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(rowValues);
  sheet.autoResizeColumns(1, headers.length);
}

function sendNotificationEmail(subjectPrefix, rows) {
  if (!NOTIFY_EMAIL || NOTIFY_EMAIL.indexOf("example.com") !== -1) return;

  const bodyLines = rows
    .filter(function (r) { return r[1]; })
    .map(function (r) { return r[0] + ": " + r[1]; })
    .join("\n");

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "Sukoon Saathi — " + subjectPrefix,
    body: bodyLines + "\n\nReceived: " + new Date().toLocaleString()
  });
}

function formatDate(isoString) {
  if (!isoString) return new Date();
  return new Date(isoString);
}
