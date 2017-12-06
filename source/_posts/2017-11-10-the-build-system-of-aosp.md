---
title: The build system of AOSP
date: 2017-11-10 02:48:47
comment_id: 20171110_AOSP02
tags:
  - Android
  - AOSP
  - build
categories:
  - Android
---

An operating system is generally a huge system consists of kernel, hardware
drivers, system applications, basic user applications, etc. While in some
scenarios, an bare board program which utilizes hardware resource to to
perform some simple tasks can be treaded as an operating system, most
operating systems that we are familiar with involve a large number of various
components. In this post, I would begin a journey to explore the Android
operating system via the Android Open Source Project (AOSP). The first step is
to reveal how this system is composed up from various standalone modules, that
is directly relevant to the build system of AOSP.

<!-- more -->

## Introduction ##

The very first step to begin the voyage in the enormous AOSP (as well as its
derivations) is to fetch the latest source for your device (check the device
list of AOSP maintained by Google or LineageOS project) then build a
ready-to-install package in your own platform, which is briefly covered
in the <a href="{% post_path "build-android-from-source" %}" data-smooth
data-smooth-type="post">last post</a>.

### the build system for AOSP ###

The build system of 

### current status of the build system ###


## configuration of build target ##

### preparation ###

Open a terminal and change directory to the root of AOSP folder.
Then setup the environment variable and utility functions via `envsetup.sh`
(`source build/envsetup.sh`). At this point, the utilities shell functions
should be ready to use (try `hmm` command).

Initially, I have no idea how AOSP loads its required information by gathering
all of the fragments of configuration that spread across the source tree. Thus the
best approach is trace from the top level makefile down to these dedicated
piece of relevant to the build target.

### dive into the project ###

Now its time to dive into the source tree.

* the root

  The initial build configuration is loaded from the root of the directory,
  which is an extremely simple make file containing merely a single line of
  code as follows:

  ```make
  include build/core/main.mk
  ```

* the entry point

  The entry point of the `Makefile` system is the `main.mk` in the `build/core`
  directory (which is commonly refereed as `$(BUILD_SYSTEM)`). This file is
  about 1,100 lines starting from

* the configure

  H

### the product graph ###

This build goal create a graphical illustration of current selected build
product, which is just the the exploratory endeavour we have partly done.

The graph is created using `graphviz` (I've also done some exploration on the
wonderful tool several months ago, which was summaried
<a href="{% post_path "dot-language-for-graph" %}" data-smooth
  data-smooth-type="post">here</a>.). Since
the this toolkit is not core build process, the configuration of environment
may not cover this utility, this can be installed by following command:

```bash
sudo apt-get install graphviz
```

Then make the `product-graph` in the root directory.

```bash
croot
make product-graph
```

(If you encounter the sub-command failure (`dot: command not found`), ensure
`graphviz` is installed.)

Then the graph is generated in the `out` directory in `svg`, `pdf` and `dot`
format. Here is a sample of svg render result (clipped out a large portion
to better fit in this page).

