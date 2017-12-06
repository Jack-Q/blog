---
title: 'Data Compression: the DEFLATE Algorithm'
date: 2017-10-18 15:11:01
comment_id: 20171018_DEFLATE
tags:
  - compression
categories:
---

Most messages we use everyday contain large portion of redundancy, which is
an integral part of message to improve the usability and reliability during
transmission, interchanging, as well as storage. However, in some scenarios,
a more compact form of message with least redundancy is preferable, like network
transmission on tunnel with limited bandwidth, storage on media with constrained
capacity.In the filed of information security, the redundancy of message generally
decrease the overall security of system. Therefore, data compression is
an important module in various programs. One of the most used general lossless
data compression library is Zlib, which use DEFLATE as its compression
algorithm.

<!-- more -->

## Overview

DEFLATE is a widely used general lossless compression algorithm, which is *the*
algorithm behind Zlib. Most of major operating systems and programming languages
integrate Zlib by default, including but not limited to Java, Python, .Net, PHP,
Perl, Ruby, Swift, and Go. As a practical algorithm, the idea behind DEFLATE
consists of several proven principles. On the other hand, the implementation
detail of the algorithm is also carefully designed to ensure the capability to 
adopt to various kinds of messages.

## Preliminary

In this section, some basic concepts and elementary algorithms used in
the implementation is presented as reference.

### run-length coding

Run-length coding (RLC) or Run-length encoding is possibly the simplest
algorithm to reduce a specific yet common type of redundancy in message/bit stream,
which is a consecutive stream of the same character. For instance, the bit stream
`00000000001111111111` can be encoded as `0 10 1 10`, which read as 10 consecutive
bit `0`s followed by 10 consecutive bit `1`s.

Albeit this approach is simple and straightforward, there are several details require
consideration for a specific implementation.

* How to distinguish the literal and the length in a stream of encoded message? 
  Some of possible solution including delimiter, prefix in non-overlapping range,
  fixed and predefined length of each field, etc.
* If use a fixed and predefined length of each field, what is an appropriate length
  of each field? How to compromise to extremely long/short repetition?
* How to encode message with out repetition of this pattern?
* ...

### sliding window

Sliding window is a kind of mechanism to maintain buffer of a fixed size and
update the data in the buffer by pushing data recently read in and pulling
data firstly read out, which is just like to inspect the input data through
a window of a running vehicle.

The intent of this mechanism is that in most cases, only a short section of 
a large data stream that matters. Since the memory for compression as well as
decompression are all limited resource, the sliding window will let the processing 
module utilize the memory more efficiently. Besides, by adjust the size of the 
sliding window, a algorithm using this mechanism can run efficiently 
on various configurations, varying from those powerful workstations or cloud-based
clusters to tiny embedded devices.

In the perspective of implementation, the data updating policy has significant 
impact of the performance. Assuming that a sliding window is implemented as copying 
the whole buffer when read each single byte (or bit in applicable), the overhead 
of updating data will be directly decided by the scale of the size of input data
and the sliding window. For a sliding window of size *w* and a input data of 
size *n*, the total operation for data copying is *m &times; n*, 
merely for maintaining the window up to date. 
But this can be reduced significantly if we allocate more memory space for 
the sliding window. Consider doubling the size of sliding window and use a
pointer to trace the head of buffer, then we can update the pointer before 
the extra copy of buffer is filled. When the extra copy of buffer is fully 
filled, copy the data in the extra buffer to the original one will reset it
to empty again (and also reset the pointer to the initial position), which
is just like the original mechanism. By using the extra space, the total operation 
of copying data for maintaining the sliding window would be 
*(2m) &times; n / m = 2n*. 

Actually, the extra space would also be used as read ahead buffer for data compression.
Since the process of data compression is to eliminate data redundancy by spotting
the repetition or pattern and store them in a more efficiently. This will also
 be mentioned later in the post.

### Huffman algorithm and canonical Huffman coding

For most messages, the frequency of each individual character (or group of
characters) is not the same. A natural intuition is to represent the more
frequent characters or character groups with less bits whereas represent
the less frequent ones with more bits, which is the basic principle of
Huffman algorithm. 

