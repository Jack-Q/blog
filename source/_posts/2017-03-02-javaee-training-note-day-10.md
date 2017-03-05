---
title: JavaEE Training Note - Day 10
date: 2017-03-02 21:13:39
comment_id: 20170302-JEENOTE-10
tags:
  - java
---

From this day, the training schedule goes to the coding stage of 
the development project. There will be no central topic of the notes,
but a set of records of problems and technics. 

<!-- more -->

Spring MVC Interceptor
----------------------

In the common browser based web project, the develop pattern is 
the request and response cycle. At each point within the cycle, 
some process logic can injected into these cycle. The can be achieved by 
the `HandlerInterceptor`, which is designed to add process logic before the 
request handler and after the process of the request handler. This is 
a typical illustration of the AOP, Aspect Oriented Program, one of 
feature that the core Spring Framework supports.

The `HandlerInterceptor` interface is defined as the following:
```java
public interface HandlerInterceptor {

	boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception;

	void postHandle(
			HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
			throws Exception;

	void afterCompletion(
			HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception;
}
```
The `preHandle` is invoked before the handler in the controller, and the result of the invocation 
can be used to determine the determination of the futher process. Some common logic can be 
processed in this stage including the access control, the authentication and authorization, 
transformation of the input data, as well as other common control logic for preparation of the result.  
The notable feature of this is its `boolean` result value

The `postHandle` is invoked after the handler in the controller while before the process of 
view rendering. This is used to change or append more attribute to model after control logic.
For example, some environment requires each page to be signed and the signature required to be 
inserted into page content. The notable feature of this is its `ModelAndView` parameter.

The `afterCompletion` is invoked after the generation of response. This can be used to append some information
to the final result, including teh legal or copyright notes. 

A simple use of this feature is the `HandlerInterceptorAdapter`, which provides default implementation of 
these methods. The demand process logic can be inserted by overriding 
the corresponing method.

Get Url of current request
--------------------------

In some cases, the original Url of the current page is required. 
However, this is not as simple as expectation. In Servlet environment,
the original HTTP request data frame is decomposed and used to construct
the `HttpServletRequest` object. With this data, the original Url can be 
recovered in the following manner:

```java
 public static String getCurrentUrl(HttpServletRequest request) {
        String url;
        url = request.getScheme() + "://" + request.getServerName()
                + ((request.getScheme().equals("http") && request.getServerPort() == 80)
                || (request.getScheme().equals("https") && request.getServerPort() == 443) ? "" :
                ":" + request.getServerPort());
        url += request.getServletPath();
        if (request.getQueryString() != null) {
            url += "?" + request.getQueryString();
        }
        return url;
    }
```

In this function, the default port number is elipsised which is the action done by 
most of client browser. The query string is appended at the end of the string.

However, this code is still cannot perfectly resolve this problem. 
Some other scenarios may leads to problem. 

* In an inner network system, the request received is actually a proxy package 
  generated from the portal server. Hence, the original can never acquired with
  the information of the server. However, most reverse proxy solution 
  provides extra HTTP request headers to include these data. Thus, the final
  solution depends on the serve configuration.

* The hash tag section of teh URL are not sent by the client browser, even though 
  the hash tag is an important component of Url. To get the information of 
  hash tag, the participance of client JavaScript is required.

* The history API and `PushState` function is a new API defined in HTML 5. This makes 
  the client Url displayed in address bar changed without a actual page request.
  As the previous one, this can also be resolved by involving client JavaScript.
