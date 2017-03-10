---
title: JavaEE Training Note - Day 16
date: 2017-03-09 08:10:35
comment_id: 20170309-JEENOTE-16
tags:
  - network
---

Today's topic is about some debugging methods and toolkit used
to solve problems. One is the `tcpdump` and other terminal 
tools for remote package sniffer and traffic analysis. Another is
some wired errors occured in the development progress of project.

<!-- more -->

Remote Package Sniffer
----------------------

For the remote deployed server, the most convenient method  to connect
, monitor and control it is the remote shell. By using the ssh securied 
remote shell connection, the remote server can be accessed just as
a local machine. However, when some error occurred, the terminal tools
is the only choice to solve that.

When debugging the interface of a web service, logging it in-ward and out-word
packages can is a useful approach to seperate the application issues(the server),
network issues(the connection), and the request source issues(the client).
The following tools are used to handle these problems.

The tools are tested on a ubuntu 16.04 server based host.

### port usage and service status
First thing is to ensure the remote application is executing correctly.
The initial step is to print process list and check the target service/application
is running.

```bash
ps aux | grep tomcat
```

Then make sure the specified remote tcp port is allocated to target program.
```bash
netstats -ltupn
# l: local address (no dns reverse resolving)
# t: TCP connection
# u: UDP connection
# p: port
# n: numeric representation of port
#    (no known protocol name replacing)
```

### use `tcpdump` to sniffer package

`tcpdump` is a network tool to dump the traffic on a network.
For a http protocol based service running on port 80, all of its traffic 
can be dumped by the following setting:
```bash
sudo tcpdump -q -s 0 -A 'tcp port 80'
# A: pring each package in ASCII mode
# q: reduce the print of protocol related information
# s: snarf the package of setted size, 0 to disable this feature
# 'tcp port 80': package filter to dump package of 80 port on TCP stack
```

### use `tshare` to dump package for further analysis

`wireshark` is an advanced toolkit for network package analysis.
The `tshark` is the terminal tool in this program packges.
With the `tshark` program, the package can be used to dump package 
to standard output or save the package to standard `pcap` (package capture)
format then download the package for further analysis. Besides, 
the package filter can also use `lua` based scripts to process 
the output or filter.

SQL keyword conflict
--------------------

In JPA/Hibernate based application, database table can be created by 
the annotated based table declaration. However, when some SQL keyword are 
used in name of the table, the genrate SQL statement will contian 
an unresolvabel structure thus a error will occur. 

This will generall print a stacktrace at the start up procedure 
of web application. However, this problem will not prevent the application 
to load in further progress, until a database operation related 
to that table is performed. 
