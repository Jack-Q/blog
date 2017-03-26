---
title: Setup R environment
date: 2017-03-25 13:08:52
comment_id: 20170325-R-SETUP
tags:
  - R
  - installation
---

This post is to record the configuration steps of the R environment, 
which is a language as well as an eco-system for statistics and related 
computing and graphing. With the CRAN platform for sharing and exploring
extra package of R, the capibility of the R language is much more extented.

<!-- more -->

R package installation steps
----------------------------

The target system of following steps is Ubuntu 16.04 (`xenial`). Apart from 
its code name which apeared in second step, most of the steps can also be
applied to other version of ubuntu. 

1. Add key of CRAN repository to system apt key store

  ```bash
  sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
  ```

2. Then add the R package entry to apt source list

  In this step, we can specify approprate mirror site to speed up package installation process.
  A full list of registered mirrors can accessed from [CPAN's website](https://cran.r-project.org/mirrors.html)

  ```bash
  # use the official repository
  sudo add-apt-repository 'deb [arch=amd64,i386] https://cran.r-project.org/bin/linux/ubuntu xenial/'

  # or use an alternate source
  sudo add-apt-repository 'deb [arch=amd64,i386] https://mirrors.ustc.edu.cn/CRAN/bin/linux/ubuntu xenial/'
  ```

3. Update package list cache and install R package

  ```bash 
  sudo apt-get update
  sudo apt-get install r-base-dev
  ```

4. Configure mirror selection of R package and its local storage location

  At the startup time of R, two configuration file will be checked. One is the 
  `Rprofile` file (including its global version and the user-specific one) for 
  startup configuation written in R, and another is the `Renviron` file
  (including its global version and the user-specific one as well) for program
  wide system environment variables represented as key-value pairs.

  The default local storage of R package is a global path which generally require
  the permission from root user to modify. Hence a local package storage is 
  more convenient.
  ```bash
  touch ~/.Renviron
  mkdir -p ~/lib/R/library
  echo 'R_LIBS_USER="~/lib/R/library"' >> ~/.Renviron
  ```

  The `Rprofile` can contain more items. The following configuration set the mirrors of 
  CRAN packages.

  ```R
  # ~/.Rprofile
  options("repos" = c(CRAN="https://mirrors.xjtu.edu.cn/CRAN/"))
  ```

R Studio
--------

The most popular free and open source IDE for R is R Studio, which can be 
installed by downloading its debain package and install via `dpkg`.

```bash
# find the latest version of R Studio at 
# https://www.rstudio.com/products/rstudio/download/

# Current lastest version is 1.0.136
wget https://download1.rstudio.org/rstudio-1.0.136-amd64.deb -O ~/RStudio.deb
sudo dpkg --install ~/RStudio.deb 
```

So far, a simple environment of R is setup.
