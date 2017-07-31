---
title: PDF manipulations in Linux
date: 2017-06-03 00:33:42
comment_id: 20170603-PDFLINUX
tags:
---

PDF fiels are quite common for various 

## Concatenate / Merge seperate pdf files

Several options are available, the syntax of most of the commands is 
a list of input file followed by the output file name.

```bash
# the output can 
pdfunite input-1.pdf input-2.pdf input-3.pdf out.pdf
```

## Crop white margins

## Convert to PDF

### Embed SVG in Latex

SVG is a vector graphic format, while essentially, it is a markup language,
which is not common in Latex file. Inkscape provides a handless mode which can be 
used as a command line tool with 

```bash
inkscape -D -z --file=UseCaseMain0.svg --export-pdf=a.pdf
```

Then in the Latex file,
