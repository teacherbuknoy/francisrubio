const EleventyFetch = require('@11ty/eleventy-fetch')

const mastodon = {
  id: '109319595958763014',
  accountIds: [
    '109319595958763014',
    '109810743922547925',
  ],
  endpoints: {
    profile: 'https://masto.ai/api/v1/accounts/109810743922547925',
    profiles: [
      'https://masto.ai/api/v1/accounts/109810743922547925'
    ],
    feed: 'https://masto.ai/api/v1/accounts/109810743922547925/statuses/?limit=40',
    feeds: [
      'https://masto.ai/api/v1/accounts/109810743922547925/statuses/?limit=40',
    ]
  }
}

async function fetchMastodon() {
  const fetchFeed = async url => await fetchFirstOkayProfile()
  const feeds = (await Promise.all(mastodon.endpoints.feeds.map(fetchFeed))).flat()
  return {
    ...mastodon,
    profile: await EleventyFetch(mastodon.endpoints.profile, { duration: '1d', type: 'json' }),
    feed: assignMastodonReplies(sortPosts(feeds))
  }
}

/**
 * @description Fetches profile from the first Mastodon profile URL that doesn't throw an error
 * @author Francis Rubio
 * @param {number} [index=0]
 * @returns {Promise}  
 */
async function fetchFirstOkayProfile(index = 0) {
  const url = mastodon.endpoints.profiles[index]
  return EleventyFetch(url, { duration: '1d', type: 'json' })
    .catch(e => fetchFirstOkayProfile(index + 1))
}

function sortPosts(arr) {
  return arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

/**
 * 
 * @param {Object[]} arr 
 */
function assignMastodonReplies(arr) {
  arr.forEach(entry => {
    const { id } = entry

    if (mastodon.accountIds.includes(entry.in_reply_to_account_id)) {
      // Get entry that receives this reply
      const { in_reply_to_id: inReplyToId } = entry
      const inReplyTo = arr.find(post => post.id === inReplyToId)
      if (inReplyTo != null) {
        inReplyTo.replyEntry = id
      }
    }
  })
  return arr
}

function createFindReply(mastodon) {
  return (tootID) => {
    return mastodon.feed.find(entry => entry.id === tootID)
  }
}

module.exports = async function () {
  const mastodon = await fetchMastodon()
  mastodon.findReply = createFindReply(mastodon)

  return {
    mastodon
  }
}