---
title: DOT language for graph
date: 2017-05-30 22:57:26
comment_id: 20170530-GRAPHVIZ-DOT
tags:
    - GraphViz
    - visualization
---

GraphViz package is a set of tools to describe, automatically layout and manipulate graphs, which 
is of great significance in connection and relationship analysis and illustration.
The core module of GraphViz is the layout and render engines which generate 
neat and elegant visualization of graph in various common formats from 
a descriptive small language (the graph file language or the *DOT* language). This post will represent a brief introduction
of the DOT language and show some applications that utilize the power of GraphViz.

<!-- more -->

## GraphViz &amp; DOT: Hello World

First section of this post, let's create a simple graph via GraphViz in DOT language.

Create a plain text file with the following content and save it as `g.dot`.

```c
// File: hello-world.dot
// a directed graph with two nodes

// create a directed graph
digraph {
    // an directed edge from "Hello" to  "World"
    Hello -> World;
}
```

Then use `dot` command to convert the dot file to a visual graph. The `dot` command
is part of the `graphviz` package which can easily be installed via package managers in
most of Linux Distributions. (For example, use `sudo apt install graphviz` in Ubuntu or its derivations.)

```bash
# create g.svg at the same folder of the source file
dot 'hello-world.dot' -Tsvg -O
```

By default, the graph of `hello-world.svg` will look like the following one.


<svg  style="max-width: 130px;margin: auto;display: block;" viewBox="0.00 0.00 75.59 116.00" >
    <g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(4 112)">
    <title>%3</title>
    <g id="node1" class="node"><title>Hello</title>
    <ellipse fill="none" stroke="black" cx="33.797" cy="-90" rx="30.5947" ry="18"/>
    <text text-anchor="middle" x="33.797" y="-86.3" font-family="Times,serif" font-size="14.00">Hello</text>
    </g>
    <g id="node2" class="node"><title>World</title>
    <ellipse fill="none" stroke="black" cx="33.797" cy="-18" rx="33.5952" ry="18"/>
    <text text-anchor="middle" x="33.797" y="-14.3" font-family="Times,serif" font-size="14.00">World</text>
    </g>
    <g id="edge1" class="edge"><title>Hello&#45;&gt;World</title>
    <path fill="none" stroke="black" d="M33.797,-71.6966C33.797,-63.9827 33.797,-54.7125 33.797,-46.1124"/>
    <polygon fill="black" stroke="black" points="37.2971,-46.1043 33.797,-36.1043 30.2971,-46.1044 37.2971,-46.1043"/>
    </g>
    </g>
</svg>

This is much easier to make simple graph in this method then drawing them manually on
either a piece of paper with pencil or canvas of a drawing program with mouse.

## Syntax

After the first example, let's have a more specific introduction about the DOT language 
by creating some simple graphs.

The syntax of the DOT language is quite simple, since all you need to specify in order to 
fully describe a graph are the nodes (the vertices) as well as the edges in between.
Thus in DOT language, a typical graph is also specifying these entities.

```c
// Specify the type and an optional name of graph 
// The type including graph (undirected graph) and digraph (directed graph)
graph G { 
    // list the attributes of the graph
    name=val;

    // list nodes and its attributes
    // If the default attributes are applicable, the declaration can be omitted
    A [name=val];
    B [name=val];

    // the "node" represent the default attributes for all of the nodes from this line
    node [name=val];

    // a link between A and B (no direction, only valid in undirected graph)
    // the options are optional
    A -- B [name=val];

    // multiple connections can chain together
    B -- C -- D;
    // several nodes connect to one node can be represented as a group
    {A, B} -- {C, D} -- {E, F};

    // a directed link from A to B (an arrow pointing to B, only valid in directed graph)
    A -> B [name=val];
}
```


## Configuration &amp; Customization

