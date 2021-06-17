import creds from './client_secret.json'
import GoogleSpreadsheet from 'google-spreadsheet'

export async function getSheetData(docId, sheetName) {
  const doc = new GoogleSpreadsheet(docId)
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key.replace(/\\n/g, "\n")
  });
  
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[sheetName];
  await sheet.loadHeaderRow()
  const rows = await sheet.getRows({
    offset: 1
  })

  const headers = sheet.headerValues
  const data = rows.map(row => {
    return row['_rawData']
  })
  data.unshift(headers)
  console.log(data)
  return data
}