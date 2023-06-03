const { query, Client } = require('faunadb')
const { Create, Collection, Map, Lambda, Var } = query
require('dotenv').config()
const FAUNA_COLLECTION = "analytics-data"

exports.handler = async (event, context, callback) => {

  try {

    const client = new Client({
      secret: process.env.FAUNADB_APIKEY,
      endpoint: process.env.FAUNADB_ENDPOINT,
    })
    
    const request = client.query(
      Map(
        JSON.parse(event.body),
        Lambda(
          'data',
          Create(
            Collection(FAUNA_COLLECTION),
            { data: Var('data') }
          )
        )
      )
    )

    await request.catch(e => {
      console.log(e)
      throw e
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data recorded.' })
    }
  }
  catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}