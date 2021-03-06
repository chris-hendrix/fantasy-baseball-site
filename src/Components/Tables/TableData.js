import GoogleSpreadsheet from 'google-spreadsheet'
import creds from '../../client_secret.json'
import React from 'react'

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

async function getDataAndHeaders(sheetName) {
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
  return {data: data, headers: headers}
}

function getColumns(headers, filters={}, options={}){

  // create list of react table column objects
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

    // create react table column object
    const column = {
      Header: header,
      accessor: accessor,
      canGroupBy: false,
      disableFilters: true,
    }


    // add filter if defined
    if (filters.hasOwnProperty(header)){
      if (filters[header] !== undefined | filters[header] !== null){
        column.disableFilters = false
        column.Filter = filters[header]
      }
    }

    // add hyperlink if defined
    // https://stackoverflow.com/questions/56922381/how-to-include-url-in-react-table-cell
    if (options.hasOwnProperty('links')) {
      options.links.forEach(link => {
        if (link.hasOwnProperty(header)){
          const linkAccessor = getAccessor(link[header])
          column.Cell = ({ row }) => <a href={row.original[linkAccessor]} target="_blank">{row.original[accessor]}</a>
        }
      })
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

// get data and columns
export async function getDataAndColumns(sheetName, filters={}, options={}){
  const dataAndHeads = await getDataAndHeaders(sheetName)
  const data = dataAndHeads.data
  const columns = getColumns(dataAndHeads.headers, filters, options)
  return {data: data, columns: columns}
}

