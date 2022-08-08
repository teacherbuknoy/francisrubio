---
title: Philippine Consulate General
description: The official website of the Philippine Consulate General in Calgary, Alberta, Canada.
date: 2022-02-25
tags:
  - Web Development
links:
  - text: Official Website
    url: https://philcongencalgary.org/
    is_primary: true
logo:
  src: "/assets/images/projects/philcongen-logo-alt.png"
  alt: Philippine Consulate General's logo
  width: 1080
  height: 1080
cover:
  src: "/assets/images/projects/philcongencalgary/cover.png"
  alt: Philippine Consulate General - Calgary
  width: 1200
  height: 630
---

## Problem

The official website of the Philippine Consulate General of Calgary was really outdated, broken, and was miles away from being responsive and mobile-friendly. They came to HatchUp Media to commission a revamp of the website. Their original website was hosted on Wix, and it was very far from usable.

They wanted the new website to have a CMS that they can use to add new press releases. As for other major changes to the site such as navigation links, we agreed to change it whenever the needs arise.

<figure class="image" style="width: min(90ch, 100%); margin-inline: auto;">
  <div class="center-justified cluster gap--m">
    <img style="width: min(35ch, 100%); flex-basis: 35ch; flex-grow: 0;" src="/assets/images/projects/philcongencalgary/philcongen-old-1.png" alt="Screenshot of the old website of the Philippine Consulate General to Calgary, Canada">
    <img style="width: min(35ch, 100%); flex-basis: 35ch; flex-grow: 0;" src="/assets/images/projects/philcongencalgary/philcongen-old.png" alt="Screenshot of the old website of the Philippine Consulate General to Calgary, Canada">
    <img style="width: min(35ch, 100%); flex-basis: 35ch; flex-grow: 0;" src="/assets/images/projects/philcongencalgary/philcongen-old-2.png" alt="Screenshot of the old website of the Philippine Consulate General to Calgary, Canada">
  </div>
  <figcaption>
    <strong>Figure 1</strong>: The old website of the Philippine Consulate General to Calgary was far from usable and being mobile friendly.
  </figcaption>
</figure>

## Development

To make it fast, I opted into making it a static site using [Eleventy][eleventy], a static site generator. Since this website will be used mostly for posting informational content and advisories, it will not have the need for front end frameworks that use JavaScript, and everything can be done from the server. For the layout, I used a baseline CSS system that I developed for reuse in new projects, and used [SCSS][scss] in development. No JavaScript frameworks are used, and apart from the navigation menu and other necessary interactive components, the site has very minimal scripting. We also used [Google Analytics][ga] for the site analytics. The site is hosted via Netlify, and the CMS is powered by [Forestry][forestry].

## Results

The new website follows the design language of most of the Philippine government sites. On top of that, the site is now more responsive. The site also suffered from having too many links, and one of the most efforts we put into was in the information architecture of the site. It also adapts to the user's system dark color scheme.

<figure class="image margin-top--xl">
  <div class="cluster gap--m">
    <img style="width: min(35ch, 100%); flex-basis: 35ch;" src="/assets/images/projects/philcongencalgary/new-1.png" alt="Screenshot of the new website in dark mode">
    <img style="width: min(35ch, 100%); flex-basis: 35ch;" src="/assets/images/projects/philcongencalgary/new-2.png" alt="Screenshot of the new website in light mode">
  </div>
  <figcaption>
    <strong>Figure 2</strong>: The new website adapts to the user's system dark color scheme.
  </figcaption>
</figure>
<figure class="image margin-top--xl" style="width: min(90ch, 100%); margin-inline: auto;">
  <img src="/assets/images/projects/philcongencalgary/new-3.png" alt="Screenshot of the new website in dark mode">
  <figcaption>
    <strong>Figure 3</strong>: The new website organizes the links into sensible groups in the navigation menu.
  </figcaption>
</figure>
<figure class="image margin-top--xl" style="width: min(90ch, 100%); margin-inline: auto;">
  <img src="/assets/images/projects/philcongencalgary/new-4.png" alt="Screenshot of the new website's press releases">
  <figcaption>
    <strong>Figure 4</strong>: Because of the new CMS, press releases are easier to create to the new site. New press releases are also easier to find because of the new press release previews in the front page.
  </figcaption>
</figure>

*[CMS]: Content Management System
*[CSS]: Cascading Style Sheets.

[eleventy]: https://11ty.dev/
[scss]: https://sass-lang.com/
[ga]: https://analytics.google.com/
[forestry]: https://forestry.io/