---
title: vector of bool in C++
date: 2017-07-12 19:28:19
comment_id: 20170712-CPPBVEC
tags:
    - C++
---

C++ is an evolvement of C with shared design principles of performance first, 
yet with consideration of convenience at the perspective of programmer. 
However, the former generally requires to implement the most suitable and 
dedicated 


<!-- more -->

## Basic phenomena  ##

```c++
#include <vector>
```


## Specialized iterator ##
A canonical name of the iterator type of the vector of bool is 
`std::_Bit_reference` (error message from compiler can help a lot)
When compiling a C++ file with invocation of these 
> candidate function not viable: no known conversion from 
> '`std::_Bit_iterator::reference`' (aka '`std::_Bit_reference`') 
> to '`std::vector<bool>::iterator`' (aka '`std::_Bit_iterator`') for 1st argument



## Inconsistency behavior with `algorithm`

```c++
#include <vector>
#include <algorithm>
```

## More resources ##

### implementation ###

For a sample implementation of vector of bool in C++, the source of the `libstdc++`
project of GCC is accessible from it repo 
(or its [GitHub Mirror](https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_bvector.h))

### work around for inadequate scenario ###
