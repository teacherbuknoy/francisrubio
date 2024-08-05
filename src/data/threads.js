const EleventyFetch = require('@11ty/eleventy-fetch')
const { mastodon } = require('./site.json').variables
const THREADS = [
  "https://masto.ai/@teacherbuknoy/110671603523280432",
  "https://masto.ai/@teacherbuknoy/110084718692154094",
  "https://masto.ai/@teacherbuknoy/110369962218101139",
  "https://masto.ai/@teacherbuknoy/110340182174714816",
  "https://masto.ai/@teacherbuknoy/110348607727221821",
  "https://masto.ai/@teacherbuknoy/110326075102504700",
  "https://masto.ai/@teacherbuknoy/110231963480091629",
  "https://masto.ai/@teacherbuknoy/110099591986175898",
  "https://masto.ai/@teacherbuknoy/110096487405455823",
  "https://masto.ai/@teacherbuknoy/110084633287634931",
  "https://masto.ai/@teacherbuknoy/110071327496877258",
  "https://masto.ai/@teacherbuknoy/109861759709188293",
  "https://masto.ai/@teacherbuknoy/109833474488205411",
  "https://masto.ai/@teacherbuknoy/112884760940238456",
  "https://masto.ai/@teacherbuknoy/112652691610740453",
  "https://masto.ai/@teacherbuknoy/112853940201158483",
  "https://masto.ai/@teacherbuknoy/112803221856879623",
  "https://masto.ai/@teacherbuknoy/112777524105254267",
  "https://masto.ai/@teacherbuknoy/112766603492904109",
  "https://masto.ai/@teacherbuknoy/112765501335636715",
  "https://masto.ai/@teacherbuknoy/112760499842968166"
]

const STATUS_API = 'https://masto.ai/api/v1/statuses/'

async function getPost(id) {
  const url = STATUS_API + id
  const post = await EleventyFetch(url, { type: 'json', duration: '1d' })

  return post
}

async function getPostWithContext(id) {
  const url = STATUS_API + id + '/context'
  const { accountIds } = mastodon

  const context = await EleventyFetch(url, { type: 'json', duration: '1d' })
  
  const getRepliesToSelf = post => post.in_reply_to_account_id == null || accountIds.includes(post.in_reply_to_account_id)
  const getPostsByMe = post => mastodon.accountIds.includes(post.account.id)

  const ancestors = context.ancestors.filter(getRepliesToSelf).filter(getPostsByMe)
  const descendants = context.descendants.filter(getRepliesToSelf).filter(getPostsByMe)
  const post = await getPost(id)

  return [ ...ancestors, post, ...descendants ]
}

function getPostId(id) {
  const urlSplit = id.split('/')
  return urlSplit[urlSplit.length - 1]
}

module.exports = async function () {

  const threads = THREADS.map(async function (id) {
    return {
      id, 
      context: await getPostWithContext(getPostId(id))
    }
  })

  const settledThreads = (await Promise.allSettled(threads)).map(p => p.value)
  const sortedThreads = settledThreads.sort((currentThread, nextThread) => {
    const currentPost = currentThread.context[0]
    const nextPost = nextThread.context[0]

    return new Date(nextPost.created_at) - new Date(currentPost.created_at)
  })

  return sortedThreads
}