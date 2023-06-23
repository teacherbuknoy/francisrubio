/**
 * @callback TabEventCallback
 * @param {TabEvent} e the details of the event
 */

/**
 * @typedef {Object} TabEvent
 * @property {Tab} target the Tab object that raised the event
 * @property {TabControl} parent the TabControl object that the target belongs to
 * @property {Tab} hidden the Tab object that was hidden by this event
 * @property {Tab} shown the Tab object that was shown by this event
 */

/** 
 * @typedef {Object} MastodonPost
 * @property {string} id
 * @property {string} created_at
 * @property {string} in_reply_to_account_id
 * @property {string} in_reply_to_id
 * @property {boolean} sensitive
 * @property {string} spoiler_text
 * @property {MastodonPostVisibility} visibility
 * @property {string} language
 * @property {string} uri
 * @property {string} url
 * @property {number} replies_count
 * @property {number} reblogs_count
 * @property {number} favourites_count
 * @property {string} edited_at
 * @property {string} content
 * @property {boolean} reblogged
 * @property {boolean} favourited
 * @property {boolean} bookmarked
 * @property {string} replyEntry
 * @property {MastodonMediaAttachment[]} media_attachments
 * @property {MastodonPreviewCard} card
 */

/** @typedef {'public'|'unlisted'|'private'|'direct'} MastodonPostVisibility */

/**
 * @typedef {Object} MastodonMediaAttachment
 * @property {string} id
 * @property {string} type
 * @property {string} url
 * @property {string} preview_url
 * @property {string} remote_url
 * @property {string} preview_remote_url
 * @property {string} description
 * @property {string} blurhash
 */

/**
 * @typedef {Object} MastodonTag
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} MastodonPreviewCard
 * @property {string} url
 * @property {string} title
 * @property {string} description
 * @property {string} type
 * @property {string} author_name
 * @property {string} author_url
 * @property {string} provider_name
 * @property {string} provider_url
 * @property {string} html
 * @property {string} width
 * @property {string} height
 * @property {string} image
 * @property {string} embed_url
 * @property {string} blurhash
 * 
 */

/**
 * @typedef {Object} MastodonFeedItem
 * @property {string} id,
 * @property {string[]} replies
 * @property {boolean} isReply
 * @property {SocialPost} component
 * @property {MastodonPost} data
 */

/**
 * @typedef {Object} FaunaResponse
 * @property {[Object, String]} after
 * @property {[Object, String]} before
 * @property {FaunaDocument[]} data
 */

/**
 * @typedef {Object} FaunaDocument
 * @property {[Object, String]} ref
 * @property {number} ts
 * @property {AnalyticRecord} data
 */

/**
 * @typedef {Object} AnalyticRecord
 * @property {string} browser
 * @property {string} createdAt
 * @property {string} dateTime
 * @property {string} device
 * @property {string} eventType
 * @property {string} language
 * @property {string} os
 * @property {string} path
 * @property {string} referrer
 * @property {string} sessionId
 * @property {string} timezone
 * @property {string} userAgent
 */