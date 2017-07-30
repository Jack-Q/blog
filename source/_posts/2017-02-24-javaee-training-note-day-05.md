---
title: JavaEE Training Note - Day 05
date: 2017-02-24 08:42:37
comment_id: 20170224-JEENOTE-05
tags:
  - Java
---

A website is a user oriented application which will represent a friendly
interface to its end user. Nowadays, the browser based webpage is still
the most important interface represented to user. Based on the 
current application with integrated Spring, Spring MVC and Hibernate,
some issues related to the front end is the main topic of today's schedule.

<!-- more -->

Twitter Bootstrap
------------------

Bootstrap is a lightweight frontend library focused on the layout and style 
of webpage. It provides a well-designed grid system to simplify the 
configuration of responsive web design. It also provides a set of 
components for common usage. The unified styles for form controls are tested to be 
the the same across all major browsers.

### Basic Pattern

Bootstrap use html class list to apply styles to element. Since the class list 
can be consisted of multiple entries, the final style of an element is the 
compounded of each CSS rule list. 

Another widely used pattern in Bootstrap is using class to enable effects and 
using `data-*` attributes to configure that. Some components require some more 
steps to enable then in JavaScript.

### Grid System 

The grid system in Bootstrap 3 is a 12-column grid. A parent element can 
be set to `row` and then its children can use `col-<condition>-<size>` to assign 
their size in different screen size (to make the webpage responsive).
Then there are also some other category of classes to control the position 
of the cells like `col-<condition>-offset-<position>` and to arrange the cells
like `col-<condition>-<push/poll>-<size>`.

### HTML Components

Predefined themes which can apply by using class name.
For example, a input form can be defined as:

```html
<form class="form-inline">
  <div class="form-group">
    <label for="exampleInputName2">Name</label>
    <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail2">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
```

### JavaScript Components

Bootstrap contains a set of component to support more functionality 
that native browser doesn't support directly, including the model dialogs 
(better style and control over `alert` and `prompt` function), drop down list,
the tab page, etc. 

The following code is a simple model dialog. The bottom controls the dialog
by the `data-target` attribute. There is no more JavaScript required.
```html 
<!-- Button trigger modal -->
<!-- model is referenced by target -->
<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Pop up Model
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <!-- Header -->
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        <!-- Content -->
      </div>
      <div class="modal-footer">
        <!-- Footer -->
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

Rich text editor and CMS
------------------------

CMS (Content Management System) is a common function in website. The simplest version 
of CMS can be configured by an rich text editor with a database to store the dynamic content
(generally html), then display the html to webpage.

Rich text editor is usually a client side component that encapsulate the `textarea` element 
and keep it sync with a user editable html fragment. 

Another feature for CMS is picture (as well as other static files) uploading. This is done by 
allocate a server space to store file and access then from web server. The apache commons library 
contains a module for handling the server side configuration of file uploading and
the recent version of browsers have already support file uploading natively.

