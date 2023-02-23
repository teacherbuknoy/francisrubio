import { getUrlList, pingInternetArchive } from './functions/i-archive/archive.mjs'

async function beginArchive() {
  const urls = await getUrlList()
  const errors = []
  const statuses = urls.map(async url => {
    console.log("[ARCHIVE] Archiving URL:", url)
    return pingInternetArchive(url)
      //.then(response => console.log('[RESPONSE]', response.body))
      .catch(err => {
        console.log('[ERROR]', url, err)
        errors.push({ url, error: err })
      })
  })

  Promise.allSettled(statuses)
    .then(data => {
      console.log("[TOTAL URLS]", urls.length)
      console.log("[TOTAL ERRORS]", errors.length)
    })
}

beginArchive()