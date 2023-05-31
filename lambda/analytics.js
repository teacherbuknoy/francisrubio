const { GoogleSpreadsheet } = require('google-spreadsheet')
require('dotenv').config

exports.handler = async (event, context, callback) => {
  try {
    const doc = new GoogleSpreadsheet('170OW7wdMrchhjngyEqhzzZQR5s3EWdrpS9NAMC_rD_E')
    await doc.useServiceAccountAuth({ client_email: process.env.GCP_CLIENT_EMAIL, private_key: process.env.GCP_PRIVATE_KEY })
    await doc.loadInfo()

    const data = JSON.parse(event.body)
    const addedRow = await StyleSheet.addRow(data)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data recorded.' })
    }
  }
  catch (e) {
    return {
      statusCode: 500,
      body: e.toString()
    }
  }
}