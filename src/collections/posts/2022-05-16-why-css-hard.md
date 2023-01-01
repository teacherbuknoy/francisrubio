---
title: "Why CSS is hard"
description: It's not, really.
cover:
  folder: why-css-hard
  filename: cover.jpg
  sizes: [300, 500, 700]
  formats: ['jpg', 'avif', 'webp']
author: teacherbuknoy
category: [opinion]
language: en-US
---

A lot of developers argue that CSS is hard. And I tend to agree, but only if we also acknowledge that it is no more difficult than learning any other programming language. CSS is a language that's focused on a particular domain, and for a developer that's used to using a general-purpose programming language like JavaScript, it's quite constraining and a lot of times confusing. Let's deconstruct that and see what we can do to make it easier.

## What we're used to

For a developer that's used several programming languages to develop apps for desktop or mobile devices, we would be used to a certain nature of programming languages. Languages like JavaScript, Kotlin, and C# are procedural; they describe in detail how the computer should do what we want. We are used to talking in a series of steps that lead towards the goal we want our app to do.

CSS is a declarative language, which means that all of those things go out the window. Instead of telling the browser how to paint a container the color blue, we just tell the browser that we want it to have a background color of blue. And instead of telling the browser how to resize the font size along with the viewport width and calculate these sizes using our own formula, we just tell the browser that we want to do that. Declarative languages like CSS *declare* the goal; instead of telling the browser how to get to our goal, we just say our goals and the browser takes care of the rest. 

For a developer that's spent several years working in a procedural, object-oriented programming language, this would be very unsettling and hard to get used to. It challenges our expectations of what a programming language is or should be. This is why we have numerous moot discussions on whether or not CSS (and HTML, for that matter) is a programming language. I personally believe that it is, although that's not at all important when creating websites. It's so much easier to pass blame and point our fingers to CSS, saying it's not an actual programming language, instead of accepting that we are having difficulties.

The truth is, every programming language is hard to learn. If you're used to using JavaScript, you might think <q>JavaScript is a lot easier than CSS.</q> And that's fine. But if you had learned CSS first and JavaScript later, you would say that CSS is a lot easier than JavaScript. This is very similar to how we got the hang of our native tongue and spoke it so expertly, but then we try to learn speaking another language and it takes years of effort. It's because we are so used to the vocabulary, grammar, and construction of sentences in our language and it's hard to dismantle all of that to learn something entirely different.

## Complex problems require complex solutions

CSS solves a big domain of problems. Aside from the basic visual styling, it is also concerned with how a website adapts to different devices, viewport sizes, color spaces, and such. Along with that, it has to provide sensible fallbacks for when fonts don't load, or when a browser is so old it doesn't recognize a feature being used in a webpage. On top of that, things get more complicated when a page links to two or more stylesheets because then the browser would have to resolve conflicts. And CSS not only works in the browser; print publications as well as file formats like EPUB use CSS for layout and visual styling. Such complex problems would naturally have a complex solution, and CSS is just that.

And it's not a problem at all if we just admit that CSS is complicated. It's not an easy language, but so are other programming languages.

## A long history comes with modern CSS

The first version of CSS came out in 1996—almost 26 years ago at the time of writing. 1996 was a very different world. Google wasn't around yet, there were only around 100,000 websites in existence, the most popular browser was Netscape Navigator, Mozilla Firefox's ancestor, and Internet Explorer was just at version 3.[^1] Back then, we had a very different view of what we want the Web to be like. Instead of having interactive pages, forms, and even full-fledged cloud-based apps, we just wanted the Web to be a collection of interconnected documents, mainly to share information with one another, displayed in computer screens that were roughly the same size.

And because of that, the tools we had adapted to the goal we had in mind. CSS was far from what we have now. Instead of thinking of webpages as complex entities that adapt to different types of devices and wide arrays of screen sizes, CSS treated web pages like word documents. It can only change text and background colors, make it bold or italic, and other simple things like that. The most powerful feature CSS had back then, I think, is the `float` property, which is interestingly similar to the word processing feature text wrapping.

