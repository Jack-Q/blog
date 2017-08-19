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
dedicated data structure (that is to optimize) for common cases. The specialization
results in inconsistency. This post is mainly about the `vector` of `bool`, which is 
a specialization of `vector` according to the standard template library (STL) of C++.

<!-- more -->

## Synopsis  ##

In C++, `bool` is a primitive type used to represent logical value (boolean value).
For most compiling systems, the size of type `bool` is a single byte, 
yet the size of information that a `bool` value can express is only 1 bit, which is 
constrained by the architecture of computer system for which the minimal addressable
memory unit is one byte. 

However, for a serial of `bool` variables, they can be stored as bit filed, in which 
each variable requires a single bit. The `std::vector<bool>` is a specialization of 
class template `std::vector<T>` which use this technique to decrease memory usage.

```c++
#include <iostream>
#include <vector>
#include <malloc.h>

typedef unsigned char BOOL;

template<typename T> void testVector(int size) {
  // this is an GCC extension to inspect memory allocation status
  malloc_stats();
  std::vector<T> tVec(size);
  malloc_stats();
  std::cout << sizeof(tVec) << '\t' << sizeof(bool) << '\t' << tVec.capacity() << std::endl;
}

int main(int argc, char *argv[]){
                          // malloc  vector  element  capacity
  testVector<bool>(32);   //   32      40      1         64
  testVector<bool>(128);  //   32      40      1        128
  testVector<bool>(1024); //  144      40      1       1024
  testVector<BOOL>(32);   //   48      24      1         32
  testVector<BOOL>(128);  //  144      24      1        128
  testVector<BOOL>(1024); // 1040      24      4       1024
  testVector<int>(32);    //  144      24      4         64
  testVector<int>(128);   //  528      24      4        128
  testVector<int>(1024);  // 4112      24      4       1024
  return 0;
}

```

From the statistics of memory usage of `std::vector<bool>` and `std::vector<BOOL>` (`BOOL` is an alias of `unsigned char`),
the total memory usage of boolean vector is much less then integer vector. Each element is stored as a single bit in vector.

## Specialized reference type ##

A canonical name of the element type of the vector of bool is 
`std::_Bit_reference` (error message from compiler can help a lot), which is an access proxy 
of bit filed in vector. The proxy can be read and written just like a reference of 
an bool variable though is cannot be converted directly to an reference of `bool`. 
A related error message of this problem is quoted here for reference.

> note: candidate function not viable: no known conversion from '`reference`' (aka '`std::_Bit_reference`') to '`bool &`' for 1st argument

Consider the following program which applies utilities functions in STL (from `algorithm` header)
on `vector` of `bool`.

```c++
#include <iostream>
#include <vector>
#include <algorithm>

const int vector_size = 10;

template<class T> bool any_of(std::vector<T> &vec) {
  return std::any_of(vec.begin(), vec.end(), [](T &i){
    return !i;
  });
}

int main(int argc, char *argv[]) {
  std::vector<bool> bVec(vector_size);
  for(int i = 0; i < vector_size; i++) {
     bVec[i] = i % 2 + 1;
  }

  if(any_of(bVec)) {
    std::cout << "some elements in array are not true" << std::endl;
    return true;
  } else {
    std::cout << "all of elements in array are true" << std::endl;
    return false;
  }

  std::fill(bVec.begin(), bVec.end(), 0);

  return 0;
}

```

This program won't pass the compiling since the element type of `bVec` is not `bool`, thus
the parameter of lambda in function template `any_of` cannot be expressed as `T &`.
However, for other specializations of `vector`, the function template just works fine.

A simple solution for this template is use `auto` (C++ 11) keyword to enable automatic type derivation.
The function template can be changed to the following code.
```c++
template<class T> bool any_of(std::vector<T> &vec) {
  return std::any_of(vec.begin(), vec.end(), [](auto i){
    return !i;
  });
}
```
The compiler will derivate the type of `i` to `T &` or `std::_Bit_reference` accordingly.

## More resources ##

### implementation ###

For a sample implementation of vector of bool in C++, the source of the `libstdc++`
project of GCC is accessible from it repo 
(or its [GitHub Mirror](https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_bvector.h))

A section of comments in GCC's implementation of boolean vector describes the conflicts of 
this specialization of vector with standard container implementation. ([link](https://github.com/gcc-mirror/gcc/blob/9839559a054268dd444639141d9a7a7c7e6622a9/libstdc%2B%2B-v3/include/bits/stl_bvector.h#L567-L585)).

In general, this implementation use a dedicate iterator as proxy for bit field access.
The proxy can be read or written just as a primitive pointer of `bool`, yet it is completely a different type.
For certain scenarios in which the proxy is assigned to a variable, the program will fail to 
compile.

### workaround for inadequate scenario ###

Sometimes, this inconsistency of this specialization may cause generic program applied to standard container 
cannot be compiled. Here are some options to be used as workaround for this problem.

* Use `deque` as a container for `bool`;
* Use pinter of `bool` (`bool *`) as element of `vector`;
* Use `unsigned short`, `BOOL`, or other integer type as element of the container;
* Use a wrapper class / structure as a container of primitive `bool` type as element of `vector`.
