---
title: JavaEE Training Note - Day 04
date: 2017-02-23 09:12:20
comment_id: 20170223-JEENOTE-04
tags:
  - Java
---

Today's first topic is the bi-directional communication with
WebSocket using Spring Framework. By using the `SockJS` library as well as support on 
server side, some other techniques including the XHR polling and
XHR streaming are provided as fallbacks. The STOMP is a sub-protocol 
under the WebSocket protocol, which use Pub/Sub pattern to manage messages.
Another topic of today is integration of Hibernate into Spring MVC.

<!-- more -->

Simple WebSocket using Spring
-----------------------------

Begin from version 4 and later, the Spring Framework add some new components to support
WebSocket. First add related dependencies to project. If using Gradle as build tool,
add the following dependency: `compile 'org.springframework:spring-websocket:4.3.6.RELEASE'`
(alternate the version number accordingly).

On the server side, `WebSocketHandler` can handle the data sent from client and 
send data back to client. Create a new class that extends the `TextWebSocketHandler`
as a starting point. The following code shows a simple WebSocket handler that echo 
to client what it is received.

```java 
package jackq.mvc.handler;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

// WebScoket Handler
public class WSHandler extends TextWebSocketHandler{

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
        System.out.println("WS-HANDLER: Message received");
        System.out.println("Payload: >>> \n" + message.getPayload() + "\n <<<");
        // simple echo server
        session.sendMessage(new TextMessage(message.getPayload()));
    }
}
```

Then, register the handler to Spring in `dispatcher-servlet.xml`. 

```xml
<!-- dispatcher-servlet.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:websocket="http://www.springframework.org/schema/websocket"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd
            http://www.springframework.org/schema/websocket 
            http://www.springframework.org/schema/websocket/spring-websocket.xsd 
            http://www.springframework.org/schema/mvc 
            http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!-- ... -->

    <bean id="ws-handler" class="jackq.mvc.handler.WSHandler" />

    <websocket:handlers>
        <!-- register the handler to '/app/' -->
        <websocket:mapping path="/app/" handler="ws-handler"/>
    </websocket:handlers>

</beans>
```
Then add some client JavaScript to interact with the server using standard WebSocket API.
```javascript 
document.onload = () => {
    const sock = new WebSocket("ws://localhost:8080/app/"),
        logNode = document.getElementById("log"),
        log = l => logNode.innerHTML += l + '\n';

    sock.onopen = e => log("[OPEN]");

    sock.onmessage = e => log('[RCV]' + e.data);

    document.getElementById("send").onclick = () =>{
        const msg = document.getElementById("msg").value.trim();
        log('[SEND]' + msg);
        sock.send(msg);
    };
}
```
Add the JavaScript to a webpage contains the following element, then the 
Spring server can response to client when the data is received.

```html
<textarea id="msg"></textarea>
<button id="send">send</button>
<br>
<pre id="log">
```

Serving Frontend Resource with WebJars
--------------------------------------
Before the configuration of other features relating to WebSocket in Spring, there is 
some preparation work that requires to be done. Since the WebSocket requires 
both the client and server to work together to exchange data bidirectionally,
some browser side components are also vital in the whole program. Therefore,
prepare and serve the client side library is the first thing need to done.

Even though there already are several JavaScript based options to choose, there are also
Java based solutions with tighter integration to Spring server, which including the awesome
WebJars project.

### Basic setup

WebJars project repack the frontend library into JARs and manage the dependency relationships
of the packages with maven. For example, the jQuery library can be acquired from the 
following maven coordination: `org.webjars:jquery:3.1.0`. Add it to build configuration
or download the jar package to classpath (while in this method, the dependencies will not be 
able to resolve automatically).

Next, to access these resources in Spring MVC, use the following pattern: 
```html
<script src="${pageContext.request.contextPath}/webjars/jquery/3.1.0/jquery.min.js"></script>
```
And add the resources mapping in Spring MVC configuration file: `dispatcher-servlet.xml`.

```xml
<mvc:resources mapping="/webjars/**" location="/webjars/, /resources/" >
    <mvc:cache-control cache-public="true" max-age="2592000"/>
</mvc:resources>
```

### Version agnostic path 

Since the frontend packages always update frequently, the WebJars provides
a version agnostic path resolver that automatically finds a suitable version
of package. 

First, add the following package into project: `org.webjars:webjars-locator:0.32`.
In a recent update to Spring Framework, the WebJars Locator can be automatically
loaded by Spring. Thus, without no further configuration, just remove the version
number form the package then the magic works.

```html
<script src="${pageContext.request.contextPath}/webjars/jquery/jquery.min.js"></script>
```

Using SockJS
------------

