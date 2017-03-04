---
title: JavaEE Training Note - Day 07
date: 2017-02-27 20:06:20
comment_id: 20170227-JEENOTE-07
tags:
  - java
---

Today's topics are the automatic unit test in Spring MVC and 
the code refactoring in Java. The former is to fully empower the 
test in Java based project, while the latter is to keep a essential 
approach about improving the quality of the source code.

Unit Test
=========

Test is the a indispensible procedure in software engineering. Since software 
are bound to keep updating and iterating, the predefined test cases 
are also required to be executed repeatedly and the set of test case are 
growing all the time within the life time of a software project.
Therefore, we always need to perfoem software test quickly and frequently.
The automatic unit test and integrated test are gradually transited to 
code besed frameworks.

### concepts

In the world of Java, the JUnit library is the most used test framework, while 
another important and popular one is TestNG (refers to Test, the Next Generation).
Without specifying the concrete library manually managed test framework, the unit test
is organized by test cases. Each test case is to assert the program will give the 
specified result on the given condition. 

Since most modules of a program is not isolated with other components, to keep
the test case as simple and quick as possible, the dependencies are also replaced 
with mock objects.

Another concept related to test is coverage test, which is monitoring each 
statement of the cource code to find out whether each code is covered (statement coverage).
Though this level of coverage is not the symbol of the fully tested, a lower state
of coverage is always insufficent.

### test in Spring MVC

Spring provide a test module to integrate into existing test framework and provide 
lightweight test bed (the execution context) with mocking objects.

To get started, include the following packages into projects: (in gradle format)
```groovy
dependencies{
    // ... 
    testCompile 'org.springframework:spring-test:4.3.6.RELEASE'
    testCompile 'junit:junit:4.12'
    testCompile 'javax.servlet:javax.servlet-api:3.1.0' 
}
```

To test a controller action, the create a class with `Test` appended in the same Java package 
of the original package: (testing the home controller)
```java 
public class HomeControllerTest extends AbstractJUnit4SpringContextTests {
    @Test
    public void index() throws Exception {
      // Test code 
    }
}
```

Then create the testing context with following configuration:
```java
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration()
@ContextHierarchy({
        // Specify the xml configuration (or configuration class)
        // can be different from the general version
        @ContextConfiguration("file:src/main/webapp/WEB-INF/applicationContext.xml"),
        @ContextConfiguration("file:src/main/webapp/WEB-INF/applicationConfigure.xml"),
        @ContextConfiguration("file:src/main/webapp/WEB-INF/spring-hibernate.xml"),
        @ContextConfiguration("file:src/main/webapp/WEB-INF/dispatcher-servlet.xml"),
})
public class HomeControllerTest extends AbstractJUnit4SpringContextTests {
    @Autowired
    private WebApplicationContext context;

    // The mock MVC object can be used to perform action as a real user
    private MockMvc mock;

    @Before
    public void setUp() throws Exception {
        this.mock = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void index() throws Exception {
      // Test code 
    }
}
```

Then create the test code. Use inbulit language feature `assert` or use the
more handy assert static methods provided in test framework. The following 
simple test case is used to assert that the page with url `/home/` can be accessed
successfully with `200 OK` status code and the rendered view is `home/index`.
(which is the return value of controller method)

```java
@Test
public void index() throws Exception {
    // Test code 
    this.mock.perform(
            get("/home/")
    ).andExpect(status().isOk())
            .andExpect(view().name("home/index"));
}
```

Refactoring
-----------

Software quality can always be improved by refactoring the original code with 
a more efficient or more elegent version. With the strong typing 
feature, a lot of refactoring or tips can be done with the assist of IDE.

Some refactor consideration including the following points:

* abstract base class: share the logic and prevent repeating;
* extract method: share the logic in more concrete level.
  (for a JSP page, some sharing logic can be shared via `taglib`);
* extract variable: use the name of variable to indicate the program logic without comment;
* less comment: use self-evident named variables and methods to reduce the ammount of 
  comment, which will also reduce the possibility of mismatching and outdated comment;
* ...



