---
title: "My Problems With Backdrop Blur"
description: "I encountered this a while back when I was doing my website redesign, and I wanted to document it."
category: [CSS]
theme:
  scheme: dark
  color: '#6d4342'
  color-hsl: '1 25% 34%'
  style:
    image:
      '--img-object-fit': cover
      '--img-object-position': right top
      '--post-image': linear-gradient(var(--theme-color), var(--theme-color))
cover:
  folder: birthday-post-2024
  filename: cover.png
  header: header.png
  sizes: [500, 600, 700, 1000, 1280]
  formats: ['png', 'webp', 'avif']
author: "teacherbuknoy"
language: "en"
seo:
  twitter:
    url: "https://ik.imagekit.io/8jjzxcl9p/tr:w-800/posts/birthday-post-2024/twitter.png"
    is_prefixed: false
  og:
    url: "https://ik.imagekit.io/8jjzxcl9p/tr:w-1200/posts/birthday-post-2024/og.png"
    is_prefixed: false
eleventyExcludeFromCollections: true
---

When I was doing my website redesign last year, I was really into making the navigation bar have the frosted glass effect it has now. Unfortunately, I'd ran into a problem. As I added more things on the navigation bar, I had to tuck some of them away into a dropdown menu. All is well until I found out that the dropdown menu will not have the same frosted glass effect as its parent navigation bar in Chromium browsers. Here's a pen that recreates this problem:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LYaLjmb" data-editable="true" data-user="antaresphdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/antaresphdev/pen/LYaLjmb">
  Backdrop Blur Bug (?)</a> by Antares Programming (<a href="https://codepen.io/antaresphdev">@antaresphdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

The navigation bar is structured in this way. Inside the `<nav>` element is a `<ul>` element as is usually the case for navigation bars. The dropdown menu is a `<dialog>` element nested inside one of the `<li>` elements and is absolutely positioned to appear like it's popped out of the parent `<nav>`.

<svg width="906" height="354" viewBox="0 0 906 354" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="906" height="354" fill="white"/>
<rect x="31" y="31" width="844" height="292" stroke="black" stroke-width="2"/>
<rect width="191" height="61" transform="translate(64 64)" fill="#EDEDED"/>
<path d="M82.2065 103V86.2H85.4945V103H82.2065ZM84.8465 96.232V93.232H91.7345V96.232H84.8465ZM84.8465 89.2V86.2H92.9825V89.2H84.8465ZM100.32 97.048V94.048H103.68C104.176 94.048 104.616 93.944 105 93.736C105.4 93.528 105.712 93.24 105.936 92.872C106.176 92.504 106.296 92.088 106.296 91.624C106.296 90.904 106.032 90.32 105.504 89.872C104.992 89.424 104.328 89.2 103.512 89.2H100.32V86.2L103.656 86.176C104.84 86.16 105.888 86.392 106.8 86.872C107.712 87.336 108.424 87.976 108.936 88.792C109.448 89.608 109.704 90.552 109.704 91.624C109.704 92.68 109.432 93.624 108.888 94.456C108.36 95.272 107.632 95.912 106.704 96.376C105.776 96.824 104.72 97.048 103.536 97.048H100.32ZM97.4156 103V86.2H100.704V103H97.4156ZM106.656 103L102.768 96.256L105.288 94.456L110.376 103H106.656ZM122.484 103.288C120.788 103.288 119.284 102.92 117.972 102.184C116.676 101.432 115.66 100.408 114.924 99.112C114.188 97.8 113.82 96.304 113.82 94.624C113.82 92.912 114.188 91.408 114.924 90.112C115.66 88.8 116.668 87.776 117.948 87.04C119.244 86.304 120.732 85.936 122.412 85.936C124.108 85.936 125.596 86.312 126.876 87.064C128.172 87.8 129.188 88.824 129.924 90.136C130.66 91.432 131.028 92.928 131.028 94.624C131.028 96.304 130.66 97.8 129.924 99.112C129.204 100.408 128.196 101.432 126.9 102.184C125.62 102.92 124.148 103.288 122.484 103.288ZM122.484 100.288C123.508 100.288 124.404 100.048 125.172 99.568C125.956 99.072 126.564 98.4 126.996 97.552C127.444 96.704 127.668 95.728 127.668 94.624C127.668 93.504 127.444 92.52 126.996 91.672C126.548 90.824 125.932 90.16 125.148 89.68C124.364 89.184 123.452 88.936 122.412 88.936C121.404 88.936 120.5 89.184 119.7 89.68C118.916 90.16 118.3 90.824 117.852 91.672C117.404 92.52 117.18 93.504 117.18 94.624C117.18 95.728 117.404 96.704 117.852 97.552C118.3 98.4 118.924 99.072 119.724 99.568C120.524 100.048 121.444 100.288 122.484 100.288ZM147.255 103L136.383 88L139.047 86.2L149.871 101.128L147.255 103ZM135.615 103V86.2H139.047L138.903 89.104V103.024L135.615 103ZM147.255 103V86.2H150.519V103H147.255ZM159.649 103V87.592H162.937V103H159.649ZM154.609 89.2V86.2H167.953V89.2H154.609ZM174.937 97.432V94.408H178.465C179.201 94.408 179.801 94.168 180.265 93.688C180.745 93.208 180.985 92.576 180.985 91.792C180.985 91.28 180.865 90.832 180.625 90.448C180.385 90.048 180.057 89.736 179.641 89.512C179.225 89.288 178.745 89.184 178.201 89.2H174.937V86.2L178.273 86.176C179.457 86.16 180.505 86.4 181.417 86.896C182.329 87.376 183.041 88.04 183.553 88.888C184.065 89.72 184.321 90.688 184.321 91.792C184.321 92.88 184.073 93.848 183.577 94.696C183.081 95.544 182.401 96.216 181.537 96.712C180.673 97.192 179.673 97.432 178.537 97.432H174.937ZM172.033 103V86.2H175.321V103H172.033ZM200.054 103L193.622 86.2H196.91L203.534 103H200.054ZM186.782 103L193.406 86.2H196.694L190.262 103H186.782ZM189.902 99.304V96.4H200.438V99.304H189.902ZM214.353 103.288C212.641 103.288 211.121 102.92 209.793 102.184C208.481 101.432 207.449 100.408 206.697 99.112C205.945 97.8 205.569 96.296 205.569 94.6C205.569 92.904 205.945 91.408 206.697 90.112C207.449 88.8 208.481 87.776 209.793 87.04C211.121 86.288 212.641 85.912 214.353 85.912C215.377 85.912 216.321 86.064 217.185 86.368C218.049 86.672 218.809 87.096 219.465 87.64C220.137 88.168 220.697 88.776 221.145 89.464L218.457 91.144C218.185 90.712 217.825 90.328 217.377 89.992C216.945 89.656 216.465 89.392 215.937 89.2C215.409 89.008 214.881 88.912 214.353 88.912C213.297 88.912 212.361 89.16 211.545 89.656C210.729 90.136 210.089 90.8 209.625 91.648C209.161 92.496 208.929 93.48 208.929 94.6C208.929 95.704 209.153 96.688 209.601 97.552C210.065 98.416 210.713 99.096 211.545 99.592C212.377 100.072 213.337 100.312 214.425 100.312C215.273 100.312 216.025 100.144 216.681 99.808C217.353 99.472 217.881 99 218.265 98.392C218.649 97.784 218.841 97.08 218.841 96.28L221.961 95.8C221.961 97.384 221.633 98.736 220.977 99.856C220.337 100.976 219.441 101.832 218.289 102.424C217.153 103 215.841 103.288 214.353 103.288ZM214.905 96.568V94H221.961V96.04L220.185 96.568H214.905ZM226.309 103V86.2H229.597V103H226.309ZM228.805 103V100H237.037V103H228.805ZM228.805 95.944V93.016H235.933V95.944H228.805ZM228.805 89.2V86.2H236.941V89.2H228.805Z" fill="black"/>
<rect width="555" height="226" transform="translate(287 64)" fill="#EDEDED"/>
<path d="M310.669 111V107.928C311.437 107.928 312.149 107.792 312.805 107.52C313.461 107.248 314.029 106.872 314.509 106.392C315.005 105.912 315.389 105.352 315.661 104.712C315.933 104.056 316.069 103.352 316.069 102.6C316.069 101.848 315.933 101.152 315.661 100.512C315.389 99.856 315.005 99.288 314.509 98.808C314.029 98.328 313.461 97.952 312.805 97.68C312.149 97.408 311.437 97.272 310.669 97.272V94.2C312.381 94.2 313.893 94.56 315.205 95.28C316.533 96 317.565 96.992 318.301 98.256C319.053 99.504 319.429 100.952 319.429 102.6C319.429 104.232 319.053 105.68 318.301 106.944C317.549 108.208 316.517 109.2 315.205 109.92C313.893 110.64 312.381 111 310.669 111ZM307.189 111V107.928H310.669V111H307.189ZM305.293 111V94.2H308.581V111H305.293ZM307.189 97.272V94.2H310.669V97.272H307.189ZM326.922 105.048V102.048H330.282C330.778 102.048 331.218 101.944 331.602 101.736C332.002 101.528 332.314 101.24 332.538 100.872C332.778 100.504 332.898 100.088 332.898 99.624C332.898 98.904 332.634 98.32 332.106 97.872C331.594 97.424 330.93 97.2 330.114 97.2H326.922V94.2L330.258 94.176C331.442 94.16 332.49 94.392 333.402 94.872C334.314 95.336 335.026 95.976 335.538 96.792C336.05 97.608 336.306 98.552 336.306 99.624C336.306 100.68 336.034 101.624 335.49 102.456C334.962 103.272 334.234 103.912 333.306 104.376C332.378 104.824 331.322 105.048 330.138 105.048H326.922ZM324.018 111V94.2H327.306V111H324.018ZM333.258 111L329.37 104.256L331.89 102.456L336.978 111H333.258ZM349.087 111.288C347.391 111.288 345.887 110.92 344.575 110.184C343.279 109.432 342.263 108.408 341.527 107.112C340.791 105.8 340.423 104.304 340.423 102.624C340.423 100.912 340.791 99.408 341.527 98.112C342.263 96.8 343.271 95.776 344.551 95.04C345.847 94.304 347.335 93.936 349.015 93.936C350.711 93.936 352.199 94.312 353.479 95.064C354.775 95.8 355.791 96.824 356.527 98.136C357.263 99.432 357.631 100.928 357.631 102.624C357.631 104.304 357.263 105.8 356.527 107.112C355.807 108.408 354.799 109.432 353.503 110.184C352.223 110.92 350.751 111.288 349.087 111.288ZM349.087 108.288C350.111 108.288 351.007 108.048 351.775 107.568C352.559 107.072 353.167 106.4 353.599 105.552C354.047 104.704 354.271 103.728 354.271 102.624C354.271 101.504 354.047 100.52 353.599 99.672C353.151 98.824 352.535 98.16 351.751 97.68C350.967 97.184 350.055 96.936 349.015 96.936C348.007 96.936 347.103 97.184 346.303 97.68C345.519 98.16 344.903 98.824 344.455 99.672C344.007 100.52 343.783 101.504 343.783 102.624C343.783 103.728 344.007 104.704 344.455 105.552C344.903 106.4 345.527 107.072 346.327 107.568C347.127 108.048 348.047 108.288 349.087 108.288ZM365.121 105.432V102.408H368.649C369.385 102.408 369.985 102.168 370.449 101.688C370.929 101.208 371.169 100.576 371.169 99.792C371.169 99.28 371.049 98.832 370.809 98.448C370.569 98.048 370.241 97.736 369.825 97.512C369.409 97.288 368.929 97.184 368.385 97.2H365.121V94.2L368.457 94.176C369.641 94.16 370.689 94.4 371.601 94.896C372.513 95.376 373.225 96.04 373.737 96.888C374.249 97.72 374.505 98.688 374.505 99.792C374.505 100.88 374.257 101.848 373.761 102.696C373.265 103.544 372.585 104.216 371.721 104.712C370.857 105.192 369.857 105.432 368.721 105.432H365.121ZM362.217 111V94.2H365.505V111H362.217ZM383.974 111V107.928C384.742 107.928 385.454 107.792 386.11 107.52C386.766 107.248 387.334 106.872 387.814 106.392C388.31 105.912 388.694 105.352 388.966 104.712C389.238 104.056 389.374 103.352 389.374 102.6C389.374 101.848 389.238 101.152 388.966 100.512C388.694 99.856 388.31 99.288 387.814 98.808C387.334 98.328 386.766 97.952 386.11 97.68C385.454 97.408 384.742 97.272 383.974 97.272V94.2C385.686 94.2 387.198 94.56 388.51 95.28C389.838 96 390.87 96.992 391.606 98.256C392.358 99.504 392.734 100.952 392.734 102.6C392.734 104.232 392.358 105.68 391.606 106.944C390.854 108.208 389.822 109.2 388.51 109.92C387.198 110.64 385.686 111 383.974 111ZM380.494 111V107.928H383.974V111H380.494ZM378.598 111V94.2H381.886V111H378.598ZM380.494 97.272V94.2H383.974V97.272H380.494ZM405.003 111.288C403.307 111.288 401.803 110.92 400.491 110.184C399.195 109.432 398.179 108.408 397.443 107.112C396.707 105.8 396.339 104.304 396.339 102.624C396.339 100.912 396.707 99.408 397.443 98.112C398.179 96.8 399.187 95.776 400.467 95.04C401.763 94.304 403.251 93.936 404.931 93.936C406.627 93.936 408.115 94.312 409.395 95.064C410.691 95.8 411.707 96.824 412.443 98.136C413.179 99.432 413.547 100.928 413.547 102.624C413.547 104.304 413.179 105.8 412.443 107.112C411.723 108.408 410.715 109.432 409.419 110.184C408.139 110.92 406.667 111.288 405.003 111.288ZM405.003 108.288C406.027 108.288 406.923 108.048 407.691 107.568C408.475 107.072 409.083 106.4 409.515 105.552C409.963 104.704 410.187 103.728 410.187 102.624C410.187 101.504 409.963 100.52 409.515 99.672C409.067 98.824 408.451 98.16 407.667 97.68C406.883 97.184 405.971 96.936 404.931 96.936C403.923 96.936 403.019 97.184 402.219 97.68C401.435 98.16 400.819 98.824 400.371 99.672C399.923 100.52 399.699 101.504 399.699 102.624C399.699 103.728 399.923 104.704 400.371 105.552C400.819 106.4 401.443 107.072 402.243 107.568C403.043 108.048 403.963 108.288 405.003 108.288ZM431.129 111L435.953 94.2H439.289L434.273 111H431.129ZM421.001 111L416.033 94.2H419.369L424.145 111H421.001ZM421.433 111L426.017 94.2H428.993L424.433 111H421.433ZM430.817 111L426.305 94.2H429.281L433.961 111H430.817ZM454.873 111L444.001 96L446.665 94.2L457.489 109.128L454.873 111ZM443.233 111V94.2H446.665L446.521 97.104V111.024L443.233 111ZM454.873 111V94.2H458.137V111H454.873ZM469.531 112.68H493.531V88.68H469.531V112.68Z" fill="black"/>
<rect x="304" y="150" width="521" height="123" stroke="black" stroke-width="2"/>
<rect width="129" height="61" transform="translate(335 181)" fill="#DBDBDB"/>
<path d="M352.884 220V203.2H356.172V220H352.884ZM354.996 220V217H363.564V220H354.996ZM367.695 220V203.2H370.983V220H367.695ZM388.192 220L377.32 205L379.984 203.2L390.808 218.128L388.192 220ZM376.552 220V203.2H379.984L379.84 206.104V220.024L376.552 220ZM388.192 220V203.2H391.456V220H388.192ZM399.003 215.752L398.619 211.624L406.491 203.2H410.739L399.003 215.752ZM397.035 220V203.2H400.275V220H397.035ZM406.947 220L400.251 211.456L402.627 209.488L411.003 220H406.947ZM428.458 220L431.098 203.2H433.426L430.786 220H428.458ZM420.994 215.656L421.306 213.424H434.794L434.482 215.656H420.994ZM423.298 220L425.938 203.2H428.266L425.626 220H423.298ZM421.786 210.232L422.17 208H435.658L435.274 210.232H421.786ZM442.495 220V204.952L442.807 203.2H445.639L445.615 220H442.495ZM438.943 208.504V205.528C439.343 205.56 439.775 205.464 440.239 205.24C440.703 205 441.159 204.696 441.607 204.328C442.071 203.944 442.471 203.56 442.807 203.176L444.895 205.216C444.319 205.856 443.711 206.44 443.071 206.968C442.431 207.48 441.767 207.88 441.079 208.168C440.407 208.456 439.695 208.568 438.943 208.504Z" fill="black"/>
<rect width="133" height="61" transform="translate(496 181)" fill="#DBDBDB"/>
<path d="M513.998 220V203.2H517.286V220H513.998ZM516.11 220V217H524.678V220H516.11ZM528.808 220V203.2H532.096V220H528.808ZM549.306 220L538.434 205L541.098 203.2L551.922 218.128L549.306 220ZM537.666 220V203.2H541.098L540.954 206.104V220.024L537.666 220ZM549.306 220V203.2H552.57V220H549.306ZM560.116 215.752L559.732 211.624L567.604 203.2H571.852L560.116 215.752ZM558.148 220V203.2H561.388V220H558.148ZM568.06 220L561.364 211.456L563.74 209.488L572.116 220H568.06ZM589.571 220L592.211 203.2H594.539L591.899 220H589.571ZM582.107 215.656L582.419 213.424H595.907L595.595 215.656H582.107ZM584.411 220L587.051 203.2H589.379L586.739 220H584.411ZM582.899 210.232L583.283 208H596.771L596.387 210.232H582.899ZM603.368 219.304L600.152 217.576C600.152 217.112 600.296 216.6 600.584 216.04C600.872 215.48 601.272 214.92 601.784 214.36C602.296 213.8 602.896 213.28 603.584 212.8L606.128 210.976C606.48 210.736 606.808 210.464 607.112 210.16C607.432 209.856 607.688 209.528 607.88 209.176C608.088 208.808 608.192 208.456 608.192 208.12C608.192 207.704 608.088 207.328 607.88 206.992C607.688 206.656 607.4 206.392 607.016 206.2C606.632 206.008 606.16 205.912 605.6 205.912C605.12 205.912 604.688 206.008 604.304 206.2C603.936 206.392 603.632 206.648 603.392 206.968C603.152 207.288 602.984 207.632 602.888 208L599.504 207.424C599.664 206.624 600.008 205.88 600.536 205.192C601.064 204.504 601.752 203.952 602.6 203.536C603.464 203.104 604.44 202.888 605.528 202.888C606.776 202.888 607.848 203.112 608.744 203.56C609.64 204.008 610.328 204.624 610.808 205.408C611.304 206.176 611.552 207.072 611.552 208.096C611.552 209.136 611.264 210.064 610.688 210.88C610.128 211.68 609.352 212.432 608.36 213.136L606.08 214.792C605.616 215.096 605.176 215.464 604.76 215.896C604.344 216.312 604.008 216.8 603.752 217.36C603.496 217.904 603.368 218.552 603.368 219.304ZM600.152 220V217.576L602.6 217.12H611.768V220H600.152Z" fill="black"/>
<rect width="133" height="61" transform="translate(661 181)" fill="#DBDBDB"/>
<path d="M679.279 220V203.2H682.567V220H679.279ZM681.391 220V217H689.959V220H681.391ZM694.089 220V203.2H697.377V220H694.089ZM714.587 220L703.715 205L706.379 203.2L717.203 218.128L714.587 220ZM702.947 220V203.2H706.379L706.235 206.104V220.024L702.947 220ZM714.587 220V203.2H717.851V220H714.587ZM725.397 215.752L725.013 211.624L732.885 203.2H737.133L725.397 215.752ZM723.429 220V203.2H726.669V220H723.429ZM733.341 220L726.645 211.456L729.021 209.488L737.397 220H733.341ZM754.853 220L757.493 203.2H759.821L757.181 220H754.853ZM747.389 215.656L747.701 213.424H761.189L760.877 215.656H747.389ZM749.693 220L752.333 203.2H754.661L752.021 220H749.693ZM748.181 210.232L748.565 208H762.053L761.669 210.232H748.181ZM770.953 220.288C769.961 220.288 769.065 220.144 768.265 219.856C767.465 219.552 766.793 219.128 766.249 218.584C765.721 218.024 765.353 217.368 765.145 216.616L768.169 215.728C768.281 215.92 768.433 216.16 768.625 216.448C768.817 216.72 769.081 216.952 769.417 217.144C769.753 217.336 770.193 217.432 770.737 217.432C771.537 217.432 772.169 217.216 772.633 216.784C773.113 216.336 773.353 215.76 773.353 215.056C773.353 214.576 773.233 214.152 772.993 213.784C772.753 213.416 772.361 213.136 771.817 212.944C771.289 212.736 770.593 212.632 769.729 212.632H768.721V210.4H769.609C770.569 210.4 771.473 210.52 772.321 210.76C773.169 210.984 773.913 211.32 774.553 211.768C775.209 212.2 775.721 212.728 776.089 213.352C776.457 213.96 776.641 214.656 776.641 215.44C776.641 216.448 776.377 217.32 775.849 218.056C775.321 218.776 774.625 219.328 773.761 219.712C772.897 220.096 771.961 220.288 770.953 220.288ZM768.721 212.032V209.944H769.729C770.849 209.944 771.681 209.752 772.225 209.368C772.769 208.984 773.041 208.456 773.041 207.784C773.041 207.4 772.945 207.056 772.753 206.752C772.561 206.448 772.289 206.208 771.937 206.032C771.585 205.856 771.177 205.768 770.713 205.768C770.409 205.768 770.097 205.824 769.777 205.936C769.457 206.032 769.161 206.2 768.889 206.44C768.633 206.664 768.425 206.992 768.265 207.424L765.289 206.536C765.513 205.752 765.897 205.096 766.441 204.568C767.001 204.024 767.665 203.616 768.433 203.344C769.201 203.056 769.993 202.912 770.809 202.912C771.849 202.912 772.785 203.112 773.617 203.512C774.449 203.896 775.105 204.432 775.585 205.12C776.065 205.808 776.305 206.6 776.305 207.496C776.305 208.264 776.121 208.928 775.753 209.488C775.385 210.048 774.881 210.52 774.241 210.904C773.617 211.288 772.905 211.576 772.105 211.768C771.305 211.944 770.473 212.032 769.609 212.032H768.721Z" fill="black"/>
<rect width="146" height="29" transform="translate(335 135)" fill="#EDEDED"/>
<path d="M354.127 145.568V148.424L345.175 152.12V149.528L354.127 145.568ZM345.175 149.6L354.127 153.224V156.104L345.175 152.192V149.6ZM365.318 158V154.928C366.086 154.928 366.798 154.792 367.454 154.52C368.11 154.248 368.678 153.872 369.158 153.392C369.654 152.912 370.038 152.352 370.31 151.712C370.582 151.056 370.718 150.352 370.718 149.6C370.718 148.848 370.582 148.152 370.31 147.512C370.038 146.856 369.654 146.288 369.158 145.808C368.678 145.328 368.11 144.952 367.454 144.68C366.798 144.408 366.086 144.272 365.318 144.272V141.2C367.03 141.2 368.542 141.56 369.854 142.28C371.182 143 372.214 143.992 372.95 145.256C373.702 146.504 374.078 147.952 374.078 149.6C374.078 151.232 373.702 152.68 372.95 153.944C372.198 155.208 371.166 156.2 369.854 156.92C368.542 157.64 367.03 158 365.318 158ZM361.838 158V154.928H365.318V158H361.838ZM359.942 158V141.2H363.23V158H359.942ZM361.838 144.272V141.2H365.318V144.272H361.838ZM378.667 158V141.2H381.955V158H378.667ZM399.164 158L392.732 141.2H396.02L402.644 158H399.164ZM385.892 158L392.516 141.2H395.804L389.372 158H385.892ZM389.012 154.304V151.4H399.548V154.304H389.012ZM406.577 158V141.2H409.865V158H406.577ZM408.689 158V155H417.257V158H408.689ZM428.739 158.288C427.043 158.288 425.539 157.92 424.227 157.184C422.931 156.432 421.915 155.408 421.179 154.112C420.443 152.8 420.075 151.304 420.075 149.624C420.075 147.912 420.443 146.408 421.179 145.112C421.915 143.8 422.923 142.776 424.203 142.04C425.499 141.304 426.987 140.936 428.667 140.936C430.363 140.936 431.851 141.312 433.131 142.064C434.427 142.8 435.443 143.824 436.179 145.136C436.915 146.432 437.283 147.928 437.283 149.624C437.283 151.304 436.915 152.8 436.179 154.112C435.459 155.408 434.451 156.432 433.155 157.184C431.875 157.92 430.403 158.288 428.739 158.288ZM428.739 155.288C429.763 155.288 430.659 155.048 431.427 154.568C432.211 154.072 432.819 153.4 433.251 152.552C433.699 151.704 433.923 150.728 433.923 149.624C433.923 148.504 433.699 147.52 433.251 146.672C432.803 145.824 432.187 145.16 431.403 144.68C430.619 144.184 429.707 143.936 428.667 143.936C427.659 143.936 426.755 144.184 425.955 144.68C425.171 145.16 424.555 145.824 424.107 146.672C423.659 147.52 423.435 148.504 423.435 149.624C423.435 150.728 423.659 151.704 424.107 152.552C424.555 153.4 425.179 154.072 425.979 154.568C426.779 155.048 427.699 155.288 428.739 155.288ZM449.67 158.288C447.958 158.288 446.438 157.92 445.11 157.184C443.798 156.432 442.766 155.408 442.014 154.112C441.262 152.8 440.886 151.296 440.886 149.6C440.886 147.904 441.262 146.408 442.014 145.112C442.766 143.8 443.798 142.776 445.11 142.04C446.438 141.288 447.958 140.912 449.67 140.912C450.694 140.912 451.638 141.064 452.502 141.368C453.366 141.672 454.126 142.096 454.782 142.64C455.454 143.168 456.014 143.776 456.462 144.464L453.774 146.144C453.502 145.712 453.142 145.328 452.694 144.992C452.262 144.656 451.782 144.392 451.254 144.2C450.726 144.008 450.198 143.912 449.67 143.912C448.614 143.912 447.678 144.16 446.862 144.656C446.046 145.136 445.406 145.8 444.942 146.648C444.478 147.496 444.246 148.48 444.246 149.6C444.246 150.704 444.47 151.688 444.918 152.552C445.382 153.416 446.03 154.096 446.862 154.592C447.694 155.072 448.654 155.312 449.742 155.312C450.59 155.312 451.342 155.144 451.998 154.808C452.67 154.472 453.198 154 453.582 153.392C453.966 152.784 454.158 152.08 454.158 151.28L457.278 150.8C457.278 152.384 456.95 153.736 456.294 154.856C455.654 155.976 454.758 156.832 453.606 157.424C452.47 158 451.158 158.288 449.67 158.288ZM450.222 151.568V149H457.278V151.04L455.502 151.568H450.222ZM461.866 156.104V153.248L470.818 149.576V152.144L461.866 156.104ZM470.818 152.072L461.866 148.448V145.592L470.818 149.504V152.072Z" fill="black"/>
<rect width="67" height="29" transform="translate(319 50)" fill="white"/>
<path d="M337.635 60.568V63.424L328.683 67.12V64.528L337.635 60.568ZM328.683 64.6L337.635 68.224V71.104L328.683 67.192V64.6ZM343.45 73V56.2H346.738V73H343.45ZM345.562 73V70H354.13V73H345.562ZM358.261 73V56.2H361.549V73H358.261ZM367.358 71.104V68.248L376.31 64.576V67.144L367.358 71.104ZM376.31 67.072L367.358 63.448V60.592L376.31 64.504V67.072Z" fill="black"/>
<rect width="77" height="29" transform="translate(64 18)" fill="white"/>
<path d="M82.6543 28.568V31.424L73.7023 35.12V32.528L82.6543 28.568ZM73.7023 32.6L82.6543 36.224V39.104L73.7023 35.192V32.6ZM95.0455 41.336C93.6535 41.336 92.4455 41.064 91.4215 40.52C90.3975 39.976 89.6055 39.216 89.0455 38.24C88.5015 37.248 88.2295 36.08 88.2295 34.736H91.5175C91.5175 35.456 91.6615 36.088 91.9495 36.632C92.2535 37.16 92.6695 37.568 93.1975 37.856C93.7415 38.144 94.3735 38.288 95.0935 38.288C95.8135 38.288 96.4375 38.144 96.9655 37.856C97.5095 37.568 97.9255 37.16 98.2135 36.632C98.5175 36.088 98.6695 35.456 98.6695 34.736H101.957C101.957 36.08 101.669 37.248 101.093 38.24C100.533 39.216 99.7335 39.976 98.6935 40.52C97.6695 41.064 96.4535 41.336 95.0455 41.336ZM88.2295 34.736V24.2H91.5175V34.736H88.2295ZM98.6695 34.736V24.2H101.957V34.736H98.6695ZM107.288 41V24.2H110.576V41H107.288ZM109.4 41V38H117.968V41H109.4ZM122.339 39.104V36.248L131.291 32.576V35.144L122.339 39.104ZM131.291 35.072L122.339 31.448V28.592L131.291 32.504V35.072Z" fill="black"/>
</svg>

This is how it looks like in Firefox:

<figure class="image">
  <picture>
    <source
      srcset="
        https://ik.imagekit.io/8jjzxcl9p/tr:f-avif/posts/backdrop-blur/Firefox.png 1x,
        https://ik.imagekit.io/8jjzxcl9p/tr:f-avif,w-360/posts/backdrop-blur/Firefox.png 2x"
      type="image/avif"
    >
    <source
      srcset="
        https://ik.imagekit.io/8jjzxcl9p/tr:f-webp/posts/backdrop-blur/Firefox.png 1x,
        https://ik.imagekit.io/8jjzxcl9p/tr:f-webp,w-360/posts/backdrop-blur/Firefox.png 2x"
      type="image/webp"
    >
    <img 
      src="https://ik.imagekit.io/8jjzxcl9p/tr:f-png/posts/backdrop-blur/Firefox.png" 
      loading="lazy"
      alt="Nested backdrop blur in Firefox. The child dialog is rendered as expected with the blurred backdrop." width="1233" height="942">
  </picture>
  <figcaption>How the nested backdrop blur is rendered in Firefox v121.0.1</figcaption>
</figure>

And this is how it looks like in Chrome:

<figure class="image">
  <picture>
    <source
      srcset="
        https://ik.imagekit.io/8jjzxcl9p/tr:f-avif/posts/backdrop-blur/Chrome.png 1x,
        https://ik.imagekit.io/8jjzxcl9p/tr:f-avif,w-360/posts/backdrop-blur/Chrome.png 2x"
      type="image/avif"
    >
    <source
      srcset="
        https://ik.imagekit.io/8jjzxcl9p/tr:f-webp/posts/backdrop-blur/Chrome.png 1x,
        https://ik.imagekit.io/8jjzxcl9p/tr:f-webp,w-360/posts/backdrop-blur/Chrome.png 2x"
      type="image/webp"
    >
    <img 
      src="https://ik.imagekit.io/8jjzxcl9p/tr:f-png/posts/backdrop-blur/Chrome.png" 
      loading="lazy"
      alt="Nested backdrop blur in Chrome. The child dialog is rendered with a semi-transparent background but the backdrop is not blurred." width="1233" height="942">
  </picture>
  <figcaption>How the nested backdrop blur is rendered in Chrome v120</figcaption>
</figure>

As seen here, the dropdown renders with backdrop blur as expected in Firefox, but not in Chrome. I have no way of testing this in Safari, so apologies.