As mentioned in the beginning, add `SockJS` to project to support more browser with some 
fallback techniques when native WebSocket is not available.

First add the client library to project with maven coordination: `compile 'org.webjars:sockjs-client:1.0.2'`.
Then load it into web page with following tag:
```html
<script src="${pageContext.request.contextPath}/webjars/sockjs-client/sockjs.min.js"></script>
```

Next update the server to enable support to SockJS protocol. The SockJS protocol add an extra 
step before the handshake of WebSocket to report client capability and negotiate the protocol to 
use. This is done by accessing to an endpoint which append `/info` to the end of the declared endpoint.
Then the server reply the specific endpoint for suitable protocol to access. The updated handler 
registration will be similar to the following one.

```xml
<websocket:handlers>
    <websocket:mapping path="/app/" handler="ws-handler"/>
    <!-- SockJS fallback option -->
    <websocket:sockjs />
</websocket:handlers>
```

As a important philosophy of `SockJS` is to follow the `WebSocket` API as close as 
possible, there are not much update required to the previous code.
Then replace the `WebSocket` with `SockJS` in the client script to meet the server configuration.

```javascript
document.onload = () => {
    // use the SockJS library 
    // connect to /app/ end point (an http protocol endpint)
    const sock = new SockJS("/app/"),
    
    // ...
}
```

STOMP and Message Architecture
------------------------------------

The WebSocket is a relative lightweight framework that provides few definitions
for formatting and framing message, controlling and managing the connection, etc.,
which is just like the bare TCP protocol that is not quite easy to use.
Just like the HTTP protocol on top of the TCP protocol which provides more functions 
then the TCP and is being used by more users, some sub-protocols 
are also defined to manage message on WebSocket. In the following examples,
the STOMP (Simple Text Oriented Message Protocol) sub-protocol is used as application 
level protocol. 

The STOMP protocol create a Pub/Sub (Publisher/Subscriber) pattern across the 
client and server. After a client create a session (a connection between client 
and server) with the server, it can sent message to or subscribe to some message
queue labeled by destination. When a message is pushed into a destination, 
all of the connected subscribers of a destination will receive the message.

To manage the different queues of messages defined in STOMP protocol, Spring 
use message broker to wrap the original based WebSocket or SockJS. Then the message can be 
maintained by a `simple-broker` provided by Spring or redirect to full featured 
message broker like `RabbitMQ`. Here, for simplicity, the `simple-broker` is used.

Since all of the subscribers of a destination will receive the message published in it,
the `simple-broker` use some conversion to transform the destination name to distinguish
different level of message including broadcast, single-user or point-to-point(single session).
Some rules are listed below:

* Each mapped name within the server can be prefixed in order to prevent conflict with other queue name.
  This can be configured with key `application-destination-prefix` for `websocket:message-broker`.
  For example, a message handler is mapped to `/hello` in server will handle message 
  sent to `/app/hello` destination when the prefix is configured as `/app`;

* The prefix `/topic` is used to indicate a broadcast message. By default, the return value of 
  a message handler mapped to `/hello` without extra configuration will be push to destination
  `/topic/hello` which can be subscribed by client;

* The prefix `/queue` is used to indicate a point to point message. 

As Spring document illustrated, the prefixed destination have the relationships show in following diagram:

```txt
  Client Side         Spring Message Handler 
                  /app/<dest.>
   [Message]        |---> [Annotation] --|
   ---------        |                    |
   /app/...     ----|                    |
                       Simple Broker     |
   /topic/...   ----|                    |
                    | /topic/<dest.>     |
                    |--->  [Dest.] <-----|
   Subscriber <--------------|                  
```

Using STOMP
-----------

To use STOMP in Spring, first add the configuration at the `dispatcher-servlet.xml`.
The following code are used to configure the simple broker.
```xml 
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:websocket="http://www.springframework.org/schema/websocket"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/websocket http://www.springframework.org/schema/websocket/spring-websocket.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!-- other configurations ... -->

    <websocket:message-broker application-destination-prefix="/app">
        <websocket:stomp-endpoint path="/message/">
            <websocket:sockjs session-cookie-needed="true" />
        </websocket:stomp-endpoint>
        <websocket:simple-broker prefix="/topic, /queue" />
    </websocket:message-broker>
</beans>
```

Some other packages are required, including Jackson and STOMP client library.
Since the message are encoded in JSON, the Jackson library is used to 
manage the conversion with POJO. The maven coordinations required are 
`com.fasterxml.jackson.core:jackson-core:2.8.7` and 
`com.fasterxml.jackson.core:jackson-databind:2.8.7`
 The latter can be acquired from WebJars. The maven coordination required
 is `org.webjars:stomp-websocket:2.3.3`.

