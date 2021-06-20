import GoogleSpreadsheet from 'google-spreadsheet'

// returns sheet from a google doc
async function getSheet(sheetName){
  // get doc by docID
  const doc = new GoogleSpreadsheet.GoogleSpreadsheet(process.env.REACT_APP_DOC_ID)

  // authenticate
  await doc.useServiceAccountAuth({
    client_email: process.env.REACT_APP_CLIENT_EMAIL,
    private_key: process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, "\n")
  });

  // load info
  await doc.loadInfo();

  // get sheet by name
  const sheet = doc.sheetsByTitle[sheetName];
  return sheet
}

// gets 
async function getSheetData(sheetName) {
  // get sheet
  const sheet = await getSheet(sheetName)

  // load rows and header rows
  const rows = await sheet.getRows({ offset: 0 })
  await sheet.loadHeaderRow()

  // modify rows as list react table objects
  const headers = sheet.headerValues
  const data = []
  rows.forEach(row => { 
    const obj = {}
    headers.forEach(h=>{
      obj[getAccessor(h)] = row[h]
    })
    data.push(obj)
   })

   // return data
  return data
}

async function getSheetColumns(sheetName, filters={}, excludedColumns=[]){

  // get sheet and load header rows
  const sheet = await getSheet(sheetName)
  await sheet.loadHeaderRow()

  // create list of react table column objects
  const headers = sheet.headerValues
  const columns = []

  headers.forEach(h => {

    // skip excluded columns
    if (excludedColumns.includes(h)) { return }

    // create react table column object
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

    // add to list
    columns.push(column)
  })
  return columns
}

// remove spaces and capitals
function getAccessor(columnName){
  return columnName.replace(/ /g, '').toLowerCase()
}


export { getSheetColumns, getSheetData }