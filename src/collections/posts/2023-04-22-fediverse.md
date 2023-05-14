---
title: "Ang Fediverse"
description: "Ang bago at mas ligtas na social media"
category: ["opinion"]
cover:
  folder: frustrations-bisexual
  filename: cover.png
  header: header.png
  sizes: [500, 600, 700, 1000, 1280]
  formats: ['png', 'webp']
author: "teacherbuknoy"
language: "tl"
seo:
  twitter:
    url: "https://ik.imagekit.io/8jjzxcl9p/tr:f-png,w-0.5/posts/frustrations-bisexual/twitter.png"
    is_prefixed: false
  og:
    url: "https://ik.imagekit.io/8jjzxcl9p/tr:f-png,w-0.5/posts/frustrations-bisexual/og.png"
    is_prefixed: false
eleventyExcludeFromCollections: true
syndication: null
---

Noong nagtuturo pa ako, may subject akong Media and Information Literacy. Sa subject na iyon, itinuturo ang concept ng mga digital native at digital immigrants. Kapag digital native ka, ibig sabihin ipinanganak ka sa mundong dependent na sa digital technology. Kapag digital immigrant ka naman, ipinanganak ka bago maging totally dependent sa digital technology ang mundo, at kinailangan mong mag-adapt eventually. Nasa pagitan ako ng dalawa; digital na ang mundo noong ipinanganak ako, pero hindi ako nagkaroon ng access sa digital technology in general until noong high school ako. Sa ngayon, malaking part ng oras ko ang napupunta sa pag-scroll online—kahit mahirap para sa akin na aminin. Proud pa ako before na nasa Twitter ako, dahil nga bilang developer, naka-follow ako sa mga mahahalagang tao sa development industry. Updated ako sa mga changes sa mga web standard, pati na rin sa mga bagong framework na lumalabas

Pero nitong mga nakaraang buwan, napunta sa kamay ng mga kuwestiyonableng personalidad ang Twitter, kaya kinailangan kong humanap ng lilipatan. And at the time, ang pinaka-obvious na platform para sa akin ay Mastodon. Later on, nalaman ko na part pala ang Mastodon ng tinatawag na Fediverse, isang network ng decentralized instances ng mga social media na may sinusunod na standard. Sa post na ito, gusto kong ikuwento ang naging experiences ko sa Fediverse so far, pati na ang mga natutuhan ko na baka makatulong sa iyo kung naghahanap ka ng bagong tatambayan online.

## The Fediverse

Para sa marami, kapag sinabing social network or social media, ang unang pumapasok sa isip nila ay Facebook, Twitter, Instagram, at to some extent, Tiktok. Lahat ng mga ito ay centralized. Ibig sabihin, isa lang ang may-ari ng social media site. Halimbawa, kapag nag-log in ka sa Twitter, kumo-connect ka sa servers na pagmamay-ari ng company ng Twitter. Lahat ng data mo, pati na ang data ng iba pang mga users ay naka-save sa servers ng Twitter.