<figure class="image">
  <div class="cluster">
    <img style="width: 50%" src="/assets/images/posts/why-css-hard/text-wrapping.jpg" alt="Text wrapping feature on Microsoft Word">
    <img style="width: 50%" src="/assets/images/posts/why-css-hard/float.png" alt="Float property's effects on an element">
  </div>
  <figcaption>The CSS <code>float</code> property (second image) and the text wrapping feature on Microsoft Word (first image) are two very similar features. Float was added in the first version of CSS, during a time when webpages were nothing more than digital versions of word documents.</figcaption>
</figure>

By the time CSS 3 came along, we have a very different view of what webpages are and should be. iPhone has been released, along with many mobile devices. The Internet of Things had started to grow, and just a few years later, virtual and augmented reality came into existence. These new technologies gave CSS the need to add modern features. Responsive web design is now the norm, but CSS has no built-in tool to create designs that adapt to different screen sizes. So we turned to frameworks such as Bootstrap and Foundation to handle all of these things for us. Under the hood, it just used existing CSS features to fake a system of flexible columns that adjust to the available space. Because of this paradigm shift from webpages being just glorified word documents to being entire web applications, it took several years for CSS to come out with built-in features for responsive web design: Flexbox and CSS Grid.

To expect that CSS would be easy because it's *just* visuals would be an understatement at best and a grave mistake at worst. The complications of its history makes it more difficult especially when you consider that the Web is supposed to exist forever. Websites created in 1996 should still work in 2022, and browsers of the year 2050 should still be able to render webpages created today. This backwards-compatibility is one of the fundamental properties of the Web, and CSS, unlike JavaScript, is well-prepared for that, in exchange for a little complexity in the way it works.

## The way we learn

We approach learning programming languages by first tackling its syntax and playing around with it. You could get ahead very far with JavaScript without knowing how the underlying browser engine works. You can build entire web applications without ever hearing about the event loop, or using `async` and `await`. You can create decent programs without being familiar about prototypical inheritance and how JavaScript classes are just a syntactic sugar for that feature.

A big mistake is doing the same thing with CSS. Learning syntax for CSS is only one of the many important things we should learn to master it. To wield the entire power of CSS, we also need to be familiar with the box model. The cascade, specificity, and inheritance are the trinity of things that bites us in the ass and leads us to those cases when we think our code doesn't work but actually it's just a problem with these three. Properly managing the cascade, specificity, and inheritance is the key to making CSS do what you actually want to do.

A lot of tutorials just gloss over these as theoretical topics, which add to the problem. These are more than just theory; they're the foundation of what CSS is and how it works. And most of your problems with CSS will be with these aspects, from margin collapsing to understanding why you probably should not use `!important` if your code doesn't seem to work. An ideal course will discuss these in depth with examples sprinkled all throughout the course and even when discussing other topics just so you would still be reminded of them. Very few tutorials I have ever come across discuss these topics in detail.

## We don't know how to wield its power

The Web should exist for all of time, in every device everywhere. The promise of the web is that it will always be backwards-compatible and cross-platform. And this is what developers often forget. JavaScript throws errors when something exceptional happens. This causes the entire program to stop, with no way to recover from it unless it's handled or the page is refreshed. CSS, and HTML, both ignore errors and just go on with their day. And this is a good way of handling errors for users.

This resilience of CSS allows for new features without breaking older websites and browsers. It allows us to provide fallbacks and different experiences depending on how well supported the features we are using are. For example, `border-radius` came with CSS 3, and Internet Explorer started supporting it by the time version 9 came out. But back then, people were still using versions 6 to 8. If CSS was anything like JavaScript in terms of error handling, websites would crash just because they wanted buttons to have rounded corners. But none of that happened because on older browsers, webpages just didn't have rounded corners and users could still use the website and go on with their day. The same thing happened when CSS Grid came out. Developers can start using CSS Grid and create modern web layouts with it. On older browsers, their pages just reverted to having a single-column layout, or maybe using floats to replicate the columns. The result is having multiple different layouts and different experiences with just a single codebase. This power of CSS doesn't exist in other programming languages that have to lock themselves with a range of versions they should work in. CSS is resilient and powerful.

