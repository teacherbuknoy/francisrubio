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
  machineReadableDate: function (value) {
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const date = value.getDate();
    return `${year.toString().padStart(4, 0)}-${month
      .toString()
      .padStart(2, 0)}-${date.toString().padStart(2, 0)}`;
  },
  humanReadableDate: function (value) {
    let formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
    return formatter.format(value);
  }
};
