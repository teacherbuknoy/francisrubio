---
title: Quantarks
description: Revolutionizing education with augmented reality
date: 2017-09-04
customer: University of Caloocan City as part of our thesis project
role: Researcher, project manager, lead developer
duration: 2018 - 2019
tags:
  - Android
  - Unity 3D
links:
  - text: Facebook Page
    url: https://web.facebook.com/quantarks/
    is_primary: true
logo:
  src: "/assets/images/projects/quantarks.svg"
  alt: Quantarks logo
  width: 1080
  height: 1080
cover:
  src: "/assets/images/projects/quantarks/cover.png"
  alt: Quantarks
  width: 1200
  height: 630
image:
  alt: Quantarks
  folder: quantarks
  filename: cover.png
  sizes: [500, 1000, 1500, 1920]
  formats: ['png', 'webp', 'avif']
details:
  - key: Technologies used
    values:
      - Unity 3D, C#, Android, Blender, Adobe AfterEffects, Adobe Photoshop, Vuforia
  - key: Project duration
    values:
      - One year (2018 - 2019)
---

Quantarks is an augmented reality (AR) application for Android devices that serves interactive content to facilitate learning about the periodic table of elements. This was our thesis project for my bachelor's degree in Computer Science. This project was made by a team that included me and three other developers and designers that happened to be my best friends.

For this project, I worked as the lead developer. I also acted as the project manager. One of our teammates acted as another developer to help me. The other two were user experience (UX) designers, and one of them also worked on modelling the 3D objects that we incorporated in the app for the AR experience.

## Problem

Chemistry is subjectively one of the hardest branches of science. And while teachers are smart and skilled enough to teach this subject, they could benefit from infusing entertainment into education.

The goal of this project is to create a prototype of an application that will eventually be used in a classroom setting in the Philippines. It also has to solve the following problems:

- It has to be accessible offline for schools in areas with slow Internet connection or none at all.
- It has to be accessible by people with no smartphones, and those with smartphones that are not powerful enough to run the application.
- It should be cost-effective, and as cheap to produce as possible.

## Solution

We started working on the project mid-2018. We initially explored using Android's native application programming interface (API) for the user interface (UI), and Unity 3D and Vuforia for the augmented reality section. However, as the project progressed, we realized that this is not an ideal setup, and it would cost us much later in the development. We decided to scrap the UI we had and rebuild it using Unity 3D.

Because of how AR technology worked at the time, we also had to create markers, which are pieces of graphics printed on a medium. Each element on the periodic table had a unique marker printed on a piece of card that students could use personally. These markers were designed by one of our UX designers. He also designed a large periodic table with the same markers on it for use in a classroom setting.

### Solving the problems

To tick off every item on the list of problems we need to solve, building the app is only a part of the solution. Our goal isn't to just incorporate technology into education just because. Our goal is to incorporate entertainment into education, and technology is only one of the tools to make that happen. This means that we need to work on this project from the base, i.e. little technology involved, and progressively enhance from there by incorporating technology for those who can afford and use it.

- **It has to be accessible offline for schools in areas with slow Internet connection or none at all.**
  - On our builds of the application, we built the 3D models into the app installer itself. This means that the app will work even in the complete absence of Internet connectivity. A consequence of this is the large download size (~700mb) of the installer. We think this wouldn't be a problem on higher-end devices, as several games on the Google Play Store exceed the 1 gigabyte mark for download size.
  - We could have improved this further by excluding the 3D models from the installer build and instead hosting it on a server. The app then downloads it on its first use. Once it has downloaded all 3D models, it will not need to connect to the Internet again.
  - Another way this could work is instead of downloading everything on first use, we only download the 3D model of the element that was scanned using the app. We can then save this on the device's cache. But there is no guarantee that this will be saved until the next time the app is used and will require Internet connectivity more often than that of the other two proposed solutions.
  
  Because of the time constraints our team faced, we were not able to exclude the assets from the installer build and host it on a server. 
- **It has to be accessible by people with no smartphones, and those with smartphones that are not powerful enough to run the application.** Instead of designing custom markers from scratch, we used QR codes for each element. These QR codes could potentially store plain text that holds information about the element. This enables people with no internet connection to view the information we want them to know about even when there is no Internet connectivity. This could also potentially store a uniform resorce locator (URL) that leads to a webpage that has all the details about that element. This will enable learners with smartphones that are not powerful enough to run the Quantarks app to view the content on the web instead. Unfortunately, due to time constraints, we didn't have the opportunity to embed the information or the URL in the QR codes, so we settled on using the element's names instead. 
- **It should be cost-effective, and as cheap to produce as possible.** The marker cards and the periodic table are made of sintra board. All of these costed us ₱2,160.00 at that time. If these are to be mass produced, the cost could go lower. If this project was also to be funded by the institution that will use it, the cost could be much cheaper for the teacher and the learners that would avail of it. This price could go even lower, as the markers could be printed on paper in grayscale. Since the QR code's pattern is not dependent on color, the markers could be printed on bond paper and reproduced using photocopiers.

## Results

We were not able to test this application in a real world setting. However, our team participated in the school's thesis exhibit where students and visitors got their hands on our app. The reviews were generally good, with a few of them noticing the flaws of the application. Our project was also among the ten best thesis projects of that year in our university.

## Preview

<iframe class="embed embed--youtube" width="560" height="315" src="https://www.youtube-nocookie.com/embed/aYPIwqVA5O8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe class="embed embed--youtube" width="560" height="315" src="https://www.youtube-nocookie.com/embed/o2x8RXFutfY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>