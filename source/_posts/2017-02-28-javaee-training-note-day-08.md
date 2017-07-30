---
title: JavaEE Training Note - Day 08
date: 2017-02-28 20:25:27
comment_id: 20170228-JEENOTE-08
tags:
  - java 
---

The topic of today is the fundamental of web application and the server.
The concepts introduced today is the low level basis of the fancy and 
colorful world of the Internet. Besides the general concepts, the nginx
server also introduced.

<!-- more -->

## Web Application Architecture

The most famous protocol of the Web is the the http protocol, which is a application layer 
protocol based on TCP (as well as more basic IP).
HTTP is featured in its connection independent and stateless attribute.
The basic pattern of HTTP is request-response cycle.
Client initiates a request to the server, then server give a response back to the client.

Originally, the usage of HTTP is to share file (especially the HTTP document) on the network.
With the improvement of computing capability, the dynamic content is more favorable.
Especially with the assist of database technology, the dynamic is used to provide a interface 
of the remote data. It is said that most of web server can be treated as 
an interface to data. 

The server is waiting/listening at a directly accessible address waiting for client to coming.
No expectation can be made about the client. Therefore, the server application 
should be designed to be able to work for long time to ensure the availability.

Some limitation of the original web application is teh lack of capability to push content 
from server. To achieve this goal, lots of applications implement private protocols directly based 
on TCP/UDP which are fully-duplex. However, the modern web technology are gradually overcoming 
these problems by add new capability to existing protocol. The HTTP/2 protocol, the processor 
of the current dominating version 1.1, has provided this feature already.


## Nginx Http Server

Nginx is the most popular http server which is generally configured as the 
front level of the multi-layer web infrastructure. 

The basic usage of nginx is to host static content in web server. Just like 
other top used web servers, like apache httpd, Microsoft IIS, etc. Because 
of the high performance comparing to other solution, the overall statistical 
data indicates the trend of growth of usage of the nginx.

Nginx is most used as the reverse proxy of a large server system/clusters. 
The name 'reverse proxy' is from the 'proxy' server, since what the 
reverse proxy to the back-end servers behind the it is what the 
proxy server to the client. By multiplexing and monitoring the data frames
of each server behind the first layer. When nginx is configured in this pattern,
the whole server is in the following diagram:

```txt
                 |                                 |   
      Nginx      |   Application Server/Servers    |   Database Server/Servers
                 |                                 |
  Load Balancer           Business Logic                  Data Persistence
  Reverse Proxy

```

In the first layer, the server can be used as load balancer to dispatching 
request package evenly, or as cache server to filter and manage unmodified content,
or as the request filter to rewrite teh URL, as well as other usages.

## Tomcat Architecture

Tomcat is simple noted as a Servlet container and web server, while its implementation 
is relative complex. Actually, Tomcat is not a single project but a collection
of relative independent component. As the [official document](https://tomcat.apache.org/tomcat-8.5-doc/architecture/overview.html)
shows, the Tomcat project is consists of project Catalina, project Coyote, project 
Jasper, the project Cluster, etc.

The Project Catalina is a servlet container, which maintains a server context
for each application and within this servlet container. With proper configuration,
the application can also be used to connect to apache httpd (or nginx, IIS) to serve 
content. It can even be configured as shell application to provide service in 
the `cig-bin` pattern.

The Project Coyote is a connector to connect the servlet container with web stack.
Just as the role of apache httpd, nginx, IIS does. In fact, this component can be used 
isolated as a plain static file server.

The Project Jasper is a JSP engine to generate Java Class (Servlet class) form JSP markup languages.






