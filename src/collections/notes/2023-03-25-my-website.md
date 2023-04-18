---
title: "My new website design"
tags: 
  - web development
  - html
  - css
---

I went to a photo studio recently so I could update my [Eleventy](https://11ty.dev/) website banner. Here's what I've been working on for several hours now.

That image swapping as the window resizes happens via the `<picture>` element so the browser only loads the specific image when the user actually needs it, instead of loading both and hiding the other on certain breakpoints. No JS needed for this too!

<video controls width="1920" height="1080" class="embed embed--youtube" poster="https://ik.imagekit.io/8jjzxcl9p/tr:h-450/notes/my-website/video-poster.png">
  <source src="https://ik.imagekit.io/8jjzxcl9p/tr:f-webm,h-450/notes/my-website/website.mp4" type="video/webm">
  <source src="https://ik.imagekit.io/8jjzxcl9p/tr:f-mp4,h-450/notes/my-website/website.mp4" type="video/mp4">
  <p>Your browser does not support HTML5 videos. You can download the video in <a href="https://ik.imagekit.io/tr:f-webm/8jjzxcl9p/notes/my-website/website.mp4" download>WEBM</a> or <a href="https://ik.imagekit.io/tr:f-mp4/8jjzxcl9p/notes/my-website/website.mp4">MP4</a> format instead.</p>
</video>

<figure class="image">
  <picture>
    <source
    srcset="https://ik.imagekit.io/8jjzxcl9p/tr:f-avif/notes/my-website/tablet.jpg"
      type="image/avif"
    >
    <source
      srcset="https://ik.imagekit.io/8jjzxcl9p/tr:f-webp/notes/my-website/tablet.jpg"
      type="image/webp"
    >
    <img 
      src="https://ik.imagekit.io/8jjzxcl9p/notes/my-website/tablet.jpg" 
      loading="lazy"
      alt="My website as viewed on a medium-width viewport on portrait orientation." width="920" height="1236">
  </picture>
  <figcaption>I eventually added a different photo for tablet-ish sizes just to add some variety because I just saw this shot out of the 319 photos I ended up taking from the shoot yesterday. I think it looks quite lovely.</figcaption>
</figure>

I got comments from my Mastodonian friends and apparently they like it:

<article class="webmention-reply">
  <header class="webmention-reply__header">
    <div class="d-flex gap--xs ai--center">
      <img src="https://webmention.io/avatar/s3.masto.ai/1e4ee514c005d8b10c5d5fd843aeba9386bf7eabaf42d718ce8b0057dd436a4c.jpg" alt="Photo of Kagan MacTane" class="webmention__author-photo">
      <a href="https://wandering.shop/@kagan" class="webmention__author-link">Kagan MacTane</a>
    </div>
    <a href="https://wandering.shop/@kagan/110085372404602501">
      <time datetime="3/25/2023, 6:37:56 PM">Mar 25, 2023, 6:37 PM</time>
    </a>
  </header>
  <div class="webmention-reply__body"><p><span class="h-card"><a href="https://masto.ai/@teacherbuknoy" class="u-url">@<span>teacherbuknoy</span></a></span> Everything about this is so good. Not just the various, awesome, responsive designs, and the fact that it's no-JS, but also the photo choices, all the way to the desktop background and the song. Truly 💯✨. Love it all!</p></div>
</article>

<article class="webmention-reply">
  <header class="webmention-reply__header">
    <div class="d-flex gap--xs ai--center">
      <img src="https://webmention.io/avatar/s3.masto.ai/001922fb932e66c17bf5a65660b68355a3ea1ae46870d2321db4caac8a4409f2.png" alt="Photo of ngmi" class="webmention__author-photo">
      <a href="https://mastodon.online/@ngmi" class="webmention__author-link">ngmi</a>
    </div>
    <a href="https://mastodon.online/@ngmi/110085431926013977">
      <time datetime="3/25/2023, 6:53:04 PM">Mar 25, 2023, 6:53 PM</time>
    </a>
  </header>
  <div class="webmention-reply__body"><p><span class="h-card"><a href="https://masto.ai/@teacherbuknoy" class="u-url">@<span>teacherbuknoy</span></a></span> <span class="h-card"><a href="https://fosstodon.org/@eleventy" class="u-url">@<span>eleventy</span></a></span> cool</p></div>
</article>