## Mastering CSS

Mastering CSS is not at all impossible. And it is all worth it. Many developers just resort to using CSS libraries that do the dirty work for them, but it is much more beneficial to actually learn how to use CSS. I try to hand code all of my CSS in every website that I develop. It gets hard at times, but it's no harder than when I encounter bugs in any other languages.

So how do we learn CSS effectively? I recommend a few things:

1. **Learn CSS with an open mind.** Approach CSS like it is your first programming language ever. Throw everything you know about programming languages out the window.
1. **Learn the fundamentals before jumping into more advanced concepts.** This sounds like a no-brainer, but like we talked about earlier, most tutorials get this wrong. Before diving into layout, transitions, animations, and the like, learn the fundamentals: <b>box model</b>, <b>cascade</b>, <b>specificity</b>, and <b>inheritance</b>.
1. **Try to stop using frameworks and libraries.** Frameworks and libraries are very useful for fast prototyping and development of user interfaces. However, if you depend on them for everything, you'll never learn CSS and utilize it to its full potential. Instead of using Bootstrap to create responsive layouts with its breakpoints, try to use CSS Grid, or even Flexbox, to create layouts that adapt to the viewport size *even without media queries*.
1. **Don't engage in unhealthy discussions around CSS.** Forums and social media discussions around CSS can get toxic a lot of times. Many tech influencers say that CSS is hard to learn (it's not), or that it is not a programming language (it is). These people would want to gatekeep you out of CSS and keep you in whatever language they want you to learn for whatever reason they have. In my experience, engaging in these conversations will just lower your confidence, and fuel hate for CSS. CSS is one of the most powerful programming languages that solve a specific domain of problems, that is enough reason to love it.
1. **Use authoritative sources for learning.** In an ideal world, we will all learn CSS using the [W3C Specification for CSS](https://www.w3.org/TR/css-2021/). However, this document was written, not for us developers, but for browser engineers that add new features to the Web. This is the single source of truth for all features and behaviors of CSS. The closest thing to the W3C Specifications is the [MDN Web Docs](https://developer.mozilla.org/), curated by Mozilla. The web development course they have there is not the best in my opinion, but it's really helpful as a start. Following members of the CSS Working Group, the group within W3C that comes up with new features in CSS, is also a good idea. [Jen Simmons](https://twitter.com/jensimmons), [Rachel Andrew](https://twitter.com/rachelandrew), and [Miriam Suzanne](https://twitter.com/TerribleMia) are one of the best people out there to follow.
1. **Immerse yourself in CSS content.** I subscribed myself to YouTube channels that I found very helpful. Jen Simmons has [Layout Land](https://www.youtube.com/c/LayoutLand) which is a channel I always recommend because it discusses how you can use CSS to create ambitious layouts without needing JavaScript or other CSS libraries and frameworks. [Kevin Powell](https://www.youtube.com/kepowob) is another one I subscribe to because he is dedicated to making CSS fun for developers that come from other programming languages. He dives in deep with CSS features. Lastly, [this talk by Rachel Andrew](https://www.youtube.com/watch?v=tqYWDGzhZKM) is a must view for someone who wants to learn how to learn CSS.

All of these tips are in actuality also applicable in learning other languages. CSS is just another programming language you'll learn. And you don't even have to have an eye for good design to use CSS effectively. And just like any other programming languages, the more you use CSS, the more you get the hang of it. So go ahead and build with CSS. You won't regret it.

*[W3C]: Worldwide Web Consortium

[^1]: “The Web Back in 1996-1997 - Pingdom.” Pingdom.com, https://www.pingdom.com/blog/the-web-in-1996-1997/. 