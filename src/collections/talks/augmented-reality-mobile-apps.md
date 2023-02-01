---
title: "Augmented Reality and the State of Mobile Apps"
description: A bird's-eye-view talk on the state of augmented reality and mobile apps
image: /talks/tech2rism-2021/cover.jpg
slug: augmented-reality-mobile-apps
date: 2023-02-03
# tentativeDate:
#   toBeDiscussed: false
#   year: 2023
#   month: 1
host:
  - name: Technological University of the Philippines
    description: Computer Studies Department, College of Science
event: 
  - name: Student-Organized Webinars
    description: Webinars organized by college students as part of their student program.
audience:
  - Students and faculty members from Technological University of the Philippines
duration:
  - PT3H0M
location: Online
---

## Files
<a href="https://docs.google.com/presentation/d/1eHdZaMwUHzDMKUISoZjVTQotKkH7OlYG-w1jLFAr5xk/edit?usp=sharing" class="file-button" target="_blank" rel="noopener noreferer nofollow">
  <div class="file__image">
    <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
      <path d="M283.5 378H810V810H283.5V378Z" fill="white"/>
      <path d="M648 324L837 407.7L891 297L648 54L580.5 167.4L648 324Z" fill="#F29900"/>
      <path d="M648 297V54H270C224.1 54 189 89.1 189 135V945C189 990.9 224.1 1026 270 1026H810C855.9 1026 891 990.9 891 945V297H648ZM756 432V729H324V432H756Z" fill="#FBBC04"/>
      <path d="M378 486H702V675H378V486Z" fill="#FBBC04"/>
    </svg>

  </div>
  <div class="stack">
    <span class="weight-bold">[TALK] Augmented Reality and the State of Mobile Apps</span>
    <span class="fg--accent">Google Slides</span>
  </div>
</a>

## Talk Outline
### Augmented Reality
#### What is Augmented Reality?

<figure class="quotation">
  <blockquote>
    <p>Augmented reality is an enhanced, interactive version of a real-world environment achieved through digital visual elements, sounds, and other sensory stimuli via holographic technology. AR incorporates three features: a combination of digital and physical worlds, interactions made in real time, and accurate 3D identification of virtual and real objects.</p>
  </blockquote>
  <figcaption><cite>Microsoft</cite></figcaption>
</figure>

#### What's the difference between Augmented and Virtual Reality?
**Augmented Reality (AR)**
  : adds digital elements over views that show the real world

**Virtual Reality (VR)**
  : takes users into an immersive digital world they can interact with

**Mixed Reality (MR)**
  : combining AR and VR elements 

**Extended Reality (XR)**
  : all types of technologies that enhance the immersion of an experience


#### Short History of Augmented Reality