Then the message can be handled in general Spring MVC Controller.
Apart from making response to incoming message, application can 
publish message at any point of the program by using an injected 
`SimpMessagingTemplate` instance. The following controller shows te 

```java 
package jackq.mvc.controller;

import jackq.mvc.model.HelloMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/", "/home/"})
public class Home {

    // Use template to send message at arbitary point 
    private final SimpMessagingTemplate template;

    @Autowired
    public Home(SimpMessagingTemplate template) {
        this.template = template;
    }

    @RequestMapping("/")
    public String Index(){
        return "home/index";
    }

    @RequestMapping("/hello")
    public String Hello(@ModelAttribute("message") HelloMessage message){
        // Convert a string to the payload of a message 
        template.convertAndSend("/topic/hello", String.format("%s says %s", message.getName(), message.getMessage()));
        return "home/hello";
    }

    @MessageMapping("/hello")
    public String HelloMessage (HelloMessage message){
        String greeting =  String.format("%s says %s", message.getName(), message.getMessage());
        System.out.println(greeting);
        // This message will be published at /topic/hello
        return greeting;
    }
}
```

The client JavaScript also need to update to utilize the new message model.
```javascript
document.ready = () => {
    const sock = new SockJS("/message/"),
        stomp = Stomp.over(sock),
        log = l => document.getElementById("log").innerHTML += l + '\n';

    document.getElementById("send").onclick = () =>{
        stomp.send('/app/hello', {}, JSON.stringify({
            name: document.getElementById("name").value.trim(),
            message: document.getElementById("message").value.trim()
        }));
    };

    // Connect to server
    stomp.connect({}, () =>{
        // Subscribe server message 
        stomp.subscribe('/topic/hello', msg => log("[Hello]" + msg.body));
    }, (err)=>log(err.headers.message));

    // print debug message
    stomp.debug = msg => document.getElementById("debug-log").innerHTML += msg + '\n';
}
```

Currently, any connected client can receive message from server when any client 
publish one to the queue or submit it via web from.

Hibernate with Spring MVC
-------------------------

(This is continued on the progress of the last day.)

### Layered Architecture

The general used pattern of Spring MVC application split the application
into multiple layers from top to bottom listed as follows:
(That is form the layer closest to the user client to server)

* the representation layer: including the Spring MVC controller 
  and the JSP pages (or other view technologies). Control the appearance of the 
  whole application;

* the business layer: including the logic for core functionalities of the application. 
  These logic are sharable to multiple controllers and generally named as Service;

* the persistence layer: including the data access object (DAO) and directly interact with the server;

* the entity: object model that holds the data in memory.

### Hibernate as persistence layer

Some beans are required to integrate Hibernate into Spring MVC. The xml definition are listed 
as follows:

```xml 
<!-- data source -->
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.user}"/>
    <property name="password" value="${jdbc.pass}"/>
</bean>

<!-- session factory -->
<bean id="sessionFactory" class="org.springframework.orm.hibernate4.LocalSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="packagesToScan">
        <list>
            <!-- Package where Hibernate find data model -->
            <value>jackq.spring.hibernate.entity</value>
        </list>
    </property>
    <!-- hibernate configuration file -->
    <property name="configLocation" value="classpath:hibernate.cfg.xml"/>
</bean>

<!-- transaction manager -->
<bean id="transactionManager" class="org.springframework.orm.hibernate4.HibernateTransactionManager">
    <property name="sessionFactory" ref="sessionFactory"/>
</bean>
<!-- enable annotation based transaction manage -->
<tx:annotation-driven transaction-manager="transactionManager"/>
```

### Sample service 

Service process data and interact with DAOs.

```java 
// Annotated as Service
@Service
public class BookServiceImpl implements BookService {
    // Inject DAO 
    @Autowired
    private BookDao bookDao;

    // Inject another DAO 
    @Autowired
    private BookLoanDao bookLoanDao;

    @Override
    public Book getBook(int id) {
        return bookDao.getBookById(id);
    }

    @Override
    public BookCopy getBookCopy(int id) {
        return bookDao.getBookCopy(id);
    }
}
```

### Sample DAO 
A DAO manage actions related to one table.
```java 
// Repository annotates a DAO 
@Repository
// Transactional annotates the manage of transaction
@Transactional
public class BookDaoImpl implements BookDao {
    // Inject session factory
    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public Book addBook(Book book) {
        Session currentSession = sessionFactory.getCurrentSession();
        currentSession.persist(book);
        return book;
    }

    @Override
    public Book updateBook(Book book) {
        Session currentSession = sessionFactory.getCurrentSession();
        currentSession.update(book);
        return book;
    }
}
```
