const EleventyFetch = require('@11ty/eleventy-fetch')

const mastodon = {
  id: '109319595958763014',
  endpoints: {
    profile: 'https://mstdn.party/api/v1/accounts/109319595958763014',
    feed: 'https://mstdn.party/api/v1/accounts/109319595958763014/statuses/?limit=40',
  }
}

async function fetchMastodon() {
  return {
    id: mastodon.id,
    profile: await EleventyFetch(mastodon.endpoints.profile, { duration: '1d', type: 'json' }),
    feed: assignMastodonReplies(await EleventyFetch(mastodon.endpoints.feed, { duration: '1d', type: 'json' }))
  }
}

/**
 * 
 * @param {Object[]} arr 
 */
function assignMastodonReplies(arr) {
  arr.forEach(entry => {
    const { id } = entry

    if (entry.in_reply_to_account_id === mastodon.id) {
      // Get entry that receives this reply
      const { in_reply_to_id: inReplyToId } = entry
      const inReplyTo = arr.find(post => post.id === inReplyToId)
      inReplyTo.replyEntry = id
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