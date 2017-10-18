---
title: Create C++ OpenGL Project with CMake
date: 2017-09-22 00:15:00
comment_id: 20170922-GLCMAKE
tags:
  - cmake
  - opengl
categories:
---

OpenGL is a graphic API that defines an interface between modern graphic hardware 
and various performance demand applications. To build application with OpenGL,
there are still a plenty of problems need to resolve, including the version of 
OpenGL, window management, dependency management, etc. In this post, a sample 
application development environment will be set up, using CMake as build tool.

<!-- more -->

## Graphic Processing, Graphic API and OpenGL

OpenGL is a set of graphic API that imposes the capability of modern graphical 
techniques. For most of computers with support for graphic display, a dedicated 
processing unit (either integrated into central processing unit/chip or connected 
via some sort of linkage, or even both) is presented for graphics related tasks.
And apart from vender specific programming interface which can be used directly via
the driver software of the graphic processor, most of programs trend to use more
neutral interface to support a large range of devices.

To satisfy this requirement, some interface provided by operating system or library
is an appealing alternation, yet these kinds of interfaces trend to tackle more general 
graphical tasks and hide the detailed and low-level primitives in graphic area. 
For instance, when handling windows of desktop programs, rendering the UI element,
state transition animations, and managing the buffer of various graphic primitives
are generally done by operating system (like on Windows) or a lower level abstraction
(like on X window system). For most of program, this mechanism is sufficient as well
as efficient. However, for certain types of applications like video games or 3D modeling 
program, this extra layer between program and graphic processing unit results in more
trouble than convenience.

Thus some vender-independent dedicated graphic API was introduced by some groups. 
Khronos proposed the OpenGL (Open Graphic Library) is one of the API and the 
industrial standard in this field. For Windows, Microsoft proposed Direct3D API, with 
the same purpose, which is exclusive to Windows platform. Besides the standard OpenGL API, 
some specialized version of API is also proposed by Khronos for embedded system (OpenGL ES)
and the web platform (WebGL, within the browser context). By using OpenGL or other graphic
API, program can invocate hardware accelerated graphic operation on supported platform
without extra overhead while maintains portability and compatibility on various software/hardware 
environment, which is achieved by using a software implementation as a graceful degradation.

## GLFW: the Context Provider

OpenGL is supported by various operating systems which empowers the portability of programs.
However, OpenGL is merely an graphic interface, which generally provides a context for 
program to rendering graphics. Thus the programmer is responsible to handle 
the creation of OpenGL context and interact with the end user, which is still 
a hell of variations of operation systems. To address these kinds of problem, 
an lightweight library named GLFW (Graphic Library FrameWork) represents a handy solution by 
encapsulating differences in between. 

To setup an working playground for an OpenGL based graphic application, the documentation of 
[GLFW](http://www.glfw.org/) provides a clear tutorial covers various details of the library by 
guiding the audiences to construct a working application. I have created one using CMake as 
building system, which is available at [Jack-Q/graphic-playground](http://github.com/Jack-Q/graphic-playground).
In later section of this post, I would talk more about the detail of the configuration of this program.

Apart from GLFW, there are some other alternations available to choose from.
* SDL ([libsdl.org](https://www.libsdl.org/)): SDL provides a interface for a larger range of 
hardware resources than GLFW and . This is a more appropriate alternation than GLFW for larger applications.
It uses OpenGL as an option of back-end (also support GDI and Direct3D on Windows) and provides its own API.
* Qt ([qt.io](https://www.qt.io/)): Qt is a comprehensive solution of cross-platform application, which also
contains supporting mod

## Glad: the Generator of Loader

Even though OpenGL API is standardized, there are still various technical details that need to pay attention to
in order to create a context that the right version of OpenGL API is dynamically loaded or statically linked to.
With consideration to the difference of library management and driver management (or kernel modules), these kinds
of initialization task is not easy to handle properly, yet it is common to most applications. As mentioned in the 
[FaQ document of GLFW](http://www.glfw.org/faq.html#why-doesnt-your-glh-have-the-functions-i-need), it hard to link 
desired version of OpenGL directly into program. Thus we need to use OpenGL loader to handle the problem.

[Glad](https://github.com/Dav1dde/glad) is a awesome solution in python which generate loader source file from 
the official Khronous-XML specification. On platform with `pip` installed, install `glad` package and then use
the `glad` command to generate the loader source, which is shown as follows.

```bash 
# Install glad via pip
pip install --user glad

# generate loader files at 'vender/glad' in C/C++ format to load latest OpenGL API
glad --no-loader --generator c --out-path vendor/glad
```

After the generation of loader source, include the header file "glad.h" (located at `vender/glad/include/glad/glad.h`)
into program then the OpenGL API becomes accessible.


## CMake: the Building Tool

CMake is a tool for cross-platform to setting compilation property, manage &amp; resolve dependencies, 
and generate configuration file for platform specific building systems like Gnu Make, Visual C++ 
Project, etc. It provides comprehensive document on its web site, which can be used as reference
at [cmake.org](https://cmake.org/documentation/). In general, CMake is configured using a set of 
`CMakeList.txt` files, which mainly specifies the following contents.

 * requirements to CMake version;
 * references to other CMake modules;
 * project name;
 * configurable options of current project;
 * variables/constants to control building procedure;
 * dependency specification and including;
 * generated files (template, parameters, etc)
 * compilation unit and related files;
 * ...

After creating sample application based on the GLFW library, it still requires lots of proper setups 
to make it alive, which is exactly the problem that CMake addresses. For the sample OpenGL program, 
the [`CMakeList.txt`](https://github.com/Jack-Q/graphic-playground/blob/master/CMakeLists.txt) is 
available at the root directory of the Git repository with detailed comments for each sections.

In the CMake configuration, it use `configure_file` macro to inject the version number into the source 
code, which takes a template file [`version.h.in`](https://Jack-Q/graphic-playground/blob/master/src/version.h.in) and replaces version placeholders with actual version number. 
