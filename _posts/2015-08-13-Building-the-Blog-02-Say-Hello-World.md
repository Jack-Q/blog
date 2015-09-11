---
title: "Building the Blog (02): Say Hello World"
comment_id: building-the-blog-02
layout: post-simple
---
> Continuing \...

This post is the second part of the [Building the Blog][] 
series which focuses on setting up the environment and andding 
the basic page as well as making the whole blog run up with the
power of `Jekyll`.
 
Set up the environment
----------------------

Jekyll is a ruby program, which means ruby is required for Jekyll.
As Jekyll's official document recommended, the supported OS for 
it including Linux, Unix, Max OS X and Windows is *not* officially
supported. Even though, installing ruby, RubyGems and other requirements
on Windows has some convinent solution, there still will have some 
unexpected problems that occur in some specific scenarion owing to 
the disagreement between operating systems.

I use Linux Mint as my main software environment. The following codes
or commands without additional comments have been tested on that platform.
To be more specific, what I use by default is Linux Mint 17.2 Cinnamon
Edition in this series posts.

First, if you don\'t have Ruby and RubyGems installed on your environment,
you can use following commands to install them:

```bash
sudo apt-get install ruby
```

Afterwards, you should install the core, Jekyll itself via RubyGems.

```bash
sudo gem install jekyll
```

I think it's time to test whether all is well. To create a new site scaffold in a
specific path, the `new` subcommand of `jekyll` is well to go. Just use the following 
commands:

```bash
# use directory ~/new-jekyll for example
cd ~
jekyll new new-jekyll
cd new-jekyll
ls -al
```

As showed in your terminal, the all of the basic components have been set up
 for you as a start point for your future awesome site. To have a peek of it,
just run the `serve` subcommand of `jekyll`:

```bash
# use serve subcommand to start a local server.
# use s or server is valid as well.
jekyll serve
```

Now, open your broswer and visit [http://localhost:4000/](). Congratulations! I think 
you have seen what the site looks like.

However, good luck may play hide & seek with you sometimes. If you couldn't see the site
in your broswer, please check whether the port 4000 has been used by another application.
A quick solution for this problem is specifying another port for jekyll to serve pages.
Use the `--port ${PORT}` switch of `jekyll` command to alternate it.

```bash
PORT=12345
jekyll serve --port ${PORT}
```
Say Hello World
---------------

Next, say "Hello World" as convensions. There is no doubt that the posts are the center of 
the site. In Jekyll, all your post should be placed in a special directory named `_posts`. 
Since we started based on a scaffold, this directory is existed and has a sample post in it.
Add a new (or replace the original) plain text file with a name following the convension of 
`yyyy-mm-dd-your-post-name.md` (`yyyy-mm-dd` is the date of the blog post of which the year month
day are seperated by dashes, `your-blog-post-name` is the name of the post in which the spaces
should be replaced with dashes, the file extension `md` just indicates the file as a markdown file
, if you like some other wide-accepted extensions such as `markdown` are also alternations). Then 
open it with your prefered text editor and type in some text ("Hello World" is definately
 a good choice at this moment). Save it and open your site in your broswer. (If you pressed 
 <kbd>Ctrl+C</kbd> and terminated Jekyll server, just run it again). Is the new post listed in 
 the index page?

[Building the Blog]: /series/Building-the-Blog
 
 