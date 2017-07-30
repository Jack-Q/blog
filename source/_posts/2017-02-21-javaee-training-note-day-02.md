---
title: JavaEE Training Note - Day 02
date: 2017-02-21 12:57:05
comment_id: 20170221-JEENOTE-02
tags:
  - Java
---

The main content of the second day is some detail about the `Spring Framework`,
including elaboration of the core concepts in `Spring`, how to set up the 
framework, and XML file based configuration as well as annotation based 
configuration. Apart from the core framework, `Spring MVC` is also mentioned.

<!-- more -->

Spring IoC Startup
------------------

The core module of the Spring project is the Spring Framework which provides 
the functionalities to manage objects as well as their dependency relationship
in large application. Spring implemented an object container that can be configured via 
either XML file or annotation (there is also a code based configuration).

### Concepts

Spring implemented a container to manage the lifecycle of Java object, it also introduced 
or involved a set of concepts which are different from the manually managed objects.

* `IoC`: Inversion Of Control;
* `DI`: Dependency Injection;
* `BeanFactory`: basic container to manage lifecycle of managed objects. It providing basic support for DI;
* `ApplicationContext`: more advanced container to manage lifecycle of managed objects. 
  It provides more features including listener registration for handling certain change of application context;

### Set up Spring Framework IoC

