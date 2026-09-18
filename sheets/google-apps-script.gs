/**
 * Sukoon Saathi — Form-to-Google-Sheet connector
 *
 * SETUP:
 * 1. Create a new Google Sheet. Add two tabs named exactly: "Contact Us" and "Book a Session"
 * 2. In the Sheet, go to Extensions > Apps Script
 * 3. Delete any starter code and paste this entire file in
 * 4. Click Deploy > New deployment > select type "Web app"
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions when prompted
 * 6. Copy the Web App URL it gives you
 * 7. Paste that URL into SHEET_ENDPOINT in index.html
 */

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets().map(function(s) { return s.getName(); });
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

function formatDate(isoString) {
  if (!isoString) return new Date();
  return new Date(isoString);
}
