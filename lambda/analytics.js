const { GoogleSpreadsheet } = require('google-spreadsheet')
require('dotenv').config()

exports.handler = async (event, context, callback) => {
  try {
    const doc = new GoogleSpreadsheet('170OW7wdMrchhjngyEqhzzZQR5s3EWdrpS9NAMC_rD_E')
    await doc.useServiceAccountAuth({
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByTitle['francisrub.io']

    const data = JSON.parse(event.body)
    const rows = await sheet.addRows(data)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data recorded.' })
    }
  }
  catch (e) {
    console.log(e.toString())
    return {
      statusCode: e.response.status,
      body: e.toString()
    }
  }
}