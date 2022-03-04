---
title: HatchUp Magazine
description: The official website for Calgary's local business, entrepreneurship, and lifestyle magazine
date: 2021-09-01
tags:
  - Web Development
links:
  - text: Official Website
    url: https://hatchupmagazine.com/
logo:
  src: "/assets/images/projects/hatchupmagazine.png"
  alt: HatchUp Magazine's logo
  width: 1080
  height: 1080
---

HatchUp Magazine is a magazine that represents local businesses and entrepreneurs from Calgary, Canada. I was tasked to create the magazine's official website, both for promotion and to give potential subscribers a way to buy copies or subscribe to the magazine, both digital and in print.

## Problem

The project was given to me around two weeks before the magazine's official launch. HatchUp Media needed me to design and develop the official website. I was given all the assets that were used in the magazine, as well as the existing brand elements like the color scheme.

They needed the site to perform three things:


- Promote the magazine
- Give a way for their target audience to subscribe to the magazine, both digital and in print
- Track website traffic

## Solution

The first week after the project was given to me, I started designing what the site could look like. I used **[Figma](https://figma.com/)** to design a prototype of the website. I ended up with five different designs, all of which borrowing elements that can already be seen from the magazine's existing graphic design choices.

However, I thought none of those designs hit the mark, so I did another design. This time, I did not consult the magazine's design, but created an entirely new design, only basing on the assets, brand colors and typography that were given to me. The magazine team's lead approved this iteration and it is what ended up on the official website.

I started development on the site using **[Jekyll](https://jekyllrb.com/)**, a static site generator. This was the most convenient technology for me, since I only had less than two weeks to develop the site and this is something that I really know about, as it's also the technology I used to build my personal website and [Antares Programming](https://antaresph.dev/), another project I am proud of.

HatchUp Media has an existing hosting provider, but I found it rather difficult to work with. Instead, I opted into using **[Netlify](https://netlify.com/)**, since the site is static. It has support for a lot of Jamstack technologies, including Jekyll that I already use.

Subscription service is done via **[Stripe](https://stripe.com/)** that the team had already been using for their previous projects. However, online transactions for Stripe need a backend server to ensure security. Since I opted for a static website that is also serverless, this was not possible. Another possible solutions were serverless functions that Netlify provides, but that was out of budget, and there are no free tiers as far as I am aware. I ended up going with Stripe's payment links that worked really well and are also guaranteed secure. With payment links, I as a developer don't have to handle the transactions myself, as customers are redirected to Stripe's own portal. Their transactions automatically appear on the team account's dashboard.

Analytics are provided for by **[Firebase Analytics](https://firebase.google.com/)**. It was very easy to integrate, and had other features that I found handy later on, like the Object Storage feature that I used for hosting video assets that the website needed.

## Results

The site was finished just a day after the magazine's launch. It was a day late, but it was functional as soon as it went live. It's now being used by [HatchUp Magazine](https://hatchupmagazine.com/) subscribers to pay for subscriptions or to buy individual copies.