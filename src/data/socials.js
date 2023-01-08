const EleventyFetch = require('@11ty/eleventy-fetch')

const mastodon = {
  id: '109319595958763014',
  endpoints: {
    profile: 'https://mstdn.party/api/v1/accounts/109319595958763014',
    feed: 'https://mstdn.party/api/v1/accounts/109319595958763014/statuses/',
  }
}

async function fetchMastodon() {
  return {
    profile: await EleventyFetch(mastodon.endpoints.profile, { duration: '1d', type: 'json' })
  }
}

module.exports = async function () {
  return {
    mastodon: await fetchMastodon()
  }
}