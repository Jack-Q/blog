---
title: the first taste of R
date: 2017-03-30 00:03:36
comment_id: 2017-03-30 00:03:36
tags:
  - R
---

R Packages intro

## devtools

It is just the package that makes the experience with package more wonderful!

Links: 
* [CRAN Registery](https://cran.r-project.org/package=devtools)
* [GitHub Repository](https://github.com/hadley/devtools)

## Slidify

Use R to create a pretty and fancy slides from Markdown.

This package is not published to CRAN, thus the recommended approach to install 
this package is use the [`devtools` package](#devtools).

```r
# with devtools installed
require(devtools)

install_github("ramnathv/slidify")
install_github("ramnathv/slidifyLibraries")
```