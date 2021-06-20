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

function getAccessor(columnName){
  return columnName.replace(/ /g, '').toLowerCase()
}


async function getSheetData(docId, sheetName) {
  const sheet = await getSheet(docId, sheetName)
  const rows = await sheet.getRows({ offset: 0 })
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
  return data
}

async function getSheetColumns(docId, sheetName, filters={}){
  const sheet = await getSheet(docId, sheetName)
  await sheet.loadHeaderRow()

  // create list of column objects
  const headers = sheet.headerValues
  const columns = headers.map(h => {
    const column = {
      Header: h,
      accessor: getAccessor(h),
      canGroupBy: false,
      disableFilters: true
    }
    // add filter if defined
    if (filters.hasOwnProperty(h)){
      if (filters[h] !== undefined | filters[h] !== null){
        column.disableFilters = false
        column.Filter = filters[h]
      }
    }
    return column
  })
  console.log(columns)
  return columns
}
export { getSheetColumns, getSheetData }