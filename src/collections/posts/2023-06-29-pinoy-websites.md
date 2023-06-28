---
title: "Introducing Pinoy Websites"
description: "A web ring of Filipinos who maintain a website"
permalink: "/writing/en/pinoy-websites/"
category: [projects, web development]
theme:
  scheme: dark
  color: '#374e46'
  color-hsl: '159 17% 26%'
  style:
    image:
      '--img-object-fit': cover
      '--img-object-position': left bottom
      '--post-image': linear-gradient(var(--theme-color), var(--theme-color))
cover:
  folder: ph-webring
  filename: cover.png
  header: header.png
  sizes: [500, 600, 700, 1000, 1280]
  formats: ['png', 'webp']
author: "teacherbuknoy"
language: "en"
seo:
  twitter:
    url: "https://ik.imagekit.io/8jjzxcl9p/tr:f-png,w-0.5/posts/new-frontpage/twitter.png"
    is_prefixed: false
  og:
    url: "https://ik.imagekit.io/8jjzxcl9p/tr:f-png,w-0.5/posts/new-frontpage/og.png"
    is_prefixed: false
eleventyExcludeFromCollections: false
---

Recently, I started a web ring called <cite><a href="https://webring.antaresph.dev/">Pinoy Websites</a></cite>. Web rings are a thing in the 90s where a bunch of people who have websites come together to form an agreement to link to each others' websites. This was before social media even existed. [Max Boeck](https://mxb.dev/) put it better into words

<figure class="quotation">
    <blockquote>
        <p>It’s a blast from the past: In the 90s, sites about a common topic could join together in a central index. To be a member, you had to embed a little widget on your page that contained a “forward”, a “backward”, and a “random” button. These buttons would then link to the next or previous site in the ring.</p>
    </blockquote>
    <figcaption>
        <cite><a href="https://mxb.dev/blog/webring-kit/" target="_blank" rel="noopener">A Webring Kit</a></cite> by <a href="https://mxb.dev/">Max Boeck</a>
    </figcaption>
</figure>

Since I read that article, I wanted to join a web ring. But I couldn't find one that I felt comfortable enough to join, so made one.

## Who can join this web ring?
[Pinoy Websites][ph-webring] has a simple list of criteria of people who wish to join:

- You are a Filipino
- You own a website
- The website you own is safe for work (no porn, gore, anything people browsing in public will be embarrassed about)

And that's it. If you are <em>all</em> of these three, then you can join the webring. This is also going to be good for people who had just started learning how to develop websites, or those who just want to put their blogs out there. It's not a guarantee that you'll be the next web traffic superstar upon joining, but hey, it's good to be involved in something. Plus, if you are looking for a way to practice your Git skills, joining is a great way to do that. As you will see in the following section, you can join with a fork, commit, push, and pull request.

## How to join the web ring

If you are a developer and you're familiar with this thing, you can open a pull request to the web ring's repository. I'll also write details about that in this post, but I want to discuss joining for those who aren't technical enough to open pull requests.

Joining is as easy as filling out a form. On the [website][ph-webring], you will find the [join form][join-form] under the section <cite>If you're not a developer…</cite> Fill out the form by entering your website name and URL. If your site has RSS feeds you want to promote, you can add them too, but it's optional.

Upon submitting the form, I will receive your entry via email. I will then be the one doing the pull request for your site, of course after checking out your gorgeous work. 😉 I'll then send you an email to notify you that you are already in our web ring.

## Developers: open a pull request

If you're a developer, follow these instructions to add your site to the web ring.

1. Fork the repository.
2. In your fork, edit the file `src/data/members.json`.
3. To add your site, add an object to the JSON array with the following properties:
   - `title` - the title of your website
   - `url` - the URL of your website
   - `feeds` - an array of your RSS feeds. You can leave this out if your website doesn't have one. But if you do, these are what you need for each entry:
      - `name` - the name for this RSS feed
      - `url` - the URL for this RSS feed.
4. Commit and push your changes to your repository.
5. Open a pull request for your changes.
  
This is an example of an entry in `members.json`:

```json
[
…
  {
    "title": "Francis Rubio",
    "url": "https://francisrubio.antaresph.dev/",
    "feeds": [
      { "name": "Everything", "url": "https://francisrubio.antaresph.dev/feed.xml" },
      { "name": "Posts", "url": "https://francisrubio.antaresph.dev/blog.xml" },
      { "name": "Literature", "url": "https://francisrubio.antaresph.dev/literature.xml" },
      { "name": "Videos", "url": "https://francisrubio.antaresph.dev/videos.xml" }
    ]
  }
…
]
```

## Add the banner to your site

Once you've joined in the web ring (i.e. your site appears on the [members list][ph-webring]), add the following code on your website. It could be anywhere as long as it can be seen easily.

```html


<webring-banner>
    <p>Member of the <a href="https://webringdemo.netlify.com">Nerds of the 90s</a> webring</p>
    <a href="https://webring.antaresph.dev/previous">Previous</a>
    <a href="https://webring.antaresph.dev/random">Random</a>
    <a href="https://webring.antaresph.dev/next">Next</a>
</webring-banner>
<script async src="https://webring.antaresph.dev/embed.js" charset="utf-8"></script>
```

It will render as something like this:
<webring-banner class="margin-block--xxxl"></webring-banner>

Of course, there are several themes you can choose from so the banner suits your website's design (more info at [Pinoy Websites][ph-webring]). You can also create your own banner. It only has to have four links total:
- `https://webringdemo.netlify.com`: the web ring's website
- `https://webring.antaresph.dev/previous`: the link to the previous member of the web ring
- `https://webring.antaresph.dev/next`: the link to the next member of the web ring
- `https://webring.antaresph.dev/random`: the link to a random member of the web ring

## Welcome to the club

Start joining the [Pinoy Websites][ph-webring] web ring today! If you have further questions, hit me up on [Mastodon][mastodon]. Or if you want to start your own webring, you can fork the [repository][git-ph-webring] and host it somewhere. Have fun!

[mastodon]: https://masto.ai/@teacherbuknoy
[ph-webring]: https://webring.antaresph.dev/
[join-form]: https://webring.antaresph.dev/#join-pinoy-bloggers
[git-ph-webring]: https://github.com/teacherbuknoy/ph-webring