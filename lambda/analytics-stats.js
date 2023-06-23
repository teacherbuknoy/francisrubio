const { query, Client } = require('faunadb')
const { Map, Paginate, Documents, Collection, Lambda, Ref, Get } = query
const FAUNA_COLLECTION = 'analytics-data'
const FAUNA_INDEX = 'analytics-get'
require('dotenv').config()

async function getStats(client, { size, after }) {
  return client.query(
    Map(
      Paginate(Documents(Collection(FAUNA_COLLECTION)), { size, after }),
      Lambda(x => Get(x))
    )
  )
}

exports.handler = async (event) => {
  const client = new Client({
    secret: process.env.FAUNADB_APIKEY,
    endpoint: process.env.FAUNADB_ENDPOINT
  })
  const { queryStringParameters: queries } = event
  const options = {
    size: queries?.size != null ? queries.size : 400,
    after: queries?.nextId != null ? Ref(Collection(FAUNA_COLLECTION), queries.nextId) : []
  }

  try {
    if (event.httpMethod === 'GET') {

      const request = await getStats(client, options)
      return {
        statusCode: 200,
        body: JSON.stringify(request)
      }
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: e.requestResult.statusCode || 500,
      body: JSON.stringify(e)
    }
  }
}