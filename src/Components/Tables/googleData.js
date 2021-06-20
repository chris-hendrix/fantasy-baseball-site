import GoogleSpreadsheet from 'google-spreadsheet'
import creds from '../../client_secret.json'

// returns sheet from a google doc
async function getSheet(sheetName){
  // get doc by docID
  const doc = new GoogleSpreadsheet.GoogleSpreadsheet('1YvznM3U5FS6SnirNS_JyLHElkD4FlqVJu_qz_-NIhWg')

  // authenticate
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key.replace(/\\n/g, "\n")
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

async function getSheetColumns(sheetName, filters={}, options={}){

  // get sheet and load header rows
  const sheet = await getSheet(sheetName)
  await sheet.loadHeaderRow()

  // create list of react table column objects
  const headers = sheet.headerValues
  const columns = []
  const accessors = []
  for (var i=0; i<headers.length; i++){
    
    // get header and accessor
    const header = headers[i]
    const accessor = getAccessor(header)

    // skip if header contians 'hidden'
    if (accessor.includes('-hidden')) { continue; }

    // skip if accessor exists
    if (accessors.includes(accessor)) { continue; }

    // skip excluded columns
    if(options.hasOwnProperty('excludedColumns')){
      if (options.excludedColumns.includes(header)) { continue; }
    }

    // create react table column object
    const column = {
      Header: header,
      accessor: accessor,
      canGroupBy: false,
      disableFilters: true
    }

    // add filter if defined
    if (filters.hasOwnProperty(header)){
      if (filters[header] !== undefined | filters[header] !== null){
        column.disableFilters = false
        column.Filter = filters[header]
      }
    }

    // add to list
    accessors.push(accessor)
    columns.push(column)

    // stop after last column
    if(options.hasOwnProperty('lastColumn')){
      if (options.lastColumn == header) { break; }
    }
  }
  
  return columns
}

// remove spaces and capitals
function getAccessor(columnName){
  return columnName.replace(/ /g, '').toLowerCase()
}


export { getSheetColumns, getSheetData }