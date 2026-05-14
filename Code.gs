function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('Memory Span Task v1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

const SPREADSHEET_ID = '1wIIf4j7hSmi1C_9XAJH3ZWFbM2D4gm2AAPb4sLaDYXE';
const SHEET_NAME = 'memory_span_results';
const HEADERS = [
  'participant_id',
  'trial_index',
  'sequence_length',
  'target_sequence',
  'response',
  'exact_correct',
  'position_correct',
  'position_correct_count',
  'response_time_ms',
  'timestamp',
  'previous_sequence',
  'error_type'
];

function saveResults(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('No result rows to save.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateResultSheet_(spreadsheet);
    const values = rows.map(function(row) {
      return HEADERS.map(function(header) {
        return row[header] === undefined || row[header] === null ? '' : row[header];
      });
    });

    sheet
      .getRange(sheet.getLastRow() + 1, 1, values.length, HEADERS.length)
      .setValues(values);

    return {
      ok: true,
      savedRows: values.length,
      sheetName: SHEET_NAME
    };
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateResultSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}
