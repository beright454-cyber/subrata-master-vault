/**
 * @file Code.gs
 * @description Master Backend for the Subrata Mondal Ecosystem
 */

function initialSetup() {
  const sp = PropertiesService.getScriptProperties();
  sp.setProperty('VERSION', 'MASTER_PRO_2026');
  sp.setProperty('OWNER', 'SUBRATA MONDAL');
}

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('SUBRATA MONDAL | PORTFOLIO')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    sendMessage("ADMIN", `System Access: ${data.nodeName}`);
    return ContentService.createTextOutput("Node Decrypted");
  } catch(err) {
    return ContentService.createTextOutput("Sync Error: " + err.message);
  }
}

function parseSheetData(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  return sheet.getDataRange().getValues().slice(1);
}

function sendMessage(chatId, text) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Logs');
  sheet.appendRow([new Date(), chatId, text]);
}