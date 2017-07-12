---
title: Configure ROS Environment
date: 2017-07-07 00:33:42
comment_id: 20170707-ROSENV
tags:
---

* base: raw Ubuntu 16.04.2 amd64
* ROS release: Kinetic

<!-- more -->

## Configure package source ##
1. configure source
    - Official source
    ```bash
    sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
    ```
    - Mirror for China
    ```bash
    sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.ustc.edu.cn/ros/ubuntu/ $DISTRIB_CODENAME main" > /etc/apt/sources.list.d/ros-latest.list'
    ```

2. set up keys 
    ```bash
    sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
    ```

3. install packages
    - individual package
    - base packages
        core package, build tools, ros
    - desktop package 
    - full installation 


Notice:
* ensure various kinds of sources are of Ubuntu source are configured, including `restricted`, `universe` and `multiverse` (which are selected by default)
* other mirrors are listed at [Mirrors](http://wiki.ros.org/ROS/Installation/UbuntuMirrors)

## Initialize ROS Kinetic ##
1. 

http://wiki.ros.org/kinetic/Installation/Ubuntu
http://wiki.ros.org/ROS/Tutorials
http://wiki.ros.org/ROS/Tutorials/InstallingandConfiguringROSEnvironment
http://wiki.ros.org/ROS/Tutorials/NavigatingTheFilesystem