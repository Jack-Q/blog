---
title: JavaEE Training Note - Day 03
date: 2017-02-22 17:44:32
comment_id: 20170222-JEENOTE-03
tags:
  - Java
---

Continued on the introduction to `Servlet` and `Spring MVC` library, the main 
content of the third day is detailed illustration of web site using 
`Spring MVC`. Another main point is the `Hibernate ORM` library which is used 
to unify and simplify the process of database connection and data transaction.

<!-- more -->

Basic Spring MVC
----------------

`Spring MVC` use standard `Servlet` to handle web request. Instead of generate 
response directly, `Spring MVC` dispatches the request to corresponding 
registered handler which is a method of a controller class. By using the 
AOP function of Spring Framework, there are some other action performed before
and after the request handler, including the model data parsing, view rendering, etc.

To config the `Spring MVC` framework, first step is download the required 
dependencies. This is the same as the core module which is acquired form its
official site [spring.io](https://spring.io/). Before the following steps, all 
of the dependency `JAR`s are all accessible from the `classpath`.

The standard web applications in Java are configured in `web.xml`, in which the 
definitions and mappings of the `servlet`, the `interceptor`, and the `listener`
are located. There are also some other meta data affecting thre whole site are listed 
in this configuration file. In this step, the `web.xml` is in the following form.

```xml
<!-- web.xml : configuration for Java web application-->
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
         http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
    
    <!-- define the application wide context location -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/applicationContext.xml</param-value>
    </context-param>

    <!-- the context loader of spring  -->
    <!-- defined as a listener to ensure that 
         this is loaded in advance of the first web request -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!-- the spring dispatcher servlet -->
    <!-- all of the request mapped to this servlet 
         will be handled by the Spring MVC application  -->
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!-- use Spring MVC to handle all of the request -->
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```
In this project, the annotation based configuration will be used. Therefore,
in the `dispatcher-servlet.xml` file, only the package names in which the 
controllers are needed to resolve are listed. This configuration file will be loaded by
the first time the `dispatcher` servlet is loaded. The defualt name 
of this file should be `<servlet-name>-servlet.xml`, which is free from specifying 
explicitly. Otherwise, this file should be configured at `web.xml`.

```xml 
<!-- dispatcher-servlet.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- specify the package in which components are searched -->
    <context:component-scan base-package="jackq.mvc" />
    
    <!-- define the rule to resolve the view returned by handler -->
    <!-- the following rule will map 'home' tp '/WEB-INF/view/home.jsp' -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/view/" />
        <property name="suffix" value=".jsp" />
    </bean>
</beans>
```

With the xml configurations represented above, the core MVC components will be 
implemented as follows. In the first test, there is only a simple page 
without `Model`. This site is merely the routing from dispatcher to controller,
then from the controller to view.

The controllers are plain Java class which is annotated with `@Controller`.
Inside of the controller, each method with annotation `@RequestMapping` can be mapped 
to a specified url pattern. Without explicit annotation, the meaning of return value 
is determined by its type. The simplest one is a `String` representing the path to
view (which will be transformed by the rules defined in view resolver).

The following code is the most simple controller class.

```java
package jackq.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// specify a controller 
@Controller
// map this controller to '/' or '/home/'
@RequestMapping({"/", "/home/"})
public class Home {

    // map to '/' or 'home'
    // concated to the controller class level mapping
    @RequestMapping("/")
    public String Index(){
        // return the name of the view
        return "home/index";
    }
}
```

With a JSP page placed at `WEB-INF/view/home/index.jsp`, the content will be shown in
browser after launching the site via web container like `Tomcat`, `Jetty`, etc.

At this point, the directory structure may similar to the following one:

```txt
/ root directory
└── WEB-INF
    ├── applicationContext.xml
    ├── dispatcher-servlet.xml
    ├── lib
    │   └ .... spring jar files
    ├── classes
    │   └── jackq
    │       └── mvc
    │           └── controller
    │               └── Home.class
    ├── src
    │   └── jackq
    │       └── mvc
    │           └── controller
    │               └── Home.java
    ├── view
    │   └── home
    │       └── index.jsp
    └── web.xml
```

Spring MVC with from
--------------------

One of the most useful feature of `Spring MVC` is its mapping from html from to 
Java object. Based on the previous example, this application will first add a 
model class `` defined as follows:

```java 
// Model class for test, this is merely a POJO 
package jackq.mvc.model;

public class HelloMessage {
    private String name;
    private String message;

    public HelloMessage() {
    }

    public HelloMessage(String name, String message) {
        this.name = name;
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

Then update the controller. Inside the `Home` controller class, add another 
method `Hello` which get message from requset parameter
(either the request body or the url parameter). Then add the `@ModelAttribute`
annotation to the parameter of the method which is in the type of `HelloMessage`.
This annotation tells the `Spring MVC` to abstract parameter from request and 
fill into the message object and then add this object to current `Model`
which can later be accessed in view. The updated `Home` controller shows as follows:

```java 
package jackq.mvc.controller;

import jackq.mvc.model.HelloMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/", "/home/"})
public class Home {

    @RequestMapping("/")
    public String Index(){
        return "home/index";
    }

    @RequestMapping("/hello")
    public String Hello(@ModelAttribute("message") HelloMessage message){
        return "home/hello";
    }
}
```
Then add two view with a form to collect data and a page to represent data:

```html
<%-- home/index.jsp : a form to collect data --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<form action="hello" method="post">

    <label for="name">Name: </label>
    <input id="name" name="name" />
    <br>

    <label for="message">Message: </label>
    <input id="message" name="message" />
    <br>

    <input type="submit" value="Submit" />
</form>
```

```html 
<%-- home/hello.jsp : a page to display data -->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%-- data object in Model can be access in view -->
${message.name} says ${message.message}.
```

After launching this page in Servlet container, view the page in browser 
and fill-in the form. Then the message will be shown in the browser.


Hibernate ORM & JPA
-------------------

Hibernate ORM is an Object/Relational Mapping library. 
It is configured in `hibernate.cfg.xml` by default.

The following sample is a simple program to perform CURD action with Hibernate.
Besides, the transaction and annotation based configuration are also used in this program.

```xml 
<!-- hibernate.cfg.xml -->
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="connection.url">
            jdbc:mysql://localhost:3306/hibernate_test?useSSL=false&amp;createDatabaseIfNotExist=true
        </property>
        <property name="hibernate.dialect">
            org.hibernate.dialect.MySQLDialect
        </property>
        <property name="hibernate.connection.driver_class">
            com.mysql.jdbc.Driver
        </property>
        <property name="connection.username" >root</property>
        <property name="connection.password">root</property>

        <!-- DB schema will be updated if needed -->
        <property name="hbm2ddl.auto">create</property>

        <!-- Display SQL in log for debug -->
        <property name="show_sql">true</property>

        <!-- Mapping using class with JPA annotation -->
        <mapping class="jackq.hibernate.Hello" />
    </session-factory>
</hibernate-configuration>
```

```java 
// Model class 

package jackq.hibernate;

import org.hibernate.Session;
import java.util.List;


public class HelloDao{
    private Session session;
    public HelloDao(Session session){
        this.session = session;
    }

    void addHelloMessage(Hello hello){
        session.persist(hello);
    }

    List<Hello> listHelloMessage(){
        List<Hello> list =  (List<Hello>) session.createQuery("from Hello").list();
        return list;
    }

    void deleteHelloMessage(Hello hello){
        session.delete(hello);
    }

    void updateHelloMessage(Hello hello){
        session.update(hello);
    }

    Hello findHelloMessageById(int id){
        return session.byId(Hello.class).load(id);
    }
}
```

```java 
// DAO: data access object
package jackq.hibernate;

import org.hibernate.Session;

import java.util.List;


public class HelloDao{
    private Session session;
    public HelloDao(Session session){
        this.session = session;
    }

    void addHelloMessage(Hello hello){
        session.persist(hello);
    }

    List<Hello> listHelloMessage(){
        List<Hello> list =  (List<Hello>) session.createQuery("from Hello").list();
        return list;
    }

    void deleteHelloMessage(Hello hello){
        session.delete(hello);
    }

    void updateHelloMessage(Hello hello){
        session.update(hello);
    }

    Hello findHelloMessageById(int id){
        return session.byId(Hello.class).load(id);
    }
}
```

Test code:

```java 
// Test class 
package jackq.hibernate;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

public class Main {
    private static final SessionFactory ourSessionFactory;

    static {
        // Create session factory on the startup of the application
        try {
            StandardServiceRegistry registry = new StandardServiceRegistryBuilder().configure().build();

            ourSessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static Session getSession() throws HibernateException {
        return ourSessionFactory.openSession();
    }

    public static void main(final String[] args) throws Exception {
        final Session session = getSession();
        try {
            HelloDao dao = new HelloDao(session);

            // Create an new transaction
            session.beginTransaction();

            // insert data
            dao.addHelloMessage(new Hello("Jack Q", "Hello"));
            dao.addHelloMessage(new Hello("Jack Q", "Hello 2"));
            dao.addHelloMessage(new Hello("Jack Q", "Hello 3"));
            dao.addHelloMessage(new Hello("Jack Q", "Hello 4"));

            // finish the transaction and commit data 
            session.getTransaction().commit();

            // list data
            dao.listHelloMessage().forEach(System.out::println);

            // find and update object
            session.beginTransaction();
            Hello hello = dao.findHelloMessageById(1);
            hello.setName("Java");
            dao.updateHelloMessage(hello);
            session.getTransaction().commit();


            // find and delete object
            session.beginTransaction();
            dao.deleteHelloMessage(dao.findHelloMessageById(2));
            session.getTransaction().commit();

            // list data again
            dao.listHelloMessage().forEach(System.out::println);
        } finally {
            session.close();
        }

        System.out.println("END");

        // Program will not exit without explicit exit since 
        // Hibernate enable multiple thread feature in this configuration
        System.exit(0);
    }
}
```

Compile and execute the code listed above, the result of two list output operation 
will be similar to the following lines.

```txt
# First list output
(1) Jack Q says Hello
(2) Jack Q says Hello 2
(3) Jack Q says Hello 3
(4) Jack Q says Hello 4

# Second list output
(1) Java says Hello
(3) Jack Q says Hello 3
(4) Jack Q says Hello 4
```