module.exports = {
  markdown: function (value) {
    let markdown = require("markdown-it")({
      html: true,
    });
    return markdown.render(value);
  },
  icon: function (value) {
    return `<svg class="feather" aria-hidden="true"><use href="/assets/images/feather-sprite.svg#${value}" /></svg>`;
  },
};
