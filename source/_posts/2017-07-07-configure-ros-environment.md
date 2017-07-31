---
title: Configure ROS Environment
date: 2017-07-07 00:33:42
comment_id: 20170707-ROSENV
tags:
    - ros
---

ROS, the robot operation system, is a flexible environment for writing robot software.
It is not a traditional operating system but a software development framework including
a collection of tools, libraries, and conventions to manage and reduce the complexity 
of robotic systems.

The following configurations are based on the following environment.
* base: raw Ubuntu 16.04.2 amd64
* ROS release: Kinetic (to be installed)

<!-- more -->

## Configure package source and install packages ##

1. configure source
  
  Add `apt` package source list to system and use `apt` tools to manage ROS packages.

  * Official source
    ```bash
    sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
    ```
  * Mirror for China
    ```bash
    sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.ustc.edu.cn/ros/ubuntu/ $DISTRIB_CODENAME main" > /etc/apt/sources.list.d/ros-latest.list'
    ```

2. set up keys 

    ```bash
    sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
    ```

3. install packages

  * individual package

      ROS packages are named with prefix `ros-<version>` (for current version, that is 
      `ros-kinetic`). Find package and get detail description of specific package using
      `apt` tools, like `apt show`, `apt-cache search`, etc. 

      ```bash
      sudo apt-get install ros-kinetic-<package name>
      ```

      Some packages of ROS are not included in any meta package and this is the only approach to install them.

  * base packages

      core package(communication tools), build tools as well as other bare bone
      packages. No GUI packages are included.

      ```bash
      sudo apt-get install ros-kinetic-ros-base
      ```

      This is generally a recommendation for robot itself or computer without GUI enabled (using tty to interact with).

  * desktop package 

      Include some of common GUI packages for desktop usage, also include full package 
      list of base package.

      ```bash
      sudo apt-get install ros-kinetic-desktop
      ```

  * full installation 

      Include most components provided by ROS. This option is recommended for 
      development on top of ROS infrastructure.

      ```bash
      sudo apt-get install ros-kinetic-desktop-full
      ```

      (This is a huge list of packages, thus prepare a decent network environment and
      be patient to wait for the installation steps.)


  The following content of this post is based on a full installation of ROS packages (using meta-package `ros-kinetic-desktop-full`).

Notice:
* ensure various kinds of sources are of Ubuntu source are configured, including `restricted`, `universe` and `multiverse` (which are selected by default);
* other mirrors are listed at [Ubuntu Mirrors](http://wiki.ros.org/ROS/Installation/UbuntuMirrors) page of ROS wiki.

## Initialize ROS Kinetic ##

After package installation, `rosdep` utility should be initialized before using ROS package, which can be done by
following commands.

```bash
sudo rosdep init
rosdep update
```

In more detail, `rosdep` utility assists end user to manage system dependencies required by an specific ROS package.
When compiling a ROS package from source which requires external packages other then ROS itself, `rosdep` can be used 
to configure system properly with dependencies installed. Currently, `rosdep` is a separated command line tool from ROS 
core packages (though generally, it will be installed when processing meta packages listed above).
For more information about `rosdep`, refer to [`rosdep` document site](http://docs.ros.org/independent/api/rosdep/html/).

## Setting up environment ##

Then, when launch ROS packages and interact with ROS node with various ROS utilities, a lot of command are 
required. To assist user input long names of various parameters, ROS provides auto-complete feature support
for most widely used shell (`bash`, `zsh`, etc).

To config shell auto-complete for `bash`, add the following item to `~/.bashrc`.
```bash
source /opt/ros/kinetic/setup.bash
```
Or use bash script to configure this item:
```bash
echo "source /opt/ros/kinetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

To config shell auto-complete for `zsh`, add the following item to `~/.zshrc`.
```bash
source /opt/ros/kinetic/setup.zsh
```
Or usr zsh script to configure this item:
```bash
echo "source /opt/ros/kinetic/setup.zsh" >> ~/.zshrc
source ~/.zshrc
```


## Install additional packages ##

The packages installed above are those required to run core modules. When create new modules 
or explore modules by others provided in source code, compiling ros package is a required process.
Thus, the following additional packages are required for configure a development environment 
of ROS.

```bash
sudo apt install python-rosinstall python-rosinstall-generator python-wstool build-essential
```
