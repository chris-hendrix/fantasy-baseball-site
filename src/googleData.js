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
  console.log(doc)
  const sheet = doc.sheetsByTitle[sheetName];
  return sheet
}

function getAccessor(columnName){
  return columnName.replace(/ /g, '')
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
      obj[getAccessor(h)] = row[h]
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
  const columns = headers.map(h => {
    return {
      Header: h,
      accessor: getAccessor(h),
      canGroupBy: false,
    }
  })
  
  return columns
}
export { getSheetColumns, getSheetData }