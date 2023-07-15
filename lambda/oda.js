exports.handler = async (event, context, callback) => {
  const { parameters } = JSON.parse(event.body)
  const url = new URL('https://genuine-beignet-1e6bb4.netlify.app/')
  parameters.forEach(param => url.searchParams.append(param.key, param.value))

  return {
    statusCode: 200,
    body: JSON.stringify({
      "webview.url": url.toString()
    })
  }
}