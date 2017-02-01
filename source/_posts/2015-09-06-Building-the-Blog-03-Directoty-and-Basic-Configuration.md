---
title: "Building the Blog (03): Directory and Basic Configuration"
comment_id: building-the-blog-03
layout: post-simple
tags:
  - blog
  - jekyll
categories:
  - blog
---

> Dive deeper into Jekyll

This is the third post of the [Building the Blog][] series which will cover
some more configurations to Jekyll. 

<!-- more -->

Jekyll versus others
--------------------

Jekyll is a static site generator who uses standered web files and some other 
technics such as markdown and template to build a purely static web site. Apart from 
basic components that a template should provide, it also contains build-in support 
for blog. As we have experienced in last post, a simple markdown will be processed
 and assembled with other common page components like header, footer, etc.

For bloging, there are some other options which are quite popular nowadays. [Word Press][] 
is a representation. There is no doubt that it's easy and powerful. However, as a dynamic 
web application, it use PHP as script language, MySQL as its database, and lots of other 
complicated technics. Even if you haven't written any thing by yourself, the framework itself
have exhausted 10 megebytes or so. What's more, after using it as bloging tool
 for a while, you may still can find where your posts are and how to change or migrate them.
And the dynamic script alse slow down response speed of your site, and lots of people use 
third-party add-ons to cahce a copy of static version.

In the world of Jekyll, there is no need to understand, configure, manage database, PHP engine
as well as a web server. All of the bases have been bundled up yet in Jekyll. And what your role
is use your favorite text editor write every elements for a blog, which means full control and customzability. As your personal blog, it makes no sense to do this work by others.
As for Jekyll, it job is to subsititute, concat, move, arrange your fragments and contents to make 
a standered web site. 

I personally perceive that blog is something that derived from log which is a process only
perform appendation. To accompany with modern era of web, multimedia and interaction become 
basic elements of blog. Even though the core concept inherited log doesn't have any changes, 
that is static and everlasting. Except from some social interactings, the site can totally be
a static one.


Directory Structure
-------------------

To let Jekyll recongnize your site structure, you should follow some basic conversions. And though 
the default directories can be modified via configurations, I personally strongly unrecommend it, 
which in most cases have no benifits but a more messy and wired struscture.

First, lets look at the official scaffold's directories. (With a "Hello World" post)

```
# Generated by `tree`
.
├── about.md
├── _config.yml
├── css
│   └── main.scss
├── feed.xml
├── _includes
│   ├── footer.html
│   ├── header.html
│   └── head.html
├── index.html
├── _layouts
│   ├── default.html
│   ├── page.html
│   └── post.html
├── _posts
│   ├── 2015-09-06-hello-world.markdown
│   └── 2015-09-06-welcome-to-jekyll.markdown
├── _sass
│   ├── _base.scss
│   ├── _layout.scss
│   └── _syntax-highlighting.scss
└── _site
    ├── 2015
    │   └── 09
    │       └── 06
    │           └── hello-world.html
    ├── about
    │   └── index.html
    ├── css
    │   └── main.css
    ├── feed.xml
    ├── index.html
    └── jekyll
        └── update
            └── 2015
                └── 09
                    └── 06
                        └── welcome-to-jekyll.html

16 directories, 22 files
```
As you can see, except from the _config.yml, all of other files are all you\'v
been familiar with, as a web developer (If not, it still doesn't matter too much).
Another thing that seems not very common is the underscroe ( "\_" ) in the beginning of some
files or directories. 

Let's explain it now. File extension yml (or yaml) is generally a [YAML][] file, which is 
a notation system that makes serialization easy while maintains outstandingly higher
human readability. By some extend, it has something in common with JSON ( which I think
you are more farmiliar with). However, YAML\'s syntax is relatively more complex which brings 
more expressiveness and extendabilities. In our case, we don't need to fully comprehense 
it. Only a small subset of the full Yaml is commonly used in Jekyll's configurations, and 
benifited from its readability, you can easily do your modifications. To use Jekyll,
 you simply need to know that the role of _config.yml is to do some global-wide control. In later
section, I will cover some content of it. For further information about YAML, you can refer to 
its [official site][YAML].

Next things are those files and directories with a lead underscroe. In Jekyll, those files or
directories have special meaning and use to Jekyll process engine and will not be directly copied
to output directory( Actually, as you may have already known, the output directory is also a 
underscroe started one which by default named as _site ). In the represented directory tree,
there are five underscroe started folders. Apart from them, there are also some folders you may 
use or see in the future. Summarized as the following list:

* `_layouts`: page layout or also known as template
* `_includes`: common components or fragments that can be included in other pages
* `_posts`: the core
* `_sass`: scss or sass style files which will be compiled during site generating
* `_site`: default place for generated size
* `_draft`: you can store some unfinished post here
* `_data`: a place for site wide data
* ... ...

All of the files or folders that are not mentioned above will be processed and copy to
 `_site` ( or other place specified by you ). Notice that other files are not
  directly copied to destination. They will be parsed and processed, and pay attention to
this point.

Basic Configuration
-------------------

For a single post, there are some other factors that affected to its final rendered result
besides its actual content. One is a global configurations stored in the special file
 `_config.yml` and another is the in-file configurations in a form called front matter. 

The first place, the global config file, has a relatively lower prority, while at the same 
time it will also control the consistancy of the whole site and can easily be cahnged or
updated. It has two kinds of content. The first kind is some pre-defined identifiers that
 has special meanings and control the action that Jekyll actually performace. Such as a
item `highlighter` will decide which highlighter program will be invoked during site
generating process. The last kind is some customed identifiers which you can use in other place
of the site. A typical example of this kind is a `title` item which you can add it in every
template (or layout) file. Once you would like to do some change to this field. You don't need to change it in each specific template. What you need is only change the configuration file.
And what's more, with the process engine, you can also do some modifications to the original 
value you set in the config file, which let it can suit for more cases.

The second place, the so-called front-matter, has a relatively higher prority which means it
can overwrite the global one when some exceptions require to do so. Besides, it also the place
where the blog post mete data should be placed suce as a post's title, author, permalinks, etc.
In syntax filed, you should add triple dashes ( "---" ) before and after those front-matter
 at the very beginning of the post. One more thing, the front-matter can not only be used in posts,
 but also can be used in anywhere in the site. For those file outside of the `_posts` directory,
 this is a requirement to let a proper process program generate expected things. (Also out of
exactly the same reason that sometimes you need to add a null front-matter in some file's beginning).
Pay attention that the front-matter must be placed at vary front, the start of a valid
 plain-text file.

[Building the blog]: /series/Building-the-blog

[YAML]: http://yaml.org/

[Word Press]: https://wordpress.org/