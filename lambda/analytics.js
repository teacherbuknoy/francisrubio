const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northeast-1' })

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })
const params = {
  TableName: 'analytics-francisrubio',
}

exports.handler = async function (event, context) {
  if (event.httpMethod != 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Allow': 'POST'
      }
    }
  }
}