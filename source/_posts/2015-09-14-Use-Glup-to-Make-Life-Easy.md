---
title: "Use Glup to Make Life Easy"
comment_id: use-glup-to-make-life-easy
date: 2015-09-14 08:00:00
layout: post-simple
tags:
  - gulp
  - javascript
category:
  - javascript
---

> task-1, task-2, task-3, task-4, ...

Everyone who working in front end web page development will
have some trivals repeating and repeating. Imagine that you are creating 
a web page from scratch, you need to design the all the pages arrage the relationships
between different pages and other websides. Then you need to implement every single
 pages. You should figure out the common part and reusable part and put them together,
 and use some client-side or server-side mothods to merge all different part together
and represent a perfectly metched web page to your audience. If you achieve the goal
via a client side method such as `frameset` of `iframe` tag in web page, then you can 
hardly prevent user directly visit a fragment of a layer of your final site. In some
other scrnarios, some one directly use the same method as you do to put your site 
fragment into their web pages. Isn't it annoying?

<!-- more -->

Then, some people choose to use a dynamic web server and do this task in server side.
There is no doubt that no one can easily use part of your page into their work or use 
them unauthorized. And every time a user visit your page, your server will do this merging
task and send the response back. Wait. Every time when someone visit your page will do 
a lot more work than before as a static page. 

Of course, there always had been some one who prompted some quirk way to make the whole
system make sence. They use cahce to make then together at the first time people visit 
your web page. Well, finally, let me tell you what I'd like to share with you here
 -- a staic site generator which do this task at development or deployment time.
I'm not want to talk about this topic in this post since I've mentioned before.
I merely want to use this example to illustrate we need to do a lot work before deployment.
And here comes the topic -- `Glup` a task runner.