This section lists some simple attributes used to adjust nodes and edges. A complete list can 
refer to the [official document](http://www.graphviz.org/content/attrs).

### Node properties

* `shape=name`: the shape of the node. a full list is available at [Node List](http://www.graphviz.org/content/node-shapes);
* `width=d` and `height=d`: specify the size of node;
* `style=filled`: whether the node is filled, use `style=""` to clear the fill;
* `label=text`: the label of the node, can also be simple HTML code for a flexible content;
* `color=c`: the color or the outline of the shape or the edge, like `color="#0091cc"` or `color=red`;
* `fontcolor`: the color of text;
* `fillcolor`: the filled color of the node;

### Edge properties

* `style=dotted|dashed|bold|solid|none`: the line style of an edge;
* `arrowType=normal|vee|dot|odot|empty`: the arrow style of an directed edge, a full list is 
available at [Arrow List](http://www.graphviz.org/content/attrs#karrowType);
* `label`: the label of the node;
* `color`: the color of the edge;

### Layout and layout engine

Layout is the relative position of nodes in a graph.

#### layout properties

Some common options for the graph can be used to adjust the layout.
* `size="x,y"`: the maximum size of the rendered graph in inch;
* `margin=f`: the margin of the rendered graph, accounts for the size of the result (more like the `padding` property in CSS);
* `rankdir=LR|RL|BT|TB`: drawing left to right (`LR`), right to left (`RL`), bottom to top (`BT`) or top to bottom(`TB` the default option);
* `nodesep=f`: the minimum separation between nodes.

#### layout engine

So far, all of the graphs are converted via `dot` command. Apart from that, GraphViz also provides some other layout engines. A common set of engines is listed as the following table, 
while more engines may available within your installation package.

|  Name  | Description |
|:------:|:----------|
| `dot`  | drawing directed graphs |
| `neato` | drawing undirected graphs |
| `twopi` | radial layouts of graphs |
| `circo` | circular layout of graphs |
| `fdp` | drawing undirected graphs |
| `sfdp` | drawing large undirected graphs |
| `patchwork` | tree maps |

The layout engine can be selected by either the name of the command or
the `-K` command option (the latter is prior). This can also be selected via graph property
`layout` (such as `layout=dot`).


## Application

In this section, let's explore some of tricks and applications of GraphViz.

### Export to common image files

GraphViz in implemented as a open and extensible architecture. Thus, it can render the graph to 
various of targets specified by plugins. Besides, as a command line tool, the output of the application can be piped to other utilities for further processing. 

Traditionally, GraphViz support the following types： `ps` (post script), `svg`/`svgz`(scalable 
vector graphics), `png`/`gif` (bitmap file), etc. However, most packaging of the GraphViz will 
contain several extensions providing more export varieties. For a list of supported export 
target of your installation, use the `-T` option with a invalid name:

```bash
dot -T\*

# may return something like the next line, which contains quite a long list
# Format: "*" not recognized. Use one of: bmp canon cmap cmapx cmapx_np dot eps fig gd gd2 gif gtk gv ico imap imap_np ismap jpe jpeg jpg pdf pic plain plain-ext png pov ps ps2 svg svgz tif tiff tk vml vmlz vrml wbmp x11 xdot xdot1.2 xdot1.4 xlib

```

For a single file type, there may also be several supported plugins, which can be specified by
append the variety name leading by a comma, like `dot -Tpng:cairo:gd`.
Similarly, a list of supported items can be retrieved by providing a invalid variety.

```bash
dot -Tpng:\*
# sample result
# Format: "png:*" not recognized. Use one of: png:cairo:cairo png:cairo:gdk png:cairo:gd png:gd:gd
```

### Jupyter Notebook

As mentioned in previous post, there are several handy bindings of GraphViz in the world of 
Python. This sections illustrate a example of using GraphViz package for representing a 
decision tree constructed by a tree model `sklearn` package (a machine learning package).

```python
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier, export_graphviz
from graphviz import Source

# use the famous iris data set as an illustration
iris = load_iris()
model = DecisionTreeClassifier()
model.fit(iris.data, iris.target)

# construct tree (the graph viz dot file from the model)
tree = export_graphviz(model, 
                       out_file=None, 
                       special_characters=True, 
                       feature_names=iris.feature_names, # specify the feature names (petal width, petal length, sepal length and sepal length)
                       class_names=iris.target_names # specify the target names (type of iris)
                       )
Source(tree)
```
The decision tree trained from the `iris` data set is just represented within the jupyter notebook

<div class=image-container>
    <svg style="margin: auto; display: block; max-width: 700px; min-width: 550px;" viewBox="0.00 0.00 812.00 671.00">
        <g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(4 667)">
        <title>Tree</title>
        <!-- 0 -->
        <g id="node1" class="node"><title>0</title>
        <polygon fill="none" stroke="black" points="492.5,-663 352.5,-663 352.5,-580 492.5,-580 492.5,-663"/>
        <text text-anchor="start" x="360.5" y="-647.8" font-family="Times,serif" font-size="14.00">petal width (cm) ≤ 0.8</text>
        <text text-anchor="start" x="385" y="-632.8" font-family="Times,serif" font-size="14.00">gini = 0.6667</text>
        <text text-anchor="start" x="382" y="-617.8" font-family="Times,serif" font-size="14.00">samples = 150</text>
        <text text-anchor="start" x="367.5" y="-602.8" font-family="Times,serif" font-size="14.00">value = [50, 50, 50]</text>
        <text text-anchor="start" x="384.5" y="-587.8" font-family="Times,serif" font-size="14.00">class = setosa</text>
        </g>
        <!-- 1 -->
        <g id="node2" class="node"><title>1</title>
        <polygon fill="none" stroke="black" points="405,-536.5 292,-536.5 292,-468.5 405,-468.5 405,-536.5"/>
        <text text-anchor="start" x="321" y="-521.3" font-family="Times,serif" font-size="14.00">gini = 0.0</text>
        <text text-anchor="start" x="311.5" y="-506.3" font-family="Times,serif" font-size="14.00">samples = 50</text>
        <text text-anchor="start" x="300" y="-491.3" font-family="Times,serif" font-size="14.00">value = [50, 0, 0]</text>
        <text text-anchor="start" x="310.5" y="-476.3" font-family="Times,serif" font-size="14.00">class = setosa</text>
        </g>
        <!-- 0&#45;&gt;1 -->
        <g id="edge1" class="edge"><title>0&#45;&gt;1</title>
        <path fill="none" stroke="black" d="M396.826,-579.907C389.777,-568.763 382.121,-556.658 375.026,-545.439"/>
        <polygon fill="black" stroke="black" points="377.781,-543.248 369.477,-536.667 371.865,-546.989 377.781,-543.248"/>
        <text text-anchor="middle" x="363.987" y="-557.356" font-family="Times,serif" font-size="14.00">True</text>
        </g>
        <!-- 2 -->
        <g id="node3" class="node"><title>2</title>
        <polygon fill="none" stroke="black" points="570,-544 423,-544 423,-461 570,-461 570,-544"/>
        <text text-anchor="start" x="431" y="-528.8" font-family="Times,serif" font-size="14.00">petal width (cm) ≤ 1.75</text>
        <text text-anchor="start" x="469" y="-513.8" font-family="Times,serif" font-size="14.00">gini = 0.5</text>
        <text text-anchor="start" x="456" y="-498.8" font-family="Times,serif" font-size="14.00">samples = 100</text>
        <text text-anchor="start" x="445" y="-483.8" font-family="Times,serif" font-size="14.00">value = [0, 50, 50]</text>
        <text text-anchor="start" x="448" y="-468.8" font-family="Times,serif" font-size="14.00">class = versicolor</text>
        </g>
        <!-- 0&#45;&gt;2 -->
        <g id="edge2" class="edge"><title>0&#45;&gt;2</title>
        <path fill="none" stroke="black" d="M448.174,-579.907C453.742,-571.105 459.688,-561.703 465.438,-552.612"/>
        <polygon fill="black" stroke="black" points="468.484,-554.343 470.871,-544.021 462.568,-550.601 468.484,-554.343"/>
        <text text-anchor="middle" x="476.362" y="-564.71" font-family="Times,serif" font-size="14.00">False</text>
        </g>
        <!-- 3 -->
        <g id="node4" class="node"><title>3</title>
        <polygon fill="none" stroke="black" points="466.5,-425 316.5,-425 316.5,-342 466.5,-342 466.5,-425"/>
        <text text-anchor="start" x="324.5" y="-409.8" font-family="Times,serif" font-size="14.00">petal length (cm) ≤ 4.95</text>
        <text text-anchor="start" x="357.5" y="-394.8" font-family="Times,serif" font-size="14.00">gini = 0.168</text>
        <text text-anchor="start" x="354.5" y="-379.8" font-family="Times,serif" font-size="14.00">samples = 54</text>
        <text text-anchor="start" x="343" y="-364.8" font-family="Times,serif" font-size="14.00">value = [0, 49, 5]</text>
        <text text-anchor="start" x="343" y="-349.8" font-family="Times,serif" font-size="14.00">class = versicolor</text>
        </g>
        <!-- 2&#45;&gt;3 -->
        <g id="edge3" class="edge"><title>2&#45;&gt;3</title>
        <path fill="none" stroke="black" d="M460.071,-460.907C451.845,-451.742 443.037,-441.927 434.567,-432.489"/>
        <polygon fill="black" stroke="black" points="437.149,-430.126 427.865,-425.021 431.939,-434.801 437.149,-430.126"/>
        </g>
        <!-- 12 -->
        <g id="node13" class="node"><title>12</title>
        <polygon fill="none" stroke="black" points="676.5,-425 526.5,-425 526.5,-342 676.5,-342 676.5,-425"/>
        <text text-anchor="start" x="534.5" y="-409.8" font-family="Times,serif" font-size="14.00">petal length (cm) ≤ 4.85</text>
        <text text-anchor="start" x="564" y="-394.8" font-family="Times,serif" font-size="14.00">gini = 0.0425</text>
        <text text-anchor="start" x="564.5" y="-379.8" font-family="Times,serif" font-size="14.00">samples = 46</text>
        <text text-anchor="start" x="553" y="-364.8" font-family="Times,serif" font-size="14.00">value = [0, 1, 45]</text>
        <text text-anchor="start" x="556" y="-349.8" font-family="Times,serif" font-size="14.00">class = virginica</text>
        </g>
        <!-- 2&#45;&gt;12 -->
        <g id="edge12" class="edge"><title>2&#45;&gt;12</title>
        <path fill="none" stroke="black" d="M532.929,-460.907C541.155,-451.742 549.963,-441.927 558.433,-432.489"/>
        <polygon fill="black" stroke="black" points="561.061,-434.801 565.135,-425.021 555.851,-430.126 561.061,-434.801"/>
        </g>
        <!-- 4 -->
        <g id="node5" class="node"><title>4</title>
        <polygon fill="none" stroke="black" points="258,-306 111,-306 111,-223 258,-223 258,-306"/>
        <text text-anchor="start" x="119" y="-290.8" font-family="Times,serif" font-size="14.00">petal width (cm) ≤ 1.65</text>
        <text text-anchor="start" x="147" y="-275.8" font-family="Times,serif" font-size="14.00">gini = 0.0408</text>
        <text text-anchor="start" x="147.5" y="-260.8" font-family="Times,serif" font-size="14.00">samples = 48</text>
        <text text-anchor="start" x="136" y="-245.8" font-family="Times,serif" font-size="14.00">value = [0, 47, 1]</text>
        <text text-anchor="start" x="136" y="-230.8" font-family="Times,serif" font-size="14.00">class = versicolor</text>
        </g>
        <!-- 3&#45;&gt;4 -->
        <g id="edge4" class="edge"><title>3&#45;&gt;4</title>
        <path fill="none" stroke="black" d="M319.682,-341.907C302.021,-331.925 282.997,-321.172 264.957,-310.976"/>
        <polygon fill="black" stroke="black" points="266.619,-307.894 256.191,-306.021 263.174,-313.988 266.619,-307.894"/>
        </g>
        <!-- 7 -->
        <g id="node8" class="node"><title>7</title>
        <polygon fill="none" stroke="black" points="465,-306 318,-306 318,-223 465,-223 465,-306"/>
        <text text-anchor="start" x="326" y="-290.8" font-family="Times,serif" font-size="14.00">petal width (cm) ≤ 1.55</text>
        <text text-anchor="start" x="354" y="-275.8" font-family="Times,serif" font-size="14.00">gini = 0.4444</text>
        <text text-anchor="start" x="358" y="-260.8" font-family="Times,serif" font-size="14.00">samples = 6</text>
        <text text-anchor="start" x="346.5" y="-245.8" font-family="Times,serif" font-size="14.00">value = [0, 2, 4]</text>
        <text text-anchor="start" x="346" y="-230.8" font-family="Times,serif" font-size="14.00">class = virginica</text>
        </g>
        <!-- 3&#45;&gt;7 -->
        <g id="edge7" class="edge"><title>3&#45;&gt;7</title>
        <path fill="none" stroke="black" d="M391.5,-341.907C391.5,-333.649 391.5,-324.864 391.5,-316.302"/>
        <polygon fill="black" stroke="black" points="395,-316.021 391.5,-306.021 388,-316.021 395,-316.021"/>
        </g>
        <!-- 5 -->
        <g id="node6" class="node"><title>5</title>
        <polygon fill="none" stroke="black" points="113,-179.5 0,-179.5 0,-111.5 113,-111.5 113,-179.5"/>
        <text text-anchor="start" x="29" y="-164.3" font-family="Times,serif" font-size="14.00">gini = 0.0</text>
        <text text-anchor="start" x="19.5" y="-149.3" font-family="Times,serif" font-size="14.00">samples = 47</text>
        <text text-anchor="start" x="8" y="-134.3" font-family="Times,serif" font-size="14.00">value = [0, 47, 0]</text>
        <text text-anchor="start" x="8" y="-119.3" font-family="Times,serif" font-size="14.00">class = versicolor</text>
        </g>
        <!-- 4&#45;&gt;5 -->
        <g id="edge5" class="edge"><title>4&#45;&gt;5</title>
        <path fill="none" stroke="black" d="M140.091,-222.907C127.174,-211.101 113.079,-198.217 100.205,-186.45"/>
        <polygon fill="black" stroke="black" points="102.528,-183.83 92.7852,-179.667 97.8049,-188.997 102.528,-183.83"/>
        </g>
        <!-- 6 -->
        <g id="node7" class="node"><title>6</title>
        <polygon fill="none" stroke="black" points="238,-179.5 131,-179.5 131,-111.5 238,-111.5 238,-179.5"/>
        <text text-anchor="start" x="157" y="-164.3" font-family="Times,serif" font-size="14.00">gini = 0.0</text>
        <text text-anchor="start" x="151" y="-149.3" font-family="Times,serif" font-size="14.00">samples = 1</text>
        <text text-anchor="start" x="139.5" y="-134.3" font-family="Times,serif" font-size="14.00">value = [0, 0, 1]</text>
        <text text-anchor="start" x="139" y="-119.3" font-family="Times,serif" font-size="14.00">class = virginica</text>
        </g>
        <!-- 4&#45;&gt;6 -->
        <g id="edge6" class="edge"><title>4&#45;&gt;6</title>
        <path fill="none" stroke="black" d="M184.5,-222.907C184.5,-212.204 184.5,-200.615 184.5,-189.776"/>
        <polygon fill="black" stroke="black" points="188,-189.667 184.5,-179.667 181,-189.667 188,-189.667"/>
        </g>
        <!-- 8 -->
        <g id="node9" class="node"><title>8</title>
        <polygon fill="none" stroke="black" points="363,-179.5 256,-179.5 256,-111.5 363,-111.5 363,-179.5"/>
        <text text-anchor="start" x="282" y="-164.3" font-family="Times,serif" font-size="14.00">gini = 0.0</text>
        <text text-anchor="start" x="276" y="-149.3" font-family="Times,serif" font-size="14.00">samples = 3</text>
        <text text-anchor="start" x="264.5" y="-134.3" font-family="Times,serif" font-size="14.00">value = [0, 0, 3]</text>
        <text text-anchor="start" x="264" y="-119.3" font-family="Times,serif" font-size="14.00">class = virginica</text>
        </g>
        <!-- 7&#45;&gt;8 -->
        <g id="edge8" class="edge"><title>7&#45;&gt;8</title>
        <path fill="none" stroke="black" d="M363.051,-222.907C355.162,-211.652 346.588,-199.418 338.66,-188.106"/>
        <polygon fill="black" stroke="black" points="341.351,-185.847 332.745,-179.667 335.618,-189.865 341.351,-185.847"/>
        </g>
        <!-- 9 -->
        <g id="node10" class="node"><title>9</title>
        <polygon fill="none" stroke="black" points="530.5,-187 380.5,-187 380.5,-104 530.5,-104 530.5,-187"/>
        <text text-anchor="start" x="388.5" y="-171.8" font-family="Times,serif" font-size="14.00">petal length (cm) ≤ 5.45</text>
        <text text-anchor="start" x="418" y="-156.8" font-family="Times,serif" font-size="14.00">gini = 0.4444</text>
        <text text-anchor="start" x="422" y="-141.8" font-family="Times,serif" font-size="14.00">samples = 3</text>
        <text text-anchor="start" x="410.5" y="-126.8" font-family="Times,serif" font-size="14.00">value = [0, 2, 1]</text>
        <text text-anchor="start" x="407" y="-111.8" font-family="Times,serif" font-size="14.00">class = versicolor</text>
        </g>
        <!-- 7&#45;&gt;9 -->
        <g id="edge9" class="edge"><title>7&#45;&gt;9</title>
        <path fill="none" stroke="black" d="M413.704,-222.907C418.47,-214.195 423.556,-204.897 428.481,-195.893"/>
        <polygon fill="black" stroke="black" points="431.606,-197.474 433.335,-187.021 425.465,-194.114 431.606,-197.474"/>
        </g>
        <!-- 10 -->
        <g id="node11" class="node"><title>10</title>
        <polygon fill="none" stroke="black" points="448,-68 335,-68 335,-0 448,-0 448,-68"/>
        <text text-anchor="start" x="364" y="-52.8" font-family="Times,serif" font-size="14.00">gini = 0.0</text>
        <text text-anchor="start" x="358" y="-37.8" font-family="Times,serif" font-size="14.00">samples = 2</text>
        <text text-anchor="start" x="346.5" y="-22.8" font-family="Times,serif" font-size="14.00">value = [0, 2, 0]</text>
        <text text-anchor="start" x="343" y="-7.8" font-family="Times,serif" font-size="14.00">class = versicolor</text>
        </g>
        <!-- 9&#45;&gt;10 -->
        <g id="edge10" class="edge"><title>9&#45;&gt;10</title>
        <path fill="none" stroke="black" d="M431.669,-103.726C426.604,-95.0615 421.248,-85.8962 416.153,-77.1802"/>
        <polygon fill="black" stroke="black" points="419.031,-75.167 410.963,-68.2996 412.987,-78.6992 419.031,-75.167"/>
        </g>
        <!-- 11 -->
        <g id="node12" class="node"><title>11</title>
        <polygon fill="none" stroke="black" points="573,-68 466,-68 466,-0 573,-0 573,-68"/>
        <text text-anchor="start" x="492" y="-52.8" font-family="Times,serif" font-size="14.00">gini = 0.0</text>
        <text text-anchor="start" x="486" y="-37.8" font-family="Times,serif" font-size="14.00">samples = 1</text>
        <text text-anchor="start" x="474.5" y="-22.8" font-family="Times,serif" font-size="14.00">value = [0, 0, 1]</text>
        <text text-anchor="start" x="474" y="-7.8" font-family="Times,serif" font-size="14.00">class = virginica</text>
        </g>
        <!-- 9&#45;&gt;11 -->
        <g id="edge11" class="edge"><title>9&#45;&gt;11</title>
        <path fill="none" stroke="black" d="M479.331,-103.726C484.396,-95.0615 489.752,-85.8962 494.847,-77.1802"/>
        <polygon fill="black" stroke="black" points="498.013,-78.6992 500.037,-68.2996 491.969,-75.167 498.013,-78.6992"/>
        </g>
        <!-- 13 -->
        <g id="node14" class="node"><title>13</title>
        <polygon fill="none" stroke="black" points="672.5,-306 530.5,-306 530.5,-223 672.5,-223 672.5,-306"/>
        <text text-anchor="start" x="538.5" y="-290.8" font-family="Times,serif" font-size="14.00">sepal width (cm) ≤ 3.1</text>
        <text text-anchor="start" x="564" y="-275.8" font-family="Times,serif" font-size="14.00">gini = 0.4444</text>
        <text text-anchor="start" x="568" y="-260.8" font-family="Times,serif" font-size="14.00">samples = 3</text>
        <text text-anchor="start" x="556.5" y="-245.8" font-family="Times,serif" font-size="14.00">value = [0, 1, 2]</text>
        <text text-anchor="start" x="556" y="-230.8" font-family="Times,serif" font-size="14.00">class = virginica</text>
        </g>
        <!-- 12&#45;&gt;13 -->
        <g id="edge13" class="edge"><title>12&#45;&gt;13</title>
        <path fill="none" stroke="black" d="M601.5,-341.907C601.5,-333.649 601.5,-324.864 601.5,-316.302"/>
        <polygon fill="black" stroke="black" points="605,-316.021 601.5,-306.021 598,-316.021 605,-316.021"/>
        </g>
        <!-- 16 -->
        <g id="node17" class="node"><title>16</title>
        <polygon fill="none" stroke="black" points="804,-298.5 691,-298.5 691,-230.5 804,-230.5 804,-298.5"/>
        <text text-anchor="start" x="720" y="-283.3" font-family="Times,serif" font-size="14.00">gini = 0.0</text>
        <text text-anchor="start" x="710.5" y="-268.3" font-family="Times,serif" font-size="14.00">samples = 43</text>
        <text text-anchor="start" x="699" y="-253.3" font-family="Times,serif" font-size="14.00">value = [0, 0, 43]</text>
        <text text-anchor="start" x="702" y="-238.3" font-family="Times,serif" font-size="14.00">class = virginica</text>
        </g>
        <!-- 12&#45;&gt;16 -->
        <g id="edge16" class="edge"><title>12&#45;&gt;16</title>
        <path fill="none" stroke="black" d="M652.154,-341.907C667.025,-329.99 683.265,-316.976 698.06,-305.12"/>
        <polygon fill="black" stroke="black" points="700.497,-307.652 706.112,-298.667 696.12,-302.189 700.497,-307.652"/>
        </g>
        <!-- 14 -->
        <g id="node15" class="node"><title>14</title>
        <polygon fill="none" stroke="black" points="655,-179.5 548,-179.5 548,-111.5 655,-111.5 655,-179.5"/>
        <text text-anchor="start" x="574" y="-164.3" font-family="Times,serif" font-size="14.00">gini = 0.0</text>
        <text text-anchor="start" x="568" y="-149.3" font-family="Times,serif" font-size="14.00">samples = 2</text>
        <text text-anchor="start" x="556.5" y="-134.3" font-family="Times,serif" font-size="14.00">value = [0, 0, 2]</text>
        <text text-anchor="start" x="556" y="-119.3" font-family="Times,serif" font-size="14.00">class = virginica</text>
        </g>
        <!-- 13&#45;&gt;14 -->
        <g id="edge14" class="edge"><title>13&#45;&gt;14</title>
        <path fill="none" stroke="black" d="M601.5,-222.907C601.5,-212.204 601.5,-200.615 601.5,-189.776"/>
        <polygon fill="black" stroke="black" points="605,-189.667 601.5,-179.667 598,-189.667 605,-189.667"/>
        </g>
        <!-- 15 -->
        <g id="node16" class="node"><title>15</title>
        <polygon fill="none" stroke="black" points="786,-179.5 673,-179.5 673,-111.5 786,-111.5 786,-179.5"/>
        <text text-anchor="start" x="702" y="-164.3" font-family="Times,serif" font-size="14.00">gini = 0.0</text>
        <text text-anchor="start" x="696" y="-149.3" font-family="Times,serif" font-size="14.00">samples = 1</text>
        <text text-anchor="start" x="684.5" y="-134.3" font-family="Times,serif" font-size="14.00">value = [0, 1, 0]</text>
        <text text-anchor="start" x="681" y="-119.3" font-family="Times,serif" font-size="14.00">class = versicolor</text>
        </g>
        <!-- 13&#45;&gt;15 -->
        <g id="edge15" class="edge"><title>13&#45;&gt;15</title>
        <path fill="none" stroke="black" d="M645.909,-222.907C658.826,-211.101 672.921,-198.217 685.795,-186.45"/>
        <polygon fill="black" stroke="black" points="688.195,-188.997 693.215,-179.667 683.472,-183.83 688.195,-188.997"/>
        </g>
        </g>
    </svg>
</div>

Actually the variable is a plain string contains the source of the dot file. The source for the graph illustrated above is listed as follows (`sklearn` use `HTML` format to fill the content of graph):
```c
digraph Tree {
    node [shape=box] ;
    0 [label=<petal width (cm) &le; 0.8<br/>gini = 0.6667<br/>samples = 150<br/>value = [50, 50, 50]<br/>class = setosa>] ;
    1 [label=<gini = 0.0<br/>samples = 50<br/>value = [50, 0, 0]<br/>class = setosa>] ;
    0 -> 1 [labeldistance=2.5, labelangle=45, headlabel="True"] ;
    2 [label=<petal width (cm) &le; 1.75<br/>gini = 0.5<br/>samples = 100<br/>value = [0, 50, 50]<br/>class = versicolor>] ;
    0 -> 2 [labeldistance=2.5, labelangle=-45, headlabel="False"] ;
    3 [label=<petal length (cm) &le; 4.95<br/>gini = 0.168<br/>samples = 54<br/>value = [0, 49, 5]<br/>class = versicolor>] ;
    2 -> 3 ;
    4 [label=<petal width (cm) &le; 1.65<br/>gini = 0.0408<br/>samples = 48<br/>value = [0, 47, 1]<br/>class = versicolor>] ;
    3 -> 4 ;
    5 [label=<gini = 0.0<br/>samples = 47<br/>value = [0, 47, 0]<br/>class = versicolor>] ;
    4 -> 5 ;
    6 [label=<gini = 0.0<br/>samples = 1<br/>value = [0, 0, 1]<br/>class = virginica>] ;
    4 -> 6 ;
    7 [label=<petal width (cm) &le; 1.55<br/>gini = 0.4444<br/>samples = 6<br/>value = [0, 2, 4]<br/>class = virginica>] ;
    3 -> 7 ;
    8 [label=<gini = 0.0<br/>samples = 3<br/>value = [0, 0, 3]<br/>class = virginica>] ;
    7 -> 8 ;
    9 [label=<petal length (cm) &le; 5.45<br/>gini = 0.4444<br/>samples = 3<br/>value = [0, 2, 1]<br/>class = versicolor>] ;
    7 -> 9 ;
    10 [label=<gini = 0.0<br/>samples = 2<br/>value = [0, 2, 0]<br/>class = versicolor>] ;
    9 -> 10 ;
    11 [label=<gini = 0.0<br/>samples = 1<br/>value = [0, 0, 1]<br/>class = virginica>] ;
    9 -> 11 ;
    12 [label=<petal length (cm) &le; 4.85<br/>gini = 0.0425<br/>samples = 46<br/>value = [0, 1, 45]<br/>class = virginica>] ;
    2 -> 12 ;
    13 [label=<sepal width (cm) &le; 3.1<br/>gini = 0.4444<br/>samples = 3<br/>value = [0, 1, 2]<br/>class = virginica>] ;
    12 -> 13 ;
    14 [label=<gini = 0.0<br/>samples = 2<br/>value = [0, 0, 2]<br/>class = virginica>] ;
    13 -> 14 ;
    15 [label=<gini = 0.0<br/>samples = 1<br/>value = [0, 1, 0]<br/>class = versicolor>] ;
    13 -> 15 ;
    16 [label=<gini = 0.0<br/>samples = 43<br/>value = [0, 0, 43]<br/>class = virginica>] ;
    12 -> 16 ;
}
```

Besides, the `PyEDA` package also utilize the GraphViz engine to visualize binary decision 
diagram (BDD) and reduced ordered BDD (ROBDD). Thus a nice visualization can instantly 
represented in Jupyter notebook when handling boolean expressions, as well as its conversions 
and simplifications. The official document of `PyEDA` also provides a detailed tutorial, which 
is available at [here](https://pyeda.readthedocs.io/en/latest/bdd.html#bdd-visualization-with-ipython-and-graphviz).

### Port to Web Platform

Modern web platform provides a rich and growing set of APIs that empowers variety of fancy 
application. One of the recent added API is [Web Assembly](http://webassembly.org/) which 
expose a more native interface for web application to utilize the computation capability of 
client. With assist of some compiler backends (such as emscripten), the layout engine of 
GraphViz can be compiled into Web Assembly format and execute directly within user browser.
A ready-to-use library named Viz.js is available at GitHub 
([mdaines/viz.js](https://github.com/mdaines/viz.js)), which also provides am online demo 
at [http://viz-js.com/](). 

The API exposed by Viz.js is quite simple and clear. It just consumes the source of a graph 
and generates the image. However, this process maybe kinds of time-consuming, and will
block the UI thread (the interaction of the web page), which is quite annoying, especially
on mobile devices with limited computing capability. A solution to this is problem 
is using a dedicate thread for calculating the layout, which can be implemented as a Web Worker.

I have also made a [simple demo](https://jack-q.github.io/reg2dfa/) for representing DFA converted from regular expressions, 
which use this approach to automatically layout the nodes within a modern browser. You can 
refer to the source for integration of Viz.js to webworker and packaging every piece of code 
with rollup.js.
