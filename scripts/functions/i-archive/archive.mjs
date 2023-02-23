import { createRequire } from "module"
import { FormData } from 'formdata-node'
import needle from 'needle'

const require = createRequire(import.meta.url)
const list = require('../../../public/links.json')
const domain = require('../../../src/data/site.json').domains.find(d => d.isPreferred).value

const API_ENDPOINT = "https://web.archive.org/save"

async function getUrlList() {
  const url = `https://${domain}/links.json`
  const links = await fetch(url)
    .then(response => response.json())
  return links
}

/**
 * @description Sends a URL to the Internet Archive for crawling
 * @author Francis Rubio
 * @param {string} url
 */
function pingInternetArchive(url) {
  const data = { url }
  
  return new Promise((resolve, reject) => {
    needle.post(API_ENDPOINT, toFormData(data), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: "POST"
    }, (err, resp) => {
      if (err) {
        reject(err)
      } else {
        resolve(resp)
      }
    })
  })
}

function toFormData(object) {
  return Object.keys(object)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    .join('&')
}


export {
  getUrlList, pingInternetArchive
}