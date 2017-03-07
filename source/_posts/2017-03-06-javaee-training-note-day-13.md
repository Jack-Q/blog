---
title: JavaEE Training Note - Day 13
date: 2017-03-06 10:53:12
comment_id: 20170306-JEENOTE-13
tags:
---

Today's topic is some tips to the solution to the problems in 
deveploment, varying from the frontend development to backend 
presistence technology. 

<!-- more -->

jQuery
------

jQuery is a frontend library which probides a unified api to 
hide the differences of browsers from various vendors. It 
provides a handy and expressive approach to manitplate DOM objects.
Besides, it also contains some utilities for common tasks in 
frontend development.

### basic usage

The basic usage od jQuery is its CSS selector based query language 
to select object in DOM. By default, it will define a global variable
`jQuery` and a quick reference `$` to it. To prevent conflicts with other 
libraries, a common approach is use immediate invoked function to wrap 
the `jQuery` object.

```javascript
+function($){
  // use jQuery with $ annotation inside this scope
}(jQuery);
```

To use jQuery to manipulate DOM object, the first step is to select 
object via selector:
```javascript
$('#id');     // id selector
$('.class');  // class selector
$('body');    // element type selctor
$('[attr=val]'); //attribute selector
$('input:active'); // state selector
$('div.class'); // componend selector
// ...
```

The return value of the listed invocation to `jQuery` function is a jQuery
object. This can also be acquired via wrapping a normal DOM object.
```javascript
$(document.getElementById('id')); // $('#id')
```

The jQuery object is a wrapper of its inner DOM object. It can be used to 
manipulate class names, attributes, styles, values, etc. The most signigicant 
feature of its API design is the chain-style api. 
```javascript
$('.val').attr('name', 'val-ele').css('position', 'absolute').text();
```

The invocation chain is infinite unless the return value of an function is required.
By utilizing the dynamic feature of JavaScript, the setter and getter method can be expressed
with same name. 
```javascript
$('.val').text('foo').text(); // set fisrt, then get the value
```

### effects and animations
An important part of jQuery is its effects. For most of elements, it diaplay state can be changed via
some simple functions.
```javascript
$('.foo').hide(400).show(400);
```

For other effects, jQuery provides an interpolation based animation function.
```javascript
$('.foo'),animate({height: 200}, 400); // change the height of element to 200px in 400ms 
```
This api also provides interface for customizing the easing function, and a callback function.
Besides, the animate can also be chained.

### event binding
Just like the core features, the event listener can also be attached and removed like the core attributes.
```javascript
$('.foo')
  .on('click', function(){})
  .bind('mouseenter', function(){})
  .active(function(){})
```

### utilities
jQuery also provides a set of utilities. The ajax library is the most used part.
```javascript
$.get('url', function(resp){})
$.post('url', payload, function(resp){})
$.ajax({/*options*/})
```

Another useful function is `load` for dynamically load page content.
```javascript
$.load('url').attachTo($('foo'))
```

### plugins 
jQuery also contains a plugin system. A plugin can registered to be a jQuery plugin to 
apply effects based on selector feature.


Java Exception
--------------

As a strong typed programming language, Java contains a typed exception system
to handle unexpected scenarios of problems. Exceptions in Java can be categorized into 
two parts, the checked exceptions (class extends from `Exception`, 
except `RuntionException` as well as its decendents) and the unchecked exception 
(`RuntimeException`s, `Erros`s and other class derivated from `Throwable`).

An exception can be raised by a `throw` statement. Then, the exception will be catched by a 
`try`-`catch` block. 

For large application, exception can be raised from anywhere of the application. This require 
an effective means to manage them. A common approach is wrap the suspicious section 
with `try`-`catch` block, then handle it or re-throwit in the catch block.

Pagination
----------

In most of applications, there are some tables with thousands of records. To display the content of 
the table, a pagination is required. Otherwise, either the server application or the client browser,
as well as the network, will fail to handle them and crash.

The pagination is not quite complex with the following steps:

1. query the total ammount of records;
2. query data from a postion of table (offset to first row);
3. limit the item to be selected;
4. calculate the number of total pages;
5. calculate current page number;
6. display data and pagination control.

SQL Join 
--------

Join statement in SQL can be used to make cross table query. There are two types of join.

### Outer join

Just like a Descarte product operation applyed to thw two tables, the outer 
join of two tables is the combination of each row of the first table and the second table.
This operation is relative costly. 

### Inner join

Join two table according to the foreign key constraint. This ie more useful in most cases.

