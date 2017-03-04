---
title: JavaEE Training Note - Day 06
date: 2017-02-25 09:52:43
comment_id: 20170225-JEENOTE-06
tags:
---

Today's topic is configuration management which is mainly the source code management and versoin control.
One of the famous solution for source code management is the `Subversion` (abbr. svn),
a centralized version control system. It is common in enterprise development with an always-on
central configuration management server as an authority (the `trunk`). Another popular solution is 
`git`, a de-centralized version control system. It is common in open source project development and each 
contributor can hold their own branch.

<!-- more -->

Subversion
----------
Subversion itself is a project with long history. It is consindered as the most accepted implemention 
of the source code management tool with a central server. Each user development their code base in a local 
machine and then commit to the central server. When the source code contains conflit with the center server, 
that is the source code to be committed into the server has modification to the updated code in the server,
the user must address the conflict and resolve is before it can be accepted. Once the developing machine 
cannot access the center server, the source code cannot be commited.

### Command line interface 

The simple usage of Subversion is using the command line utility, which can be acquired via package 
management of system (apt, yum, brew, etc.). After the installation, use the `svn` command to perform the 
following action.

To get the source code from the center code, use the  `checkout` command.
```bash
svn --username <user> --password <pass> checkout <server-address>
```
Here, the authentication is performed by command line argument, which can also be down by configure 
the subversion configuration file. 

After update the source code, modification can be committed into the center server. 
In this case use the following command.
```bash 
svn --username <user> --password <pass> commit -m <commit description>
```

### IDE integration

As a wide used toolkit, most IDE can be configured to checkout source code form the 
central server and then push commit to it in graphic user interface.

Git 
---
Git is originally designed and developed by Linus to manage the large code base of the Linux system.
The main difference from Subversion is the de-centralized design. Another feature is the light-weight 
branching which leads the massive usage of branch in the Git pattern. GitHub is one of the largest 
and socialized open source project hosting platfrom, which use git as its core and popularized the usage 
of git. 

### CLI

Git is provided as a command line tool `git`, which is like the `svn` command. However, since the 
Git is de-centralized, the `git` is not a client of Git but the whole program which can perform both 
the role of client and the server. A genral usage of git is represented as following:

* `git init`: create a Git reporitory in current directory;
* `git add <files>`: add file to Git in order to be managed by Git;
* `git commit -m <message>`: commit the modification as a version;
* `git push <dest> <branch>`: push the local branch to the remote reporitory;
* `git checkout -b <branch>`: create and checkout the new branch based on current branch;
* `git clone <reporitory>`: create an clone of a git reporitory;
* ...

### IDE integration

As Subversion, most IDE also provide the support to Git.
