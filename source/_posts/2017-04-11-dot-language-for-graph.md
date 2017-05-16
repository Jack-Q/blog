---
title: DOT language for graph
date: 2017-04-11 22:57:26
comment_id: 2017-04-11 22:57:26
tags:
---

GraphViz package is 

```dot
digraph G {
    rankdir="LR";
    node [shape="circle"];
    
    0 -> 1 [ label="1" ];
    1 -> 1 [ label="0" ];
    
    1 [shape="doublecircle"];
}
```