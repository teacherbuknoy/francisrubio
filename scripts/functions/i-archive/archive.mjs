import { createRequire } from "module"
import { FormData } from 'formdata-node'
import needle from 'needle'

const require = createRequire(import.meta.url)
const list = require('../../../public/links.json')

const API_ENDPOINT = "https://web.archive.org/save"

function getUrlList() {
  return list
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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