<figure class="image">
  <svg class="invert-on-dark" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" style="background-color:#fff" viewBox="-.5 -.5 964 784">
    <path fill="#FFF" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M402 338.8c0-3.76 35.82-6.8 80-6.8 21.22 0 41.57.72 56.57 1.99 15 1.28 23.43 3.01 23.43 4.81v146.4c0 3.76-35.82 6.8-80 6.8s-80-3.04-80-6.8Z" pointer-events="all"/>
    <path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M562 338.8c0 3.76-35.82 6.8-80 6.8s-80-3.04-80-6.8" pointer-events="all"/>
    <switch transform="matrix(2 0 0 2 -.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:78px;height:1px;padding-top:209px;margin-left:202px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              Twitter
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="241" y="213" font-family="Figtree" font-size="12" text-anchor="middle">Twitter</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M722 702H482V504.74" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" stroke-width="2" d="m482 494.24 7 14-7-3.5-7 3.5Z" pointer-events="all"/>
    <rect width="80" height="160" x="722" y="622" fill="#FFF" stroke="#000" stroke-width="4" pointer-events="all" rx="14" ry="14"/>
    <switch transform="matrix(2 0 0 2 -.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:351px;margin-left:362px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="381" y="355" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M882 412H574.74" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" stroke-width="2" d="m564.24 412 14-7-3.5 7 3.5 7Z" pointer-events="all"/>
    <rect width="80" height="160" x="882" y="332" fill="#FFF" stroke="#000" stroke-width="4" pointer-events="all" rx="14" ry="14"/>
    <switch transform="matrix(2 0 0 2 -.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:206px;margin-left:442px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="461" y="210" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M762 282v130H574.74" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" stroke-width="2" d="m564.24 412 14-7-3.5 7 3.5 7Z" pointer-events="all"/>
    <rect width="80" height="160" x="722" y="122" fill="#FFF" stroke="#000" stroke-width="4" pointer-events="all" rx="14" ry="14"/>
    <switch transform="matrix(2 0 0 2 -.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:101px;margin-left:362px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="381" y="105" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M482 162v157.26" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" stroke-width="2" d="m482 329.76-7-14 7 3.5 7-3.5Z" pointer-events="all"/>
    <rect width="80" height="160" x="442" y="2" fill="#FFF" stroke="#000" stroke-width="4" pointer-events="all" rx="14" ry="14"/>
    <switch transform="matrix(2 0 0 2 -.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:41px;margin-left:222px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="241" y="45" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M242 202h80v210h67.26" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" stroke-width="2" d="m399.76 412-14 7 3.5-7-3.5-7Z" pointer-events="all"/>
    <rect width="80" height="160" x="162" y="102" fill="#FFF" stroke="#000" stroke-width="4" pointer-events="all" rx="14" ry="14"/>
    <switch transform="matrix(2 0 0 2 -.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:91px;margin-left:82px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="101" y="95" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M82 412h307.26" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" stroke-width="2" d="m399.76 412-14 7 3.5-7-3.5-7Z" pointer-events="all"/>
    <rect width="80" height="160" x="2" y="332" fill="#FFF" stroke="#000" stroke-width="4" pointer-events="all" rx="14" ry="14"/>
    <switch transform="matrix(2 0 0 2 -.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:206px;margin-left:2px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="21" y="210" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
  </svg>

  <figcaption>
    <p>Ang Twitter ay example ng isang <b>centralized social media</b>. Nasa iisang central instance lang ang data ng lahat ng user.</p>
  </figcaption>
</figure>

Iba rito ang Fediverse. Decentralized ang Fediverse. Sa halip na i-store sa iisang instance ang data ng lahat ng users, maraming instances sa Fediverse na puwedeng gamitin ng users. Nakakapag-usap ang mga servers na ito sa isa't isa at nagpapasahan ng data.

