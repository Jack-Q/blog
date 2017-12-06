---
title: Build Android from source
date: 2017-11-09 02:46:41
comment_id: 20171109_AOSP01
tags:
  - Android
  - AOSP
categories:
  - Android
---

Android is a popular operating system as well as a comprehensive ecosystem.
A shining feature of Android ecosystem is its openness, that is the whole system
(apart from some hardware relevant IP and propriety Google services) is virtually
open. We can learn from the platform as well as contribute our endeavour. To begin
this journey, getting a copy of the system and build them in your own environment 
is just the very first step.

<!-- more -->

## Environment requirement


## Get the source

The whole system is a 

### the `repo` tool

* init: initiate a development environment

```bash
repo init -u https://android.googlesource.com/platform/manifest
repo init -u https://android.googlesource.com/platform/manifest -b android-4.0.1_r1
```

* sync: fetch or update remote packages according to manifest

```bash
repo sync
repo sync -j8 -c
```

### 

## Build and install



## 