However, there are still several problem to tackle before implement 
an efficient algorithm that follows our intuition. The first problem
is how to assign another set of variable-length bit patterns to 
replace the original set of fixed-length bit patterns without 
introducing conflict or ambiguity. Huffman algorithm addresses this 
problem by construct a special binary tree whose leaf nodes are characters,
which is managed to be as balance as possible with respect to the frequency of
current leaf node or sum of frequencies of all leaf nodes branching out
from current inner node. To achieve, Huffman algorithm sort all of 
nodes and replace two of the least frequent node with a merged node constructed
by attaching the original nodes as its child. Since we replace two nodes 
with a merged one in each step, eventually all the nodes will be merged 
into a single binary tree.

After the step of tree construction, each character is posited in a certain position
within the tree, which can be represent by a serial of bits. As a binary tree,
each leaf node can be achieved from the root after several branching to either
left or right. Using bit `1` and `0` to stand for the direction of branching, 
each lead node can be uniquely represented. As each leaf node has no child nodes
in a binary tree, its bit pattern cannot be the prefix of the bit pattern of 
any other characters. Therefore, the encoding schema is also named as
*prefix encoding*.

Another problem we have is how to store the new encoding schema. Apart from
the original message encoded using replaced encoding, the mapping
should also be attached as part of compression result. The first approach is 
to store them in an array of fixed bit size (the maximum bit length plus
 extra space for their actual length). For instance,
the following binary tree is the result of an execution of Huffman algorithm and
the encoding schema on the right side is generated following the method shown above.
By using 2 bits for indicating its length and 3 bits (the maximum length 
of all characters) for its bit pattern, the result would be *5 &times; 4 = 20* bits.

```txt
  /\     a => 00,  2 bits        |  a  |  b  |  c  |  d  |
 /\ d    b => 011, 3 bits  -->   |10000|11011|11010|01100| 
a /\     c => 010, 3 bits         2     3     3     1
 c  b    d => 1,   1 bits
```

However, the tree shown above is kinda casual. That is we can apply more constriction
to it to make it canonical, thus reduce the ambiguity required to store the tree.
Consider moving all of leaves to left without change their depth and the leaves
of the same depth are sorted in dictionary order, 
the tree shown above can be reconstructed as follows, which will be identical
to the original one in terms of compression ratio:

```txt
 /\      a => 10,  2 bits        |a |b |c |d |
d /\     b => 110, 3 bits  -->   |10|11|11|01|
 a /\    c => 111, 3 bits         2  3  3  1
  b  c   d => 0,   1 bits
```

However, this one can be reconstructed by using the length of each character only.
Just as the bit pattern shown above, which requires only *2 &times; 4 = 8* bits.
This is the *Canonical Huffman Encoding*.

To reconstruct tree from a serial of length, it requires the following steps.
First we need to known the shape of the tree. Since the lead nodes are all at
the left-most positions, we can shape the binary tree by the number of leaf node
in each level. Then, we need to fill the placeholder in the blank tree.
As the canonical Huffman tree also requires that characters in leaf nodes are 
in dictionary order, it is not a hard task to fill them into correct position.
The last task is using the tree to get their bit patterns. The whole
process is illustrated in the following diagram. While it requires more 
computation, the reduced space consumption is more significant for data 
compression.

```txt
[depth] [leaves]       /\      [options]       /\        a => 10
   1       1     ->  [] /\         d      ->  d /\   ->  b => 110
   2       1          [] /\        a           a /\      c => 111
   3       2           []  []     b,c           b  c     d => 0
```

### LZ77 encoding

LZ77 encoding is the encoding schema using in LZ77 compression algorithm.
It use the a tuple of distance, length and initial character to denote 
a repetition. Thus the repetition pattern will not be limited to consecutive 
characters as mentioned in run-length encoding.

## Compressed Data Format

