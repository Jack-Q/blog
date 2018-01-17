---
title: npm peer dependency
date: 2017-12-10 11:15:35
comment_id: 20171210-NPMPRDEP
tags:
  - javascript
  - npm
categories:
  - frontend
---

npm is the package management system of node (while there are some alternatives
for npm client), which can virtually always deliver the right and
well encapsulated third-party module for your application by using `dependencies`
and `dev-dependencies` declarations. However, this mechanism may introduce other 
problems in some other cases.

We all are familiar with the module and dependency management in
the nodejs ecosystem. When constructing an new application, 
we can always consume third party packages by depending on them,
meanwhile they all are just working perfectly, which is npm in the back
to handle the annoying and complex versioning issues.

<!-- more -->


reference: blog post at nodejs https://nodejs.org/en/blog/npm/peer-dependencies/
reference: stack overflow answer https://stackoverflow.com/questions/26737819/why-use-peer-dependencies-in-npm-for-plugins