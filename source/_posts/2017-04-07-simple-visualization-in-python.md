---
title: Simple Visualization in Python
date: 2017-04-07 18:44:58
comment_id: 20170407-PYVISUAL
tags:
  - python
  - visualization
---

Visualization of data or graph can be achieved by a variety of means in Python. This post list 
configuration for some simple visualizations. Before introduction of some visualization package,
I'll list some procedures for configure and launch the Jupyter notebook, which is a convenient
environment for testing Python code.

<!-- more -->

Jupyter, the playground
-----------------------

Jupyter, formerly the known as `iPython` (actually, the ipython becomes 
a submoudle of the Jupyter project which provide the kernel for computing),
is a notebook style environment for exploring some new package or new task in Python.


### Installation

With the pip installed, jupyter can be installed easily via the following 
command. (If the pip is not set up, you can check out the previous post.

```bash
sudo -H pip3 install jupyter

# if the official pip server is too slow to access, refer to 
# the next sub-section for mirror server configuration. 
```

### Installation via mirror pip server

Add the following configuration entry into default configuration file. 
Generally, this file is located on Linux. Create the file if this file does not eixst.

```txt
# Set the global mirror
[global]
index-url = https://pypi.python.org/simple
```

A comprehensive list of the available mirror server can be retrieved from the 
[PyPI Mirror Status](https://www.pypi-mirrors.org/) site. The replace the url 
within the configuration entry. (Don't forget the path section `simple` of the URL).

For more information related to the configuration of pip, check out the 
[configuration section](https://pip.pypa.io/en/stable/user_guide/#configuration) of official document.

There is also an approach for temporarily applying the mirror server, which is passing
the location of the mirror server to `pip` command argument. Like the following command shows:

```bash
sudo -H pip3 install jupyter -i https://pypi.python.org/simple
```

### Start the notebook

The following command will start an server at `8889` port (by default) and launch the default 
browser to access the web interface.

```bash
jupyter notebook 
```

If you want a remote access of the web interface, use the following options to disable the launching of browser and bind TCP connection to any network interface available.

```bash
jupyter notebook --no-browser --ip=0.0.0.0
```

PyGraphViz
----------

[GraphViz](http://www.graphviz.org/) is a open source application for visualization of graph.
It can generate high quality graph by simply specifying the vertices and edges, without worrying 
about the layout of each element in the graph. 

[PyGraphViz](https://github.com/pygraphviz/pygraphviz) is a python bonding of the package.

```bash
# install grahpviz (on Ubuntu 16.04)
# the dev package is also required to compile native binding
# while installing the pygraphviz
sudo apt-get install graphviz graphviz-dev

# install pygraphviz
sudo -H pip3 install pygraphviz 
```

PyDot
-----

PyDot is another binding to GraphViz in Python with special attention on the Dot engine 
of GraphViz. (Thus the package is named as PyDot.) I plan to record something about that 
small language in the next post.

```bash
# The same dependencies required as PyGraphViz
sudo -H pip3 install pydot
```
