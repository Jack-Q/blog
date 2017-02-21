---
title: JavaEE Training Note - Day 01
date: 2017-02-20 23:42:15
comment_id: 20170220-JEENOTE-01
tags:
  - Java
---

The training content of the first day of this one-month training is 
some genaral concepts of JavaEE development. It also covers some basic 
introduction to some broadly used library/framework including 
`Spring Framework`, `Hibernate ORM`, etc. Besides, some trivals of Java prgramming
language are also recapped in today's content.

<!-- more -->

Web Development in JavaEE
-------------------------

### Three levels of a web site

To divide large web programs to several part by functionality and to arrange the classes,
a common approach is the following one.

#### Presistence Laevl

The level that store and retrive data between memory and database (or other presistences).
Classes in this level are generally called `DAO`, the Database Access Object.

#### Bussiness level

The level in which the applcation performs specific actions to presisted data as a demand of 
user (requesting from upper level). Classes in this level are named as Service.
Generally, this level interacts with multiple DAOs.

#### Presentaion level 

The level which the end user can view and interact with directly, which is UI (User Interface).
It can be either a web page (including the JSP page for rendering or other templating methods),
a mobile applcation communicate with server via web API, a WeChat offical accounts or mini-program, etc.

Between these levels, a `DTO`, Data Transfer Object is generally used to transfer data.

Some Trivals in Java
--------------------

Java is a mature object oriented programming language with about two-decade involvement.
A great set of features were added after its initial release during last time. 

### initialization block 

Initialization block is used to initialize static fields of class or fields of object
and can be categoried as two types: initialization block and static initialization block;

Initialization block is used for initial non-static fields of object. It is executed before
the first line of constructor (excluding the passible `super()` expression). It will be executed 
on each time when a new object of this class is created. When multiple initialization blocks
are presented whthin a single class, they will be executed from top to bottom sequentially.
For example:

```java
class InitBlock {
    private String field1;
    private Date today;

    {
        // first block
        field1 = "Field 1";
    }
    {
        // second block
        today = new Date();
        System.out.println(this.today);
    }
    public InitBlock(){
        // constructor
    }
}

```
Static initialization block is used to initialize the static fields. It will be excuted on the first time
when the class is been loaded into JVM. For example:

```java
class InitBlock {
    private static String field1;
    private static Date today;

    static {
        // first block
        field1 = "Field 1";
    }
    static {
        // second block
        today = new Date();
        System.out.println(InitBlock.today);
    }
    public InitBlock(){
        // constructor
    }
}
```


### summary of usage of `this`

As following list:

* `this` is a reference in Java which represent the current object itself;
* `this` is invokable and refers to constructors in this scenario, like `this();`;
* `this` can be used to clarify or specify a varibale when which is a field of an object.
  For example: `this.field1`;
* `this`can be used to specify the current onject in nested class by prepending
  the class name, like `Class1.this`;


### annotation

`annotation` is a new feature added in JDK 1.6, which provides a way for 
programmer to add extra meta data to a class, a method, a field, a varibale, 
a parameter or a package. The annoteted data can be retrived at both compile time and execution time.
The `reflection` API in Java provades approach to use these meta data at execution time.  

The most common one defined in JDK is `@Override`, which emphersises that the current method
is intented to override an corresponding method. It is widely used in `Spring Framework` 
and `Hibernate` in recent release targeting at JDK 1.6 or later.

Libraries & Frameworks
----------------------

### `Spring Framework`

`Spring Framework` is a container to manage Java object. Some keywords related to `Spring Framework` ist as follows:

`IoC`, Inversion Of Control. This is a general concept descriping the phenomena that a object method which use 
the function provided by another class has no control logic related to the lifecycle of the funciton provider object.

`DI`, Dependency Injection, an approach to achieve the `IoC` function. 

`AOP`, Aspect Orientred Programming. Cut the core bussiness process into multiple layers and insert different 
process logic into different layers as steps applied to each transaction. For example, when a web server process
an HTTP request and response to it, though the process may vary from each specific request, the following steps
are applicable to all of them, including the request parsing step, the request logging step, the security check step, 
the paramater abstraction step, the bussiness logic processing step, the content generating step, etc. Each step can be 
treated as an aspect of the process and connected by the framework.

Basides the core features, Spring also provides some other conponents to provides more functionalities.
The `Spring MVC` provides Model-View-Controller pattern management like the `Structs` does. The `Spring Security`
provides authentication features like the `Sherio` does. 

### `Hibernate ORM`

*ORM* is an abbriviation of *object-relational mapping*. It is used to resolve the problem of the 
mismatch of in-memory object of object-oriented language like Java and presisted data record of 
relational database like MySQL.