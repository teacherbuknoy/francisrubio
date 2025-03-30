---
title: Testing… testing…
tags:
  - indieweb
  - web development

---

<p>I watched the very awesome 11ty International Symposium On Making Web Sites Real Good, and although I have yet to finish it, I already got a lot of good things out of it. One of them is Micropub and POSSE (thanks <a href="https://henry.codes">Henry</a>!). It's all part of the <a href="https://indieweb.org/">IndieWeb</a> movement that I am following for as long as my blog has been on Eleventy.</p>
<p>POSSE means "Publish  (on your) Own Site, Syndicate Elsewhere." And this is a way of owning your content instead of entrusting it to different content syndication and social media platforms. I have always understood the concept of how it works (publish on your website, code something up that automatically posts/links it on every social media platform), but it wasn't until Henry's talk in the Symposium that it really clicked in my head on how to go around doing it.</p>
<p>So this note is a test. I coded something up as a Cloudflare Worker that would take requests from <a href="https://quill.p3k.io/">Quill</a> and publish it on my site by committing a markdown file in my website's Github repo and thereby triggering my Vercel to deploy my site. It's a bit of a mishmash right now, and that's the consequence of me using free services, but it's just my site and I am okay with complications.</p>
<p>After this, hopefully, I would be able to code something up that would continue the work from here. That is, once notes are published, they are automatically "syndicated" or posted/linked to on my other social media accounts, <a href="https://masto.ai/@teacherbuknoy">Mastodon</a> first of course. Cheers!</p>