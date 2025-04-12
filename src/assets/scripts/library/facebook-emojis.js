const EMOJIS = {
  "/images/emoji.php/v9/t8c/1/16/1f389.png": "🎉",
  "/images/emoji.php/v9/tb/1/16/1f388.png": "🎈",
  "/images/emoji.php/v9/t5/1/16/1f382.png": "🎂",
  "/images/emoji.php/v9/t6d/1/16/1f973.png": "🥳",
  "/images/emoji.php/v9/t55/1/16/1f607.png": "😇",
  "/images/emoji.php/v9/tb4/1/16/1f38a.png": "🎊",
  "/images/emoji.php/v9/t49/1/16/1faf6.png": "🫶",
  "/images/emoji.php/v9/tea/1/16/1f970.png": "🥰",
  "/images/emoji.php/v9/t75/1/16/1f618.png": "😘"
}

function selectEmojiByImageUrl(url) {
  const link = new URL(url)
  return EMOJIS[link.pathname]
}

export { selectEmojiByImageUrl }