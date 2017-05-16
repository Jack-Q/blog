---
title: Setup LaTeX environment
date: 2017-03-26 14:38:07
comment_id: 20170326-LATEX-SETUP
tags:
  - tex
  - installation
---

After a reinstallation of ubuntu in last month, the original installation
of texlive 2015 was gone. As the 2016 release of texlive is already available 
to use, I decided to install the newer version on Ubuntu 16.04 LTS. This 
post records the steps of installation as well as some other 
configurations to several dedicated components.


<!-- more -->

Configure package source for backported packages
------------------------------------------------

The package repository of Ubuntu provides the full collection of 
texlive. However, the package are never updated to a newer release after
the specific Ubuntu version is released. To use a more recent release 
of texlive, some other sources are required.
A [PPA](https://launchpad.net/~jonathonf/+archive/ubuntu/texlive-2016) 
created by jonathonf is available to get the texlive 2016 installed 
from package manager on LTS version of Ubuntu.

```bash
sudo add-apt-repository ppa:jonathonf/texlive-2016
sudo apt-get update

# the total package size of this full meta package 
# is more than 2 GiB.
# install `texlive' package for the core packages
sudo apt-get install texlive-full

# waiting the installation process to finish
# retry if some packages are filed to download

```

Since this is a backported package, the original version 
in ubuntu repository can be found at Yakkety repository 
(Ubuntu 16.10). Refer to [texlive-base](https://launchpad.net/ubuntu/yakkety/+source/texlive-base).

Configure an environment for editing
------------------------------------

When composing document with latex, most of things are done within a 
text editor. Some plugins to the text editor can provide various of 
assists. My favorite environment for editing latex is Sublime Text with 
the [LaTeXTools package](https://latextools.readthedocs.io/en/latest/).

The installation of LaTeXTools is just the same as other Sublime Text packages.
Either copying the package file to user configuration folder or manage the 
package of plugins via Package Control is supported.

To preview the generated pdf document from the source of document, the 
recommended viewer in Linux is `evince`, which can be synchronized with 
the current position of editing cursor.

To improve the compatibility of compiling, a common practice is add magic comments 
at the beginning of document to specifying some requirement of this document.
The following codes provide some hints to the compiling environment about the 
engine to use and the options for the compiling engine. These magic comments 
should be placed at the initial of a document.

```tex
%!TEX program = xelatex
%!TEX option = -shell-escape -8bit
```

Add common fonts to system
--------------------------

When composing a document with some personal styles, the customization of 
font is always a must. Since most of font available online
are in the format of `ttf` or `otf`. To use them within document, a simple 
approach is install the font to system and then importing them by their
canonical name packaged with the font file.

To install font in Linux, I prefer the approach to copy them to a user specific 
folder and update the system font cache. The standard locations for system font 
in Linux include `/usr/share/fonts`, `/usr/local/share/fonts`, and `~/.fonts`, 
which can be configured via `/etc/fonts/fonts.conf`. For personal usage, just 
copy font files to the last folder. After the preparation of disk files,
an extra step is required to active these font, which is to refresh the font cache
by invoking the `fc-cache` command.

To use system font in latex document, first include the `fontspec` package, then define
the font name of different document component accordingly. The following code snippet reset the 
main font to Times New Roman, and the monospace font (for source code) to Monaco.

```tex
\usepackage{fontspec}
\setmainfont{Times New Roman}
\setmonofont{Monaco}
```

Configure Pygments for code block
--------------------------------

To test the status of the configuration, I tried to compile 
some documents edited before. However, some document failed 
to compile out of the lack of the Pygments python package which 
is used to highlight code section with in a document.

Since Pygments is a python package, it is recommended to manage 
them via the pip package management. The following commands on ubuntu 
ensure the pip to be configured. (The package to be installed is
for python 2, while another package named `python3-pip` is available 
in repository for python 3.)

```bash
# install package
sudo apt-get install python-pip

# upgrade pip itself
sudo -H pip install --upgrade pip
```

Then install Pygments with pip:

```bash
sudo -H pip install pygments
```

With `pygmentize` command in path, some macro package in TexLive can highlight
program code in document in the style of Pygments. For example, the folloing 
code use `minted` macro to render a section of code with syntax highlighted:

```tex
\begin{minted}[autogobble, obeytabs, resetmargins, fontsize=\footnotesize]{shell}
  make
  make test
  make install
\end{minted}
```
