---
title: TensorFlow on Ubuntu with CUDA enabled
date: 2017-04-11 22:58:58
comment_id: 2017-04-11 22:58:58
tags:
---

First part in this post, I'd like to go through the installation of 
TensorFlow without CUDA enabled.

TensorFlow
----------

With the help of `pip3`, the installation of TensorFlow can be done by following command only.

```bash
sudo -H pip3 install tensorflow 
```

CUDA Toolkit
------------


NVIDIA provides some official guide on this topic, which is also a good resource for setup.
Check it out at [NVIDIA's website](http://www.nvidia.com/object/gpu-accelerated-applications-tensorflow-installation.html).

CUDA toolkit is 

Download the repo configuration package from [CUDA download page](https://developer.nvidia.com/cuda-downloads).


```bash
# Assume that the downloaded deb package is placed at current working directory
sudo dpkg --install cuda-repo-ubuntu1604_8.0.61-1_amd64.deb

# update package list cahce
sudo apt update
sudo apt install cuda
```
Interactive configuration for CUDA installer. One thing to notice is the graphic driver
installation configuration shoulf be disabled. Otherwise, the package will replace 
the NVIDIA driver installed on the system to an old version. 
(Currently, the latest driver is 381, while the packaged version of display driver is still 365).
```txt
   Do you accept the previously read EULA?
accept/decline/quiaccept          

Install NVIDIA Accelerated Graphics Driver for Linux-x86_64 375.26?
(y)es/(n)o/(q)uit: n

Install the CUDA 8.0 Toolkit?
(y)es/(n)o/(q)uit: y

Enter Toolkit Location
 [ default is /usr/local/cuda-8.0 ]: 

Do you want to install a symbolic link at /usr/local/cuda?
(y)es/(n)o/(q)uit: y

Install the CUDA 8.0 Samples?
(y)es/(n)o/(q)uit: y

Enter CUDA Samples Location
 [ default is /home/<user-name> ]: 
```

After installation progress, the installer will show the following tips:
```
===========
= Summary =
===========

Driver:   Not Selected
Toolkit:  Installed in /usr/local/cuda-8.0
Samples:  Installed in /home/<user-name>, but missing recommended libraries

Please make sure that
 -   PATH includes /usr/local/cuda-8.0/bin
 -   LD_LIBRARY_PATH includes /usr/local/cuda-8.0/lib64, or, add /usr/local/cuda-8.0/lib64 to /etc/ld.so.conf and run ldconfig as root

To uninstall the CUDA Toolkit, run the uninstall script in /usr/local/cuda-8.0/bin

Please see CUDA_Installation_Guide_Linux.pdf in /usr/local/cuda-8.0/doc/pdf for detailed information on setting up CUDA.

***WARNING: Incomplete installation! This installation did not install the CUDA Driver. A driver of version at least 361.00 is required for CUDA 8.0 functionality to work.
To install the driver using this installer, run the following command, replacing <CudaInstaller> with the name of this run file:
    sudo <CudaInstaller>.run -silent -driver
```

```bash
export PATH=/usr/local/cuda-8.0/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda-8.0/lib64:$LD_LIBRARY_PATH
```

NVIDIA cuDNN
------------

https://developer.nvidia.com/cuda-downloads


Bazel
-----

For compiling TensorFlow
```
sudo apt-get install software-properties-common swig 

echo "deb http://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list 
curl https://storage.googleapis.com/bazel-apt/doc/apt-key.pub.gpg | sudo apt-key add - 
sudo apt-get update 
sudo apt-get install bazel
```

Clang
-----
```
wget -O - http://apt.llvm.org/llvm-snapshot.gpg.key | sudo apt-key add -
sudo apt-add-repository "deb http://apt.llvm.org/xenial/ llvm-toolchain-xenial-3.9 main"
sudo apt-get update
sudo apt-get install clang-3.9 lldb-3.9
```