<figure class="image">
  <svg class="invert-on-dark" viewBox="-.5 -.5 942 513">
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M210.06 286V171h213.57" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m428.88 171-7 3.5 1.75-3.5-1.75-3.5Z" pointer-events="all"/>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M240 326h453.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m698.88 326-7 3.5 1.75-3.5-1.75-3.5Z" pointer-events="all"/>
    <path fill="#FFF" stroke="#000" stroke-miterlimit="10" d="M160 289.4c0-1.88 17.91-3.4 40-3.4 10.61 0 20.78.36 28.28 1 7.51.63 11.72 1.5 11.72 2.4v73.2c0 1.88-17.91 3.4-40 3.4s-40-1.52-40-3.4Z" pointer-events="all"/>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M240 289.4c0 1.88-17.91 3.4-40 3.4s-40-1.52-40-3.4" pointer-events="all"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:78px;height:1px;padding-top:329px;margin-left:161px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              Instance 1
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="200" y="333" font-family="Figtree" font-size="12" text-anchor="middle">Instance 1</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M380.06 431v-30h-180l-.05-28.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m200 367.12 3.51 6.99-3.5-1.74-3.5 1.75Z" pointer-events="all"/>
    <rect width="40" height="80" x="360" y="431" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:471px;margin-left:361px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="380" y="475" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M260.06 431v-30h-60l-.05-28.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m200 367.12 3.51 6.99-3.5-1.74-3.5 1.75Z" pointer-events="all"/>
    <rect width="40" height="80" x="240" y="431" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:471px;margin-left:241px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="260" y="475" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M140.06 431v-30h60l-.05-28.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m200 367.12 3.51 6.99-3.5-1.74-3.5 1.75Z" pointer-events="all"/>
    <rect width="40" height="80" x="120" y="431" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:471px;margin-left:121px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="140" y="475" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M20.06 431v-30h180l-.05-28.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m200 367.12 3.51 6.99-3.5-1.74-3.5 1.75Z" pointer-events="all"/>
    <rect width="40" height="80" y="431" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:471px;margin-left:1px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="20" y="475" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M730.06 286V171H516.37" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m511.12 171 7-3.5-1.75 3.5 1.75 3.5Z" pointer-events="all"/>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M700 341H246.37" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m241.12 341 7-3.5-1.75 3.5 1.75 3.5Z" pointer-events="all"/>
    <path fill="#FFF" stroke="#000" stroke-miterlimit="10" d="M700 289.4c0-1.88 17.91-3.4 40-3.4 10.61 0 20.78.36 28.28 1 7.51.63 11.72 1.5 11.72 2.4v73.2c0 1.88-17.91 3.4-40 3.4s-40-1.52-40-3.4Z" pointer-events="all"/>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M780 289.4c0 1.88-17.91 3.4-40 3.4s-40-1.52-40-3.4" pointer-events="all"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:78px;height:1px;padding-top:329px;margin-left:701px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              Instance 2
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="740" y="333" font-family="Figtree" font-size="12" text-anchor="middle">Instance 2</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M920.06 431v-30h-180l-.05-28.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m740 367.12 3.51 6.99-3.5-1.74-3.5 1.75Z" pointer-events="all"/>
    <rect width="40" height="80" x="900" y="431" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:471px;margin-left:901px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="920" y="475" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M800.06 431v-30h-60l-.05-28.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m740 367.12 3.51 6.99-3.5-1.74-3.5 1.75Z" pointer-events="all"/>
    <rect width="40" height="80" x="780" y="431" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:471px;margin-left:781px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="800" y="475" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M680.06 431v-30h60l-.05-28.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m740 367.12 3.51 6.99-3.5-1.74-3.5 1.75Z" pointer-events="all"/>
    <rect width="40" height="80" x="660" y="431" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:471px;margin-left:661px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="680" y="475" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M560.06 431v-30h180l-.05-28.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m740 367.12 3.51 6.99-3.5-1.74-3.5 1.75Z" pointer-events="all"/>
    <rect width="40" height="80" x="540" y="431" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:471px;margin-left:541px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="560" y="475" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M510 161h230.06L740 279.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m740 284.88-3.5-7 3.5 1.75 3.5-1.75Z" pointer-events="all"/>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M430 161H200.06v118.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m200.06 284.88-3.5-7 3.5 1.75 3.5-1.75Z" pointer-events="all"/>
    <path fill="#FFF" stroke="#000" stroke-miterlimit="10" d="M430 124.4c0-1.88 17.91-3.4 40-3.4 10.61 0 20.78.36 28.28 1 7.51.63 11.72 1.5 11.72 2.4v73.2c0 1.88-17.91 3.4-40 3.4s-40-1.52-40-3.4Z" pointer-events="all"/>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M510 124.4c0 1.88-17.91 3.4-40 3.4s-40-1.52-40-3.4" pointer-events="all"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:78px;height:1px;padding-top:164px;margin-left:431px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              Instance 3
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="470" y="168" font-family="Figtree" font-size="12" text-anchor="middle">Instance 3</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M650.06 81v20h-180l-.04 13.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m470 119.88-3.48-7.01 3.5 1.76 3.5-1.74Z" pointer-events="all"/>
    <rect width="40" height="80" x="630" y="1" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:41px;margin-left:631px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="650" y="45" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M530.06 81v20h-60l-.04 13.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m470 119.88-3.48-7.01 3.5 1.76 3.5-1.74Z" pointer-events="all"/>
    <rect width="40" height="80" x="510" y="1" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:41px;margin-left:511px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="530" y="45" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M410.06 81v20h60l-.04 13.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m470 119.88-3.48-7.01 3.5 1.76 3.5-1.74Z" pointer-events="all"/>
    <rect width="40" height="80" x="390" y="1" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:41px;margin-left:391px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="410" y="45" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
    <path fill="none" stroke="#000" stroke-miterlimit="10" d="M290.06 81v20h180l-.04 13.63" pointer-events="stroke"/>
    <path stroke="#000" stroke-miterlimit="10" d="m470 119.88-3.48-7.01 3.5 1.76 3.5-1.74Z" pointer-events="all"/>
    <rect width="40" height="80" x="270" y="1" fill="#FFF" stroke="#000" stroke-width="2" pointer-events="all" rx="7" ry="7"/>
    <switch transform="translate(-.5 -.5)">
      <foreignObject width="100%" height="100%" pointer-events="none" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow:visible;text-align:left">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:unsafe center;justify-content:unsafe center;width:38px;height:1px;padding-top:41px;margin-left:271px">
          <div data-drawio-colors="color: rgb(0, 0, 0);" style="box-sizing:border-box;font-size:0;text-align:center">
            <div style="display:inline-block;font-size:12px;font-family:Figtree;color:#000;line-height:1.2;pointer-events:all;white-space:normal;overflow-wrap:normal">
              user
            </div>
          </div>
        </div>
      </foreignObject>
      <text x="290" y="45" font-family="Figtree" font-size="12" text-anchor="middle">user</text>
    </switch>
  </svg>

  <figcaption>
    <p></p>
  </figcaption>
</figure>