<div class=image-container>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1046 935 1026"
    style="max-width: 880px; margin: auto; min-width: 640px; display: block">
    <g style="fill: none; stroke: #000">
      <polygon points="635.5,-733 507.5,-733 507.5,-663 635.5,-663 " />
      <polygon points="584.5,-577 456.5,-577 456.5,-507 584.5,-507 " />
      <path d="m 560.181,-662.822 c -7.428,22.43 -17.21,51.968 -25.203,76.104" />
      <polygon points="628.5,-420 480.5,-420 480.5,-350 628.5,-350 " />
      <path d="m 527.961,-506.985 c 4.944,22.535 11.478,52.323 16.825,76.701" />
      <polygon points="635.5,-890 507.5,-890 507.5,-820 635.5,-820 " />
      <path d="m 571.5,-819.985 c 0,22.535 0,52.323 0,76.701" />
      <polygon points="828,-890 681,-890 681,-820 828,-820 " />
      <path d="m 714.34,-819.985 c -27.912,23.642 -65.249,55.266 -94.749,80.252" />
      <polygon points="489,-890 308,-890 308,-820 489,-820 " />
      <path d="m 436.466,-819.985 c 26.274,23.541 61.383,54.997 89.215,79.933" />
      <polygon points="536,-264 417,-264 417,-194 536,-194 " />
      <path d="m 537.189,-349.822 c -11.461,22.629 -26.588,52.494 -38.872,76.746" />
      <polygon points="730.5,-577 602.5,-577 602.5,-507 730.5,-507 " />
      <path d="m 641.921,-506.985 c -16.719,23.139 -38.964,53.924 -56.83,78.649" />
      <polygon points="267.5,-1046 139.5,-1046 139.5,-976 267.5,-976 " />
      <path d="m 267.885,-979.737 c 2.905,1.278 5.786,2.529 8.615,3.737 96.933,
        41.382 123.96,44.869 221,86 0.203,0.086 0.407,0.173 0.611,0.259" />
      <polygon points="263,-890 144,-890 144,-820 263,-820 " />
      <path d="m 203.5,-975.822 c 0,22.23 0,51.444 0,75.459" />
      <path d="m 204.294,-819.854 c 3.482,85.812 22.106,314.696 121.206,
        469.854 20.67,32.363 53.123,59.812 82.654,80.255" />
      <polygon points="121,-1046 7.10543e-15,-1046 7.10543e-15,-976 121,-976 " />
      <path d="m 92.2363,-975.822 c 21.4757,23.127 49.9697,53.813 72.7457,78.341" />
      <polygon points="462.5,-420 334.5,-420 334.5,-350 462.5,-350 " />
      <path d="m 415.811,-349.822 c 11.461,22.629 26.588,52.494 38.872,76.746" />
      <path d="m 511.724,-193.812 c 24.535,23.814 57.614,55.92 84.86,82.364" />
      <polygon points="815.5,-264 663.5,-264 663.5,-194 815.5,-194 " />
      <path d="m 720.23,-193.812 c -13.135,23.305 -30.747,54.551 -45.463,80.661" />
      <polygon points="461.5,-1046 285.5,-1046 285.5,-976 461.5,-976 " />
      <path d="m 458.056,-975.822 c 63.496,25.665 150.017,60.636 213.194,86.172" />
      <polygon points="651.5,-1046 479.5,-1046 479.5,-976 651.5,-976 " />
      <path d="m 607.445,-975.822 c 28.751,23.427 67.019,54.608 97.31,79.289" />
      <polygon points="839,-1046 670,-1046 670,-976 839,-976 " />
      <path d="m 754.5,-975.822 c 0,22.23 0,51.444 0,75.459" />
      <polygon points="866,-577 749,-577 749,-507 866,-507 " />
      <polygon points="798,-420 681,-420 681,-350 798,-350 " />
      <path d="m 792.577,-506.985 c -9.974,22.737 -23.188,52.855 -33.935,77.353" />
      <path d="m 739.5,-349.822 c 0,22.23 0,51.444 0,75.459" />
      <polygon points="933,-420 816,-420 816,-350 933,-350 " />
      <path d="m 844.539,-349.822 c -20.187,23.028 -46.942,53.549 -68.397,78.023" />
    </g>
    <g style="fill:#000000;stroke:#000000">
      <polygon points="531.608,-587.675 538.253,-585.475 531.787,-577.082 " />
      <polygon points="541.436,-429.221 548.273,-430.721 546.997,-420.204 " />
      <polygon points="568,-743.204 575,-743.204 571.5,-733.204 " />
      <polygon points="617.251,-742.337 621.775,-736.996 611.882,-733.204 " />
      <polygon points="523.541,-737.27 528.212,-742.483 533.324,-733.204 " />
      <polygon points="495.158,-274.585 501.403,-271.422 493.762,-264.082 " />
      <polygon points="582.235,-430.359 587.909,-426.259 579.215,-420.204 " />
      <polygon points="496.86,-886.469 499.633,-892.896 507.429,-885.721 " />
      <polygon points="200,-900.082 207,-900.082 203.5,-890.082 " />
      <polygon points="406.556,-266.601 410.477,-272.399 416.8,-263.898 " />
      <polygon points="162.483,-895.028 167.613,-899.792 171.852,-890.082 " />
      <polygon points="451.597,-271.422 457.842,-274.585 459.238,-264.082 " />
      <polygon points="706,-104 587,-104 587,-20 706,-20 " style="fill:#fffdb0;" />
      <polygon points="594.488,-108.604 599.364,-113.627 604.102,-104.151 " />
      <polygon points="671.555,-114.581 677.653,-111.144 669.694,-104.151 " />
      <polygon points="670.206,-886.297 672.829,-892.786 680.789,-885.794 " />
      <polygon points="702.709,-893.685 707.131,-899.112 712.672,-890.082 " />
      <polygon points="751,-900.082 758,-900.082 754.5,-890.082 " />
      <polygon points="755.318,-430.767 761.728,-427.955 754.505,-420.204 " />
      <polygon points="736,-274.082 743,-274.082 739.5,-264.082 " />
      <polygon points="773.337,-273.909 778.601,-269.295 769.377,-264.082 " />
    </g>
    <g style="font-size:14px;font-family:Times, serif;text-anchor:middle;fill:#00008b">
      <text x="571.5" y="-717.79999">build/target/product/</text>
      <text x="571.5" y="-702.79999">full_base.mk</text>
      <text x="520.5" y="-561.79999">build/target/product/</text>
      <text x="520.5" y="-546.79999">aosp_base.mk</text>
      <text x="554.5" y="-404.79999">build/target/product/</text>
      <text x="554.5" y="-389.79999">full_base_telephony.mk</text>
      <text x="571.5" y="-874.79999">build/target/product/</text>
      <text x="571.5" y="-859.79999">locales_full.mk</text>
      <text x="754.5" y="-874.79999">external/svox/pico/lang/</text>
      <text x="754.5" y="-859.79999">all_pico_languages.mk</text>
      <text x="398.5" y="-874.79999">frameworks/base/data/sounds/</text>
      <text x="398.5" y="-859.79999">AllAudio.mk</text>
      <text x="476.5" y="-248.8">device/xiaomi/ido/</text>
      <text x="476.5" y="-233.8">full_ido.mk</text>
      <text x="666.5" y="-561.79999">build/target/product/</text>
      <text x="666.5" y="-546.79999">telephony.mk</text>
      <text x="203.5" y="-1030.8">build/target/product/</text>
      <text x="203.5" y="-1015.8">languages_full.mk</text>
      <text x="203.5" y="-874.79999">device/xiaomi/ido/</text>
      <text x="203.5" y="-859.79999">device.mk</text>
      <text x="60.5" y="-1030.8">vendor/xiaomi/ido/</text>
      <text x="60.5" y="-1015.8">ido-vendor.mk</text>
      <text x="398.5" y="-404.79999">build/target/product/</text>
      <text x="398.5" y="-389.79999">core_64_bit.mk</text>
      <text x="646.5" y="-88.800003">device/xiaomi/ido/</text>
      <text x="646.5" y="-73.800003">lineage.mk</text>
      <text x="646.5" y="-42.799999">Redmi 3</text>
      <text x="646.5" y="-27.799999">ido</text>
      <text x="739.5" y="-248.8">vendor/cm/config/</text>
      <text x="739.5" y="-233.8">common_full_phone.mk</text>
      <text x="373.5" y="-1030.8">external/svox/pico/lang/</text>
      <text x="373.5" y="-1015.8">PicoLangEnGBInSystem.mk</text>
      <text x="565.5" y="-1030.8">external/svox/pico/lang/</text>
      <text x="565.5" y="-1015.8">PicoLangEnUsInSystem.mk</text>
      <text x="754.5" y="-1030.8">external/svox/pico/lang/</text>
      <text x="754.5" y="-1015.8">PicoLangEsEsInSystem.mk</text>
      <text x="807.5" y="-561.79999">vendor/cm/config/</text>
      <text x="807.5" y="-546.79999">common.mk</text>
      <text x="739.5" y="-404.79999">vendor/cm/config/</text>
      <text x="739.5" y="-389.79999">common_full.mk</text>
      <text x="874.5" y="-404.79999">vendor/cm/config/</text>
      <text x="874.5" y="-389.79999">telephony.mk</text>
    </g>
  </svg>
</div>

When you check the content of the file, you will also notice that each block
(node) in the graph is also an anchor to a webpage listing the content of that
makefile as well as the value of variables, which is quite beneficial to figure
 the eventual construction of the product. These webpages are generated in
 `out/products/build/target/product/` folder.

As the sample graph illustrated

### quick status check ###

For a quick overview of the eventual build configuration, the make target
`dump-product` is quite useful.

```bash
croot
make dump-product
```

Notice: This target is bound to fail since its implementation is just generate
an error at the point where sufficient product information is gathered following
the default build flow.

## Build processing flow ##

After processing the configuration items, the build script will process project
(component module) configure items that reside in each project build.