The format of compressed data using DEFLATE algorithm is documented at IETF
as [RFC1951](https://tools.ietf.org/html/rfc1951), which is a reference for
the implementation of a compatible compressor or decompressor.

The data stream consists of a serial of compression blocks among three types.
Each block contains a bit that indicates whether current one is the last block.
The structure of these blocks are different, which will be explained in the
following section.


### Plain Literal (Non-compressed block)

### Static Huffman Compression (Fixed Codes)

### Dynamic Huffman Compression (Dynamic Codes)


### Block header bits

To distinguish block type, each block is prefixed with a 3-bit header

```txt
|  0   |  1     2  |    3 ...      |
+------+-----+-----+===============+
|BFINAL|   BTYPE   | Block Content |
```

* `BFINAL`: indicates whether current block is the last block of compression stream.
    It will only be set in the last block of a compression stream;
* `BTYPE`: indicates 

## Inflate, the decompression process

The inflate process is to recover the original message from a well-formed 
DEFLATE stream.

## Deflate, the compression process

### High-level structure

```txt
+===========+    scan    +=========+  encode   +==========+
|  Message  | ---+---+-> |  Block  | ----+---> |Compressed|
+===========+    |   |   +=========+     |     +==========+
      ^----------'   `-------------------'
          match           Freq. Stat
```

### scan original message


### match repetition

### Huffman coding

### canonical Huffman tree encoding



## Applications

The bit stream generated by De

### Zlib format and GZip format

The direct application of DEFLATE algorithm is file compression.
To maintain some of meta data in file and add some other functionality 
like error detection, some single file oriented file
compression format are introduced based on the DEFLATE algorithm.
The Zlib and Gzip format are the most common ones.

* Zlib format

Zlib is specified in [RFC1950](https://tools.ietf.org/html/rfc1950).
It is is a simple wrapper format of the raw compress stream generated by
deflate algorithm. The file format can be illustrated as the following diagram.

```txt
+---+---+   +---+---+---+---+          +============+---+---+---+---+
|CMF|FLG|   |    DICT-ID    |  <DICT>  | compressed |    Adler-32   |
+---+---+   +---+---+---+---+          +============+---+---+---+---+
             `--(if FLG.DICT set)--'
```

Zlib format also provide a mechanism to attach dictionary before the actual data.
If the relevant bit of `FLG.DICT` in `FLG` is set, the `DICT-ID` and the following
serial of bytes will be recognized as a dictionary. A application may also define a 
set of predefined dictionary and using `DICT-ID` to select which one to use.
However, this may require some extra agreement between compressor and decompressor.

The `Alder-32` field is a checksum that try to provide a faster implementation
in software than `CRC32` while still maintain a extremely low probability of 
undetected errors. This is achieved by using two part of checksum and update
then with different delay. The detailed implementation is represented in 
[Appendix 9 of RFC1950](https://tools.ietf.org/html/rfc1950#section-9).

I have implemented the format in JavaScript as a sample, check it out
at [`zlib.js`](https://github.com/Jack-Q/cryptwist/blob/master/src/compressor/zlib.js).

* GZip format

GZip is specified in [RFC1952](https://tools.ietf.org/html/rfc1952).
It is relatively more complex then the Zlib format with more options in header.
The structure of GZip format is illustrated as the following diagram.

```txt
 +---+---+---+---+---+---+---+---+---+---+
 |ID1|ID2|CM |FLG|     M-TIME    |XFL|OS |
 +---+---+---+---+---+---+---+---+---+---+

 +---+---+============================+
 | X-LEN | X-LEN bytes of extra field |
 +---+---+============================+
 (if FLG.F-EXTRA set)

 +========================================+
 | original file name, terminated by '\0' |
 +========================================+
 (if FLG.F-NAME set)

 +==================================+
 | file comment, terminated by '\0' |
 +==================================+
 (if FLG.F-COMMENT set)

 +---+---+
 | CRC16 |
 +---+---+
 (if FLG.F-H-CRC set)

 +=======================+
 | Compressed Data Block |
 +=======================+

 +---+---+---+---+---+---+---+---+
 |     CRC32     |   Input-SIZE  |
 +---+---+---+---+---+---+---+---+
```

The error detection mechanism in GZip is CRC32 algorithm, which is applied 
to both the header and original message. The CRC32 checksum of header section is
a 16 bit portion of the original 32 bit result.

I have also implemented the format in JavaScript as well, check it out
at [`gzip.js`](https://github.com/Jack-Q/cryptwist/blob/master/src/compressor/gzip.js).


### implementation and bindings

For real world applications, the