Spring Framework is released and distributed in a serial of `jar` (Java ARchive) file. These file can be acquired 
from its official site: [spring.io](https://spring.io/). With the assist of IDE, the `jar` files can be downloaded
automatically. When all of the `jar` files are accessible in `classpath`, then the Spring `IoC` container is 
ready to use.

The following code is a simple sample shows the `IoC` container of spring.

```java 
// Interface class: convention between class consumer and provider 
package jackq.springioc.helloworld;

public interface HelloMessage{
    String getMessage();
}
```

```java
// Implementation class: managed by Spring 
package jackq.springioc.helloworld;

public class HelloMessageImpl implements HelloMessage {
    @Override
    public String getMessage() {
        return "Hello World";
    }
}
```

```java
// Main class: the entry point
package jackq.springioc.helloworld;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {
    public static void main(String[] args){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("ContextBeans.xml");
        HelloMessage helloMessage = (HelloMessage) ctx.getBean("helloMessage");
        System.out.println(helloMessage.getMessage());
    }
}
```

```xml
<!-- XML based container configuration -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
       http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean class="jackq.springioc.helloworld.HelloMessageImpl" id="helloMessage"  />
</beans>
```

### Dependency Injection

Dependency injection is used to decouple the dependency of an class consumer with the implementation of the class.
The most simple approach to use a class is instantiate an object while this process is generally highly related 
to the implementation of the class. When the class provider and the class consumer make a conversion (a Java `interface`),
the class consumer can use the class without knowledge about its implementation. This class should be instantiate in advance
and inject into the consumer class to use it. This is `DI`.

### Class Instantiation 

To create an instance of dependency class, the most basic usage is create via default or no-argument constructor. The example 
of this process is show in previous section.

### Class Instantiation with Argument

It's common that the constructor of a class has argument. This can be specified in XML.
The following code shows the XML configuration with constructor arguments.

Class definition preparation for this example:

```java 
package jackq.springdi.helloworld;

// Test class 1
public class Test1{
    public Test1(int arg1, int arg2) {
    }
}
```

```java 
package jackq.springdi.helloworld;

// Test class 2
public class Test2{
    public Test2(String arg1, Test1 arg2) {
    }
}
```

XML configuration:

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- position based configuration -->
    <bean id="test1-1" class="jackq.springdi.helloworld.Test1">
        <constructor-arg index="0" value="1"/>
        <constructor-arg index="1" value="1"/>
    </bean>

    <!-- name based configuration -->
    <bean id="test1-2" class="jackq.springdi.helloworld.Test1">
        <constructor-arg name="arg1" value="1"/>
        <constructor-arg name="arg2" value="1"/>
    </bean>

    <!-- default position based configuration -->
    <bean id="test1-3" class="jackq.springdi.helloworld.Test1">
        <constructor-arg value="1"/>
        <constructor-arg value="1"/>
    </bean>

    <!-- determined by the type of the argument -->
    <bean id="test2-1" class="jackq.springdi.helloworld.Test2">
        <constructor-arg ref="test1-1" />
        <!-- this is constructor based DI already -->
        <constructor-arg value="str" />
    </bean>

</beans>
```

### Construction based DI 

Most dependency classes have their own dependencies as well. Their dependency can be
injected by construction argument or setter method (next section).
The following code shows the constructor based DI.

(Use the class definition in previous section)

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- bean definition -->
    <bean id="test1" class="jackq.springdi.helloworld.Test1">
        <constructor-arg index="0" value="1"/>
        <constructor-arg index="1" value="1"/>
    </bean>

    <bean id="test2-1" class="jackq.springdi.helloworld.Test2">
        <!-- specify by ref -->
        <constructor-arg ref="test1" />
        <constructor-arg value="str" />
    </bean>

    <bean id="test2-2" class="jackq.springdi.helloworld.Test2">
        <!-- specify inline -->
        <constructor-arg>
            <bean class="jackq.springdi.helloworld.Test1">
                <constructor-arg index="0" value="1"/>
                <constructor-arg index="1" value="1"/>
            </bean>
        </constructor-arg>
        <constructor-arg value="str" />
    </bean>
</beans>
```

### Setter based DI 

To have more control to the field of class, most class filed are implemented as private field
and access and modify them via a pair of methods named `getter` and `setter`. 
The following code shows the setter based DI.

Another test class for this type of configuration:

```java 
package jackq.springdi.helloworld;

public class Test3{
    // this is the dependency class required to be injected 
    private Test1 test1;
    
    public Test3() {
    }

    public Test1 getTest1() {
        return test1;
    }

    public void setTest1(Test1 test1) {
        this.test1 = test1;
    }
}
```
XML configuration:

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- bean definition -->
    <bean id="test1" class="jackq.springdi.helloworld.Test1">
        <constructor-arg index="0" value="1"/>
        <constructor-arg index="1" value="1"/>
    </bean>

    <bean id="test3-1" class="jackq.springdi.helloworld.Test3">
        <!-- specify by ref -->
        <property name="test1" ref="test1" />
    </bean>

    <bean id="test3-2" class="jackq.springdi.helloworld.Test3">
        <!-- specify inline -->
        <property name="test1">
            <bean class="jackq.springdi.helloworld.Test1">
                <constructor-arg index="0" value="1"/>
                <constructor-arg index="1" value="1"/>
            </bean>
        </property>
    </bean>
</beans>
```

### Auto-wiring

`Singleton` is one of the most common design pattern in Java (as well as other object oriented programming language).
It means that the program or application keeps only one single instance of a class. 

If the dependency of one class is a `singleton`, there is no need to specify which instance should be injected and the 
process can be achieved automatically. This is auto-wiring.

The following code is a simple sample.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- bean definition -->
    <bean id="test1" class="jackq.springdi.helloworld.Test1">
        <constructor-arg index="0" value="1"/>
        <constructor-arg index="1" value="1"/>
    </bean>

    <!-- the field of this class is specified as autowire, 
         then the only candidate of this type, 
         that is test1 will be injected -->
    <bean id="test3" class="jackq.springdi.helloworld.Test3" autowire="byType" />
</beans>
```

### Annotation based DI configuration

Annotation is a language feature in Java which provides a interface to attach extra meta data to 
a class, an interface, a method, a parameter, etc. The extra meta data can be accessed by program
at execution time dynamically. Thus, the Spring `IoC` container can use these meta data to 
get the configuration information.

To enable this feature in Spring, the following elements should be added into the XML configuration file.
```xml 
<!-- namespace content defined as: "http://www.springframework.org/schema/context" -->
<!-- this should be inserted before the definition of the first bean -->
<context:annotation-config/>
```
Some common annotation are defined by Spring:

* `@Autowired`: autowire a dependency. This can be used on field and constructor argument;
* `@required`: specify that a field is a required dependency. When context or factory is initialized, the 
   unsatisfied required filed will throw exception to prevent incomplete dependency. This is annotated on 
   the corresponding setter method;
* etc.

Beside the core library of Spring framework, other modules are also use annotation widely, such as the 
annotation configuration for MVC class.

The following code is a simple example of `@Autowired`.

```java 
package jackq.springdi.helloworld;

import org.springframework.beans.factory.annotation.Autowired;

public  class Test4{
    @Autowired
    private Test1 test1;

    public Test4() {
    }

    public Test1 getTest1() {
        return test1;
    }

    public void setTest1(Test1 test1) {
        this.test1 = test1;
    }
}
```
```xml 
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/tool 
       http://www.springframework.org/schema/tool/spring-tool.xsd">

    <!-- enable annotation config-->
    <context:annotation-config />

    <!-- bean definition -->
    <bean id="test1" class="jackq.springdi.helloworld.Test1">
        <constructor-arg index="0" value="1"/>
        <constructor-arg index="1" value="1"/>
    </bean>

    <!-- autowire by annotation -->
    <bean id="test4" class="jackq.springdi.helloworld.Test4" />
</beans>
```

Servlet & Spring MVC
--------------------

MVC represents Model, View, Controller. Most of web page is generated by populate date from 
data and fill them into web page template. Thus, it nature to divide the code of a web site 
into three parts: the model which related to data, view which related to html and template
and the controller which related to the process logics.

In Java, the standard model to process web request is the Servlet model. A web 
application container like Tomcat, Jetty, etc. manages the low level HTTP protocol details
and maps the HTTP request and response with Java object. A servlet is a handler that perform 
the process to fill the response object by data from the request object.

`Spring MVC` combines the standard Servlet with the MVC pattern. It is implemented as a Servlet 
mapped to all of the path and route to specific controller. 


