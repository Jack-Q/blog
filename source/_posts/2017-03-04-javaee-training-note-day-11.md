---
title: JavaEE Training Note - Day 11
date: 2017-03-03 22:34:50
comment_id: 20170303-JEENOTE-11
tags:
---

Tosay's topic is related to configuration of service in remote Linux server.
The target server is an ubuntu server 16.04. Following are some of configuration
steps.

Java （Oracle JDK)
-----------------

Restricted by legal reasons, the oracle JDK is not available in official source
of ubuntu. Therefore, most of times, the oracle JDK requires manual steps to
configure. However, on ubuntu environmant, there is a machinism that we can 
use the package from a personal source, which is PPA, Persnal Package Archive.
A personal managed source, that can be subscribed and receive package using 
the general package management tool in ubuntu (that is APT).

The following step is install oracle JDK 8 via the PPA method on ubuntu environment.

1. update the system
```bash
sudo apt-get update && sudo apt-get dist-upgrade
```

2. register PPA
The package has already managed by WebUpd8 team for several years with enough stability.
```bash
sudo add-apt-repository ppa:webupd8team/java
```

3. Update package list cache
```bash
sudo apt-get update
```

4. Install Java
The `oracle-java8-set-default` package will install the corresponsding Java version
and update the system configration for alternatives to use oracle JDK as default
Java version.
```bash
sudo apt-get install oracle-java8-set-default
```

Tomcat 8.5
----------

A packaged vesion of Apache Tomcat is provided in package source, while it is
some kinds of out-of-date. The following steps are used to download leasted release 
of Tomcat and configure it as a daemon.

1. Download 
Download the least relese from [https://tomcat.apache.org/download-80.cgi]()
and use the wget tool to save in to server.
```bash
wget http://mirrors.koehn.com/apache/tomcat/tomcat-8/v8.5.11/bin/apache-tomcat-8.5.11.tar.gz \
    -O ~/tomcat.tar.gz
```

2. Create `tomcat` user and group
```bash
sudo addgroup --system tomcat
sudo adduser --system --ingroup tomcat tomcat
```

3. Unpack the package
Unpack the tarball and modify the user and group property of the package files.
```bash
tar -xvf ~/tomcat.tar.gz
sudo mv ~/apache-tomcat-* /home/tomcat/ 
sudo chown tomcat:tomcat -R /home/tomcat/apache-tomcat-*
```

4. Use authbind the allow binding to 80 port
In Linux/Unix environment, the port with port number less then 1024 are privlidged.
To manage binding to these port, the authbnf package is 
a useful package.
```bash
sudo apt install authbind
sudo touch /etc/authbind/byport/{443,80}
sudo chmod 500 /etc/authbind/byport/{443,80}
sudo chown tomcat:tomcat /etc/authbind/byport/{443,80}
```
5. Update tomcat server.xml configuration
Tomcat configuration file `server.xml` is used to manage hte port and connectivity 
of the server and its internal conponents. This file is placed in
`conf` package of root directory of tomcat.
```bash 
sudo sed -i 's/8080/80/g' /home/tomcat/apache-tomcat-*/conf/server.xml
```
This command is to update the following lines:
```xml
<!-- original http configuration -->
<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
<!-- update port configuration -->
<Connector port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />

```

6. Configure systemd to use tomcat as daemon

Edit (create) the `systemd` configuration entry:
```
sudo vim /etc/systemd/system/tomcat.service
```
Then add the following content:
(use `i` to insert, ues `<esc>:x` to save and quit)
the `JAVA_HOME` should pointing to root folder of JDK
and the `CATALINA_HOME` and `CATALINA_BASE` should 
update to tomcat path. (with correct version number).
```
[Unit]
Description=Tomcat Container
After=network.target

[Service]
Type=forking

Environment=JAVA_HOME=/usr/lib/jvm/java-8-oracle
Environment=CATALINA_PID=/home/tomcat/tmp/tomcat.pid
Environment=CATALINA_HOME=/home/tomcat/apache-tomcat-8.5.11
Environment=CATALINA_BASE=/home/tomcat/apache-tomcat-8.5.11

ExecStart=/home/tomcat/apache-tomcat-8.5.11/bin/startup.sh
ExecStop=/home/tomcat/apache-tomcat-8.5.11/bin/shutdown.sh

User=tomcat
Group=tomcat
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the daemon with systemctl tool
```bash
sudo systemctl daemon-reload
sudo systemctl enable tomcat.service
sudo systemctl restart tomcat.service
```