1968
  : Ivan Sutherland, a Harvard professor and computer scientist, created the first head-mounted display called [The Sword of Damocles](https://youtu.be/CjbILO8gSQw).

1974
  : Myron Kruger, a computer researcher and artist, built a laboratory at the University of Connecticut called [Videoplace](https://youtu.be/d4DUIeXSEpk) that was entirely dedicated to artificial reality. Within these walls, projection and camera technology was used to emit onscreen silhouettes which surrounded users for an interactive experience.

1990
  : [Professor Thomas Caudell](https://ece.unm.edu/faculty-staff/emeritus-profile/thomas-caudell.html) coins the term "Augmented Reality"

1998
  : Sportsvision broadcasts the first live NFL game with the virtual 1st & Ten graphic system – aka the yellow yard marker. The technology displays a yellow line overlayed on top of the feed to that views can quickly see where the team just advance to to get a first down. This system is still used today, although admittedly more advanced than it was in the late ‘90s. Viewers have become accustomed to the yellow line marker and other additional graphics – most don’t even know that this is a form of AR technology. 
  : ![NFL Yellow Line](https://i.ytimg.com/vi/1Oqm6eO6deU/maxresdefault.jpg)

2000
  : Hirokazu Kato developed an open-source software library called the [ARToolKit](https://www.artoolkitx.org/). This package helps other developers build augmented reality software programs. The library uses video tracking to overlay virtual graphics on top of the real world.

2009
  : Esquire Magazine used [augmented reality in print media](https://youtu.be/wp2z36kKn0s) for the first time in an attempt to make the pages come alive. When readers scanned the cover, the augmented reality equipped magazine featured Robert Downey Jr. speaking to readers.

2013
  : Volkswagen debuted the [MARTA app](https://youtu.be/H7RzyjNJH6c) (Mobile Augmented Reality Technical Assistance) which primarily gave technicians step-by-step repair instructions within the service manual.

2014
  : Google unveiled its [Google Glass](https://youtu.be/4EvNxWhskf8) devices, a pair of augmented reality glasses that users could wear for immersive experiences.

2016
  : Microsoft starts shipping its version of wearable AR technology called the [HoloLens](https://youtu.be/4p0BDw4VHNo), which is more advanced than the Google Glass, but came with a hefty price tag. It’s definitely not an everyday type of accessory.

#### How does AR work?
**Marker-based AR**
  : Augmented reality experiences that use image recognition to identify objects to anchor with when placing digital objects into view.

**Markerless AR**
  : Augmented reality experiences that use a set of different sensors like GPS, clock, accelerometer, and compass to place digital objects into view.

### Components of AR
1. Artificial Intelligence
2. AR Software
3. Processing
4. Lenses
5. Sensors

#### Where to start?
1. Programming—AR technologies and frameworks like Vuforia do most of the heavy lifting for you. Most of the time you'll spend will go into modelling and properly placing your 3D models. This is especially true with marker-based AR. But with markerless AR, you will have to learn how to interface with your device's sensors and GPS programmatically.
2. Frameworks and SDKs—SDKs provide a base for you to create your AR app on. They do most of the heavy lifting for you.
   - [ARKit for iOS](https://developer.apple.com/augmented-reality/arkit/)
   - [ARCore from Google](https://arvr.google.com/arcore/)
   - [Simple CV](http://simplecv.org/) - open source but might be more complicated. Applications are not limited to AR
   - [Vuforia](https://www.ptc.com/en/products/vuforia) - inteegrates with Unity3D


### Mobile Applications

#### Types
 **Native Apps**
  : Apps that are made specifically for a particular operating system or mobile platform
  : Apps made for iOS will not run on Android devices, etc.
  : Native apps benefit from wider access to APIs and better integration with the device
  : Ensures better performance for a particular mobile OS
  : Might double the work if you are building the same app for multiple platforms, as you have to code everything separately from the ground up for each OS

**Web-based apps**
  : Apps that are made usnig web technologies (HTML, CSS, and JavaScript)
  : Data storage is in the cloud instead of local
  : Typically needs internet access to work
  : runs on a browser

**Hybrid apps**
  : Mix of native and web-based apps
  : write once, run anywhere
  : single codebas for all platforms
  : Might have poorer performance
  : many times, hybrid apps do not integrate with the operating system, especially with its user interface

#### Evolution of Mobile Apps
##### Predictions and Origins

June 1983
  : [**Steve Jobs predicts a software distribution system.**](https://lifelibertytech.com/2012/10/02/the-lost-steve-jobs-speech-from-1983-foreshadowing-wireless-networking-the-ipad-and-the-app-store/#.). At a conference, Jobs discusses a software distribution center to a record store where systems can be bought over phone lines. This prediction became true when Apple and Google released the App Store and Play Store respectively

January 1987
  : **[Psion EPOC](https://manifesto.co.uk/history-mobile-application-development/)**. An early handheld computer that uses Symbian as its operating system and has basic apps

November 1993
  : **[The Information Appliance](https://www.bloomberg.com/news/articles/1993-11-21/the-information-appliance)**. Business Week predicts in its 1993 article that <q>the future information appliances will instantly make the connections to a world of digitized entertainment, communications, and data on the superhighway or over the airwaves.</q>

January 1996
  : **[The Palm OS](https://www.techradar.com/news/how-palm-pre-and-webos-inspired-the-modern-smartphone)**. Palm OS is not the first personal digital assistant (<abbr>PDA</abbr>), but it is considered to be the first one that got it right. <abbr>PDA</abbr>s are small handheld devices that were the precursors to smartphones. They are computers that looked like scientific calculators and allowed you to read and send emails among other things.

December 1997
  : **[The Nokia 6110](http://web.archive.org/web/20141116031455/https://lumiaconversations.microsoft.com/2010/11/25/the-evolution-of-snake/)**.  This phone has popularized the now iconic Snake game. The game first appeared in mid-1970s as a game called Blockade. But in 1997, people could carry this games in their pockets, and it's the first time we considered mobile phones as vehicles for games.

December 1999
  : **[Wireless Application Protocol](https://inspiredbloggers.blogspot.com/2004/12/brief-history-of-wap_110252445307049372.html)** (<abbr>WAP</abbr>). The Wireless Application Protocol is a technical standard for accessing information over a mobile wireless network. In 1999, this protocol has been made available for mobile devices.

October 2001
  : **[iPod](http://web.archive.org/web/20100905050952/https://www.apple.com/pr/products/ipodhistory/)**. The first generation iPod is released with built-in apps such as Solitaire and Brick, with the tagline "1,000 songs in your pocket."

June 2007
  : **The iPhone is launched**. The iPhone launch is a landmark event in the history of technology. Its release influenced the current smartphone market, began the responsive web design era, and can also be considered a catalyst for the current focus on cloud synchronization between phones and desktop PCs.

June 2007
  : **[Third-party developers](http://web.archive.org/web/20110714002801/https://www.apple.com/pr/library/2007/06/11iPhone-to-Support-Third-Party-Web-2-0-Applications.html)**. Apple announce developers can create Web 2.0 applications which look and behave just like apps built into the iPhone and can seamlessly access the iPhone's services. Previously, mobile applications were all native apps that were made by the phone manufacturers themselves, and there was no way for third-party developers to create their own mobile applications.

July 2008
  : **The App Store is launched**. At its launch, the App Store had 552 apps ready to download, 135 of which are free.

##### Apps as "information appliances"

September 2008
  : **[Fitbit is released](http://web.archive.org/web/20141128052712/https://www.technologyreview.com/news/410806/self-surveillance/page/1/)**.** The Fitbit is the first wearable mobile device and tracks users 24 hours a day to produce a fitness record that includes number of steps taken, calories burned, and quality of sleep.

October 2008
  : **[HTC Dream](https://www.engadget.com/2008/08/18/htc-dream-fcc-approved-android-clear-for-launch/)**. Also known as <i>The Googlephone</i>, the HTC Dream becomes the first smart phone to use the Android mobile operating system.

October 2008
  : **[The Android Market is released](http://web.archive.org/web/20130805214349/https://www.techhive.com/article/152613/google_android_ships.html)**. Google's Android Market becomes the second major distributor of mobile apps and the App Store's key rival. Throughout its stay, the Android Market became a store for buying music, e-books, and movies along with mobile apps. The Android Market is the precursor to the eventual Google Play Store.

##### The focus on home screens

June 2011
  : **[Zynga Games loses 36 million users](http://web.archive.org/web/20141109091328/https://online.wsj.com/articles/zynga-loss-widens-as-company-struggles-to-generate-another-hit-1415309188)**. The FarmVille user base falls from 60 million to 26 million, a clear sign that consumers are shifting to mobile games instead of web-based ones.

March 2012
  : **[Android Market is renamed to Google Play Store](http://web.archive.org/web/20120311103834/https://www.telegraph.co.uk/technology/google/9128419/Google-renames-Android-Market-Google-Play.html)** as part of the latest Android 2.2 mobile update

April 2012
  : **[Facebook acquires Instagram](https://fortune.com/2012/04/09/breaking-facebook-buying-instagram-for-1-billion/)** for $1 billion, the highest ever paid for an app company.

May 2013
  : **[Flappy Bird](http://web.archive.org/web/20140311201200/https://www.rollingstone.com/culture/news/the-flight-of-the-birdman-flappy-bird-creator-dong-nguyen-speaks-out-20140311)**. This game was downloaded over 50 million times only to be pulled by its creator Dong Nguyen in February 2014 due to his fears of the game's addictive qualities. The game has spawned quite a lot of copycats since.

##### Apps as service layers

March 2014
  : **[Facebook releases Messenger](https://www.forbes.com/sites/parmyolson/2014/11/10/facebook-half-a-billion-people-now-use-messenger/)**. Half a billion people adopt the app within six months

May 2014
  : **Gmail becomes the first standalone app to hit 1 billion downloads**.

### Progressive Web Apps

Progressive Web Apps (<abbr>PWA</abbr>s) are web apps that use *service workers*, *manifests*, and other web-platform features in combination with *progressive enhancement* to give users an experience on par with native apps.

#### Benefits of PWAs

**Installable**
  : Unlike regular websites, PWAs are installable independent of a web browser. Once installed they look and behave like a native application.

**Progressively enhanced**
  : The web is heavily fragmented, and just a single browser can have many users that use different versions of it. PWAs are progressively enhanced, which means that it uses the latest technology available to modern browsers, while also making sure that it can still perform its basic tasks on older browsers.

**Responsively designed**
  : Like most modern websites, PWAs are responsive. This means that it adapts its layout to your device's size. This also means that PWAs can be used on desktops and laptops with wider screens. It also means that it responds to your preferences about color schemes, animations, contrasts, data savers, and other such settings available in your browser.

**Re-engageable**
  : Native apps are re-engageable in that it's very easy for users to gain access to updates and new content. PWAs make this even easier. Unlike native apps where you still need to go to your device's software store, PWAs can update to the latest version just by refreshing them in your browser. They also have access to your device's notifications, so you can choose to be updated through it.

**Linkable**
  : Unlike native apps where you have to go through the installation process to view content, PWAs can be used even without installation since they are just websites. All links to PWAs just work.

**Discoverable**
  : Contents of a <abbr title="Progressive Web App">PWA</abbr> are well-represented in search engines. Unlike native and hybrid apps that are installed on a device and are thus undiscoverable to web crawlers, <abbr>PWA</abbr>s are just glorified websites and can be very available to search engines

**Network independent**
  : PWAs can work offline unlike regular websites. As long as you've used it at least one time online, your succeeding visits can work offline. You can view everything you've seen previously, as well as other content that the app cached when you had an Internet connection.

**Secure**
  : Everything that makes a website secure can also be used by PWAs, particularly the HTTPS technology that prevents snooping on network requests. It's also easier for users to make sure that they're installing the correct app because the PWA's URL will match your site's domain.


*[URL]: Uniform Resource Locator
*[PWA]: Progressive Web App
*[PWAs]: Progressive Web Apps