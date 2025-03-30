---
title: "CSS is Just Progressive Enhancement"
description: null
category: [Cascading Style Sheets]
theme:
  scheme: dark
  color: '#000'
  color-hsl: '0 0% 0%'
  style:
    image:
      '--img-object-fit': cover
      '--img-object-position': right top
      '--post-image': linear-gradient(var(--theme-color), var(--theme-color))
cover:
  folder: antares-videos
  filename: cover.png
  header: header.png
  sizes: [500, 600, 700, 1000, 1280]
  formats: ['png', 'webp', 'avif']
author: "teacherbuknoy"
language: "en"
seo:
  twitter:
    url: "https://ik.imagekit.io/8jjzxcl9p/tr:w-947/tr:w-800/posts/antares-videos/twitter.png"
    is_prefixed: false
  og:
    url: "https://ik.imagekit.io/8jjzxcl9p/tr:w-947/tr:w-1200/posts/antares-videos/og.png"
    is_prefixed: false
---

I am not much of a writer, but I have been keen on staying up to date with things that come up on the web. I was there when people were debating about CSS-in-JS. It was also fun reading people's opinions on whether to use React or Vue or Angular or anything else. And it was also a very good experience for me when people more experienced than I am talked about fundamentals versus frameworks.

I have been a Web developer for 3 years, and I can say that these issues are what matter to me. They could either make my life easier or give me headaches as I try to meet deadlines that I won't make anyway. But one thing I have noticed is that whenever people come up to me and find out that I create websites for a living, they don't really care about what we use or how we do things. They are on the web because of the *stuff* that's on the web. And this is something that I have read multiple times in blogs by other developers and designers.

The emphasis on has been on providing quality *content* rather than tooling. It's what our users care about. But what I want to talk about is semantics, the proper usage of HTML tags.

I came across a transcript of Sir Tim Berners-Lee's talk for the 35th anniversary of the LCS, [The Future of the Web](https://www.w3.org/1999/04/13-tbl.html). There he mentioned <i>documents</i> and <i>data</i>, with documents being what we humans consume, and data being what robots work with to make sense of the content. Being sentient beings, we humans have the ability to make sense of textual content, or any content really, and understand what it is about. But robots, although they have the ability to read much much more content, they have no ability to make sense of it. That reminds me of what Sir Berners-Lee invented: the Hypertext Markup Language. It marks up the content we humans could understand (document) so robots can actually make sense of it and do things with it (data).

There are various articles and videos and podcasts that discuss just how important semantic HTML is.

- It entails better search rankings.
- It leads to more maintainable code.
- It is easier to style.
- It is *more accessible*.
- It makes your code future-proof.

However, not a lot of people are buying that. There are still people who settle with using `<div>`s instead of `<article>`s or `<section>`s where appropriate.

I recently came across an article by Sir Tim Berners-Lee, [Answers for Young People](https://www.w3.org/People/Berners-Lee/Kids.html), where he answers frequently asked questions by students for their projects or homework. One of the questions was <q>What made you think of the WWW?</q> And he has this for an answer:

<figure class="quotation quotation--small quotation--unfloated">

> Because people at CERN came from universities all over the world, they brought with them all types of computers... I actually wrote some programs to take information from one system and convert it so it could be inserted into another system. More than once. And when you are a programmer, and you solve one problem and then you solve one that's very similar, you often think, "Isn't there a better way? Can't we just fix this problem for good?" That became "Can't we convert every information system so that it looks like part of some imaginary information system which everyone can read?" And that became the WWW.

</figure>

The web has been one of the greatest inventions of man in that it broke down boundaries. It is *World Wide* and does not fear differences in operating systems, devices and machines, or even the people who use it. It is *everywhere* and it *just works*. However, when you think about it, we are still in a fragmented cyberspace—people have disabilities and operate under different environments that make their browsing experiences different; we use different devices, some use desktops and laptops, others use tablets and mobile devices, and some others browse the web on smart TVs and other devices. And on those devices we have yet another spectrum of browsing modes—reading modes like the one that comes with Firefox, command-line browsers, screen readers, and other kinds of stuff.

Brilliant people have been, for the sake of maintaining the web as an open platform, devising tactics to break these boundaries and fragmentations down. We had responsive web design, and now intrinsic web design, to solve the problem with differences in devices. We also have the WebAIM and tons of blogs, videos, and podcasts to urge developers all around the world to make their sites accessible to everybody regardless of whether they are disabled or not.

I think one of the problems we have—that I myself have, and only realized now—is that we treat the web as HTML + CSS + JS when in reality, it is just HTML. We try to design sites in a way that makes it responsive and adapt to device widths. But CSS is not everywhere! Just until two years ago, I used a mobile phone that used a keypad like the ones people used in 2003. It had a WAP browser, and just out of curiosity, I brought it out and tested [my portfolio](https://bit.ly/francisrubio) on it. The CSS and JavaScript I had did not come through because the WAP browser it had didn't even fetch (I think) CSS and JS files. What it had were the text and images that I put in there using HTML. And this made me think about other cases in which people browse the web differently, like in aggregation sites, the ones that appear in search results, command-line browsers, and all these other places where we can't control how our content would look like and how it would behave, the places where the only control we have is on what content would actually be, and let the context decide about everything else.

I think this is what I mean with CSS being just a tool for progressive enhancement. CSS doesn't work for everyone. So does JavaScript. And we forget (at least I do) that there are people who live differently. And we are just putting CSS and JS in there *for people who can benefit from it*, not everyone. So I think my point is use semantic HTML so the content survives everywhere it may appear. This way, we responsible developers make sure that the web stays worldwide, and that it continues to surpass boundaries put in its way. After all, if we have the time to debate about things that users don't care about, or don't even know exist, then I think we have the few minutes it takes to decide which HTML tag is the most appropriate for a piece of content.