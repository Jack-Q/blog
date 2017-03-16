---
title: JavaEE Training Note - Day 18
date: 2017-03-12 14:16:12
comment_id: 20170312-JEENOTE-18
tags:
---

Continued to the last post about the security settings related to website or 
web service, today's topic is another vital security configuration for website,
which is the HTTP traffic over security socket layer (HHTTP-SSL, HTTPS). 
Without the companient of the HTTPS configuration, either token based approach 
or the session based approach will become vulnerable to the package sniffers 
in the middle of the whole transfer processes.

<!-- more -->

Security Socket Layer
---------------------

Security Socket Layer is a application layer protocol in the OSI model while 
the actual role it performed is just like a transmission layer protocol. It 
provides the functions to manage the hand shakes and public/private pair 
management. Then it exposes an TCP like interface for upper layer protocol that
require more security.

The upper layer protocol can theorically be any TCP based protocol, while the 
most common use case of its usage is the HTTP over SSL model (abbrivated as 
HTTPS). Other common combination of the protocols including the FTP over SSL 
(FTPS), etc.

Basically, the process of SSL connection is based on the the public/private 
key pair system. The client want to get connected to the server require to 
initiate a standard TCP connection for SSL handshake and package transmission. 
In the SSL model, client and server keeps a pair of public/private keys, 
respectively. The client use the server's public key to encrypt its public
key, the server can use its private key to decrypt the key and use that to 
decrypt further data. Then the applicatin layer protocol based on SSL is begin 
to construct its connection. With this protocol, the data transmitted over the 
security socket layer is encrypted. 

Another important point of the process is the CA (Certificate Aothority) that 
signs the public key of the server to ensure the identity of the server and 
prevent the forge of the domain names. Without this step, the SSL only ensures 
the data transmitted after the establishment of the connection is security and 
free from leak. The initiate process cannot ensure the target server is the 
certificant authorited target. Thus, the man in the middle attack can be 
performed in the middle to pretend the role of client and serve for the real 
server and client. Data is encrypted on the connection, while the information 
is still leaked.

The importance of the SSL to the HTTP is that HTTP transmit data package in 
the plain text form, any network component in the middle of the connection is 
capable to sniff the package to abstract the information within the package.
Initially, the HTTP is designed to be used to share information to public 
domains. Thus, no enough security consideration is paid on it design. For 
scenario of the token exchange and passwork commit, HTTP has no protection to 
prevent the key information from stolen.

Certificated and Signed Public Key
----------------------------------

As metioned in above, the signature from CA pays a vital role to the whole 
process. There is a CA hierarchy with some root CA signatures pre-installed on 
the operation system or browser. Other CA has its own certificant signed by a 
higher level of CA. 

Configuraion on Tomcat server
-----------------------------

First, this step use the key pair certificated by Let's Encrypt serverce as a 
free CA. Then the generated key can use `openssl` and `keytool` of java to 
create a java key store. Then configure the tomcat server to use the key to 
encrypt data it transmitted.

1. Follow the instruction on the Let's Encrpyt website to create a 
   certificated key and store it with apporptiate permission;
2. Use the openssl to create a keystore:
3. Use keytool from jdk to create a java key store 
4. Configure the Tomcat to use the key for data it transmitted.

