---
title: Service in ROS
date: 2017-07-12 15:33:34
comment_id: 20170712-ROSSRV
tags:
    - ros
---

Followed by previous post covering message in ROS, this one introduce service in ROS.

Service is another information exchange mechanism provided in ROS which 
provides RPC (remote procedure call) style request-response pattern.
The service is defined by `.srv` file, which can be treated as a combination
of two message representing service request and service reply, respectively.

Most of information in this post is refer to [Services page in ROS wiki](http://wiki.ros.org/Services), [srv page in ROS wiki](http://wiki.ros.org/srv) and [source code for ROS core module](https://github.com/ros/ros/blob/kinetic-devel/core/roslib/src/roslib/srvs.py). 

<!-- more -->

## `.srv` file ##
`.srv` file declares an exposed service of a package. Service files are declared within `srv` folder, and following the same composing rule as the message file, with an extra seperator for seperation of request and respoonse.

For example
```
# request
int64 a
int64 b
---
# respoonse
int64 sum
```

## utilize service ##
To utilize service, add corresponding declaration to header to build files.
