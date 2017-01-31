# Theme Design



## Basic Planning

* Left panel
  * Display title
  * 

* Main content (Post View)
  For content view:

  For list view:
    load further date from JSON list and rendered at right.

```bash
Header Common
-------------
Global navigation
  Expandable sub-navigation
Local navigation
  Page header (In page navigation)
Further note
-------------
Extra Info
```

  For mobile view, this section ought be hide and fallback to sidebar(this section).

```bash
---- 50px ----
Color Bars
List
Sub-Section
  Expand to top, right triangle indicator
```

* Main content (List View)

  List view shows the list of post in temporal order, by categories, by specific tag.
  For the latter two types (the categories, tag), a special header is represented
  in order to show the type (may be customized by detailed keys).

  The temporal ordered list contains the order and pagination (infinite loader is in consideration).



* Consisitency transition
  - Keep the left side open and change on demand
  - Loading transition and animation ought be presented
