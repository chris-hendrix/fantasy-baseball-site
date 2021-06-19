import creds from './client_secret.json'
import GoogleSpreadsheet from 'google-spreadsheet'
//const GoogleSpreadsheet = require('google-spreadsheet').GoogleSpreadsheet;

async function getSheet(docId, sheetName){
  const doc = new GoogleSpreadsheet.GoogleSpreadsheet(docId)
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key.replace(/\\n/g, "\n")
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[sheetName];
  return sheet
}

async function getSheetData(docId, sheetName) {
  const sheet = await getSheet(docId, sheetName)
  const rows = await sheet.getRows({ offset: 1 })
  await sheet.loadHeaderRow()
  const headers = sheet.headerValues
  const data = []
  rows.forEach(row => { 
    const obj = {}
    headers.forEach(h=>{
      obj[h] = row[h]
    })
    data.push(obj)
   })
  console.log(data)
  return data
}

async function getSheetColumns(docId, sheetName){
  const sheet = await getSheet(docId, sheetName)
  await sheet.loadHeaderRow()
  const headers = sheet.headerValues
  const columns = headers.map(x => {
    return {
      Header: x,
      accessor: x.toLowerCase().replace(/ /g, ''),
    }
  })
  const columnsObject = {
    Header: 'header',
    columns: columns
  }
  console.log(columnsObject)
  return columnsObject
}

export { getSheetColumns, getSheetData }