---
title: "Self-hosting a Mastodon Instance"
description: "How I self-hosted my own Mastodon instance, and the errors I encountered along the way."
category: [Life]
permalink: /writing/en/mastodon-self-host/
theme:
  scheme: dark
  color: '#a3795a'
  color-hsl: '25 29% 50%'
  style:
    image:
      '--img-object-fit': cover
      '--img-object-position': right top
      '--post-image': linear-gradient(var(--theme-color), var(--theme-color))
cover:
  folder: mastodon-self-host
  filename: cover.png
  header: header.png
  sizes: [500, 600, 700, 1000, 1280]
  formats: ['png', 'webp', 'avif']
author: "teacherbuknoy"
language: "en"
seo:
  twitter:
    url: "https://ik.imagekit.io/8jjzxcl9p/posts/mastodon-self-host/twitter.png"
    is_prefixed: false
  og:
    url: "https://ik.imagekit.io/8jjzxcl9p/posts/mastodon-self-host/og.png"
    is_prefixed: false
eleventyExcludeFromCollections: true
---

I am on my 60th hour setting up and configuring my self-hosted Mastodon instance. No one should be setting up and configuring something for 60 hours but here we are.{{ 'sleep' | footnote }} My only motivation was to collect as many custom emojis as possible, and I went through everything to get it.   

{% footnote 'sleep' %}
Of course I slept. I was just too lazy (right now) to count my hours of sleep out. 
{% endfootnote %}  

In this post, I will detail everything I went through, and the mistakes I made that made me restart from scratch, so you don't make the same mistakes that I did. I closely followed the following tutorials, so this post is also going to be a summary of what I got from both:

- [Complete beginner's guide to installing Mastodon (+ Hometown)](https://n00q.net/articles/guide-mastodon-hometown/)
- [How To Install Mastodon on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-mastodon-on-ubuntu-20-04)

Also, if you see code snippets that are multiple lines' worth of code, copy and paste each line one-by-one, waiting for each to finish before pasting the next command. I know you know this already, I'm just putting it here so you don't shoot yourself in the foot. 

 ## What you need.   
 ### The basics.

- Email address   
- Credit card or PayPal account for paying the hosting and the domain name   
- Technical knowledge (you need to have an experience working with the terminal and with Linux)   
- A Linux terminal (Windows Subsystem for Linux or WSL will do, too)   

### A hosting server.   
I went for [Hostwinds](https://hostwinds.com), which I saw in [this thread by Ayo](https://masto.ai/@ayo@fosstodon.org/109545132049133009) (who was very helpful for the entire thing by the way). I don't know what a "managed VPS" is versus an "unmanaged VPS", but unmanaged VPS was cheaper at USD 4.99 per month, so that's what I got. I did a bit of reading about it, but I didn't get it at all, so I just figured I'd wing it.

I got an Ubuntu 22.04 VPS for the USD 9.99 per month which gives me 1 CPU, 2GB of RAM, 50 GB of storage, and 2 TB of bandwidth. This costs around PHP 550 per month, which is well within my budget.   

### A domain name.   
I already have an existing `antaresph.dev` domain, which I got from Google Domains last year. Instead of buying another one, I just tacked on a `social.antaresph.dev` subdomain for the Mastodon instance.   

### An email provider.   
The tutorials say that I need an email provider, but in my case, I don't think I'd need that. The email provider will send out verification codes and two-factor authentication codes, and since I'm the only one using the instance, I don't have the need for such.   
But if your needs call for an email provider, the tutorials I came across recommend Mailgun, with Sendgrid as an alternative. Among these, Sendgrid is the only one I tried in my projects in the past, and I can say their free tier could be enough for a one-user Mastodon instance.   

Whatever service you get for this, you will need to get ahold of the following details:   

- SMTP server (e.g. `smtp.mailgun.org`  or similar)   
- SMTP port (which can differ depending on the service but will typically be `587`)   
- SMTP username and password   
- SMTP authentication type (e.g. `plain`)   
- SMTP OpenSSL verify mode: (e.g. `none`, `peer`, etc.)   
- The email address that Mastodon will use as the sender (by default, it will be `notifications@<your_domain>`, e.g., `notifications@social.antaresph.dev`)   

### An object storage.   
You will need an object storage for images, videos, and other media that you will attach to your toots. I didn't have a need for a separate object storage because I think 50GB of local storage is enough for me, and I can freely upgrade later on. But if you need one, there's DigitalOcean Spaces and Linode.   
I cannot verify the tutorials for this because I didn't use a separate object storage, but if you do, you will need the following details:   
- Provider name   
- The space name or bucket name   
- The region   
- The endpoint   
- The access key   
- The secret key 

## Preparing the VPS.   

Before starting, you will need to prepare the VPS for hosting. DigitalOcean has a guide on how to do this for Ubuntu 20.04, which also worked flawlessly for my 22.04 instance. If you're going with Hostwinds for your VPS, do the following:   

1. **Create an SSH key.** You will need this to access your server via your local machine's terminal.    
    1. From your Hostwinds dashboard, select your VPS.   
    2. Select *Manage SSH keys*.   
    3. Select *Add SSH key*.   
    4. You will be asked to give it a name. Any name will do. Make it unique, especially if you're going to create a few more down the line.   
    5. The next screen will show you the private key. Save this somewhere safe and private, where only you can access it. Make sure to save it properly, **you will never see this screen again**. You can choose a format between *OpenSSH* and *PuTTY*, or both. If you're on Windows, PuTTY might be easier for you. For Linux terminals (including WSL), OpenSSH will make more sense.   
2. **Access your server.** This will be a tutorial for OpenSSH.   
    1. Save your private key in a file. You can also select *Download* from Hostwinds in step 1.5. The resulting file should have a `\*.pem` file extension.   
    2. From Hostwinds, get your VPS' domain. It should look something like this: `aicwl-2938201.hostwindsdns.com`.   
    3. From your Linux terminal, run the following command to access your VPS via SSH:   
      ```sh
      ssh root@<your_vps_domain> -i <your_private_key_file>
      ```
3. **Verify that you are in the VPS.** If the previous step was successful, you should be in your VPS now. You should know that you're in if you see something similar to this:
  ```sh
Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.0-77-generic x86_64)
* Documentation:  https://help.ubuntu.com
* Management:     https://landscape.canonical.com
* Support:        https://ubuntu.com/advantage

System information as of Sun Jul  9 03:44:08 AM PST 2023

System load:  0.0000000000       Processes:             119
Usage of /:   0% of 50GB         Users logged in:       0
Memory usage: 0%                 IPv4 address for eth0: 100.168.000.000
Swap usage:   0%                 IPv6 address for eth0: 2000:5000:0000:a1c::1

* Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
  just raised the bar for easy, resilient and secure K8s cluster deployment.

  https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

16 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm

Last login: Sun Jul  9 02:01:43 2023 from 192.168.8.1

root@<your_vps_domain>:~#
  ```
4. **Create a new user.** By default, you are the `root` user for this VPS. Think of your VPS as a universe, and `root` is the God of that universe. That's too much power—and too much room for mistakes. You need to create a new user that has just enough authority that you can recover when things break, but also do a substantial amount of things. Run the following command to create a new user called `mastodon`:
   ```sh
   adduser <your_username>
 
   # the recommended username is `mastodon`, so do it like this:
   adduser mastodon
   ```
   - You will be prompted for details, including the new user's password. **Remember the password you created for this new user.** You will not see it again once you set it.
   - This new user will be the user you will use to setup Mastodon. It is important that you **use `mastodon` as the name for this user.**
5. **Add the new user to the administrator group.** This is so you don't need to logout of the new user and login to the `root` account every time you need to do something that requires special privileges. You need to add the new user to the `sudo` group like so:
  ```sh
usermod -aG sudo mastodon
  ```
  Now, instead of logging into the `root` user, you will just need to use the `sudo` command.
6. **Test your new user.** Once you have created a new user, test it to see if you can log in.
   1. **Change your user from the root account.** From your root account, run the following command to see if you can login.
      ```sh
      su - mastodon
      ```
      - If your prompt changed to something like `mastodon@<your\_vps\_domain>`, then you have successfully logged into the new user.
  2. **Log into the new user via SSH.** Now it's time to change the way you log into your VPS via SSH. All this time, you're using `root` from the moment you log in. To log into the new user via SSH, use the following command:
  ```sh
  ssh mastodon@<your_vps_domain> -i <your_private_key_file>
  ```
