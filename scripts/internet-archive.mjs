import { getUrlList, pingInternetArchive } from './functions/i-archive/archive.mjs'

async function beginArchive() {
  const urls = await getUrlList()
  urls.forEach(async url => {
    console.log("[ARCHIVE] Archiving URL:", url)
    pingInternetArchive(url)
      //.then(response => console.log('[RESPONSE]', response.body))
      .catch(err => console.log('[ERROR]', err))
  })
}

beginArchive()