---
title: JavaEE Training Note - Day 17
date: 2017-03-10 14:10:58
comment_id: 20170310-JEENOTE-17
tags:
---


After building the core functionality of the project, the next step is to 
create an interface for the application to interact with the outter world.
However, in an open network, there are always unintented attempts to access 
our application without the authorization. Therefore, web application are 
always require authentication and authorization to secure itself. In this 
application, there are two modules used to secure different kinds of interfaces.

<!-- more -->

Server Session &amp; Cookie
---------------------------

A common and wide used approach to secure a web application is use a random 
value as a identifier of the remote client and keep a record of the remote 
client'f infos in a local server binded to that identifier. Generally, the 
identifier is stored in the cookie of browser, and the goal of this approach 
is to keep the stateless HTTP request serials performing as a session. 
Therefore, this approach is naned cookie based server session.

When a browser access the server without a valid session id in its request 
cookie header, the server generate one and set it to the latter serial of 
requests. If the user is authenticated by some means with the server, the 
server will add some security claims to the server side records. On the later 
request, the claims is checked for securied resource access and the server can 
invalidate the server side identifier to terminate the session.

Token based Authorization
-------------------------

For access to a API server, the session can have long duration. Thus, the 
session based authorization with state information stored in server will 
always holding server resources. To simplify this identifier based client/
server negotiation for authorization, some token based approachs are used.

Basically, the server can generate a authorization information and sign it 
with a private key. In the following requests, the server can use that key to 
validate the access by re-sign the request authorization payload with the 
private key used in server side and compare with the signature of the request 
header. Each time, the only thing serve requires to do is check the validility
of the authorization header and grant access to this request. The request of 
HTTP become back to its original stateless design.

A problem of this approach is how to invalidate the token. A general approach 
is add a `expires at` information to the authorization information and only 
accept identifier with valid lifetime. Some other approaches include the 
server store of generated token. (This can reduce the risk of leaking the server private key.)