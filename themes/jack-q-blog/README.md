# the theme for this blog

This is the theme of this blog with a horizontal list of post (on large screen) and 
responsive design (adaptive design).

## Configuration Options

* Google Analytic (GA) ID

  ```yaml
  googleAnalyticsId: "UA-ID"
  ```

* Math Integration

  For usage information, refer to [Math](#math) section.

  ```yaml
  math_inline: false
  ```

* CC-BY-SA Licence note

  This theme contains build-in support for CC-BY-SA 4.0 Licence notice, which is enabled by default.
  Disable this feature is CC-BY-SA 4.0 is not suitable to you.

  ```yaml
  default_cc_by_sa: true
  ```

* Comment Section
  
  This is used to control the detail of loaded comment. Each page can state explicitly about the 
  comment. The comment is processed by the following process.
  
  - Disable comment
    
    Add configuration to front matter of s single page to disable the comment of current post.
    This has the highest priority in the whole process.

    ```yaml
    # disable comment and use default message
    no_comments: true

    # disable comment and use a customized message 
    no_comments: Comment thread for this post is disabled for some reasons.
    ```

  - Enable comment
    
    To enable comment, a global/page level `comments` toggle should be enabled.
    Besides, a page level `comment_id` should be configured for each page.

    ```yaml
    comments: true
    # unique for each post
    comment_id: 20170806-COMMENT
    ```

## Math

Math module is an integration of KaTeX ([GitHub](https://github.com/Khan/KaTeX/)) 
library to render LaTeX math formula into MathML or CSS controlled representation.

Math module supports two kinds of usage, the block style and the inline style.

* Block Style

  The block style is the recommended approach for insert a math formula in 
  a post. 
  ```md
  {% math %}
    x = \frac{1}{y}
  {% endmath %}
  ```
  By default, the math expression will be rendered in a separated block, which 
  is the "display" style in LaTeX. 
  To display a expression within the document, use the `inline` option, 
  ```md
  {% math inline %}
    x = \frac{1}{y}
  {% endmath %}
  ```

* Inline Style

  Inline style is to insert math formula directly into document wrapped by double `$`s 
  (that is `$$ y=2x $$`). This can be useful for post which is filled with mathematical 
  formulas. 
  
  By default, this is disabled to prevent possible conflict with other expression. This 
  can be toggled by either a page wide setting (front matter) or global setting 
  (not recommended).

  This inline style also contains some other options applied via latex comment notation.
  (Such as: `$$%display% y=x^2 $$`). The option can be the following ones:
  + `display`: render this block as display mode

## Planned features

* [ ] Optimize horizontal scroll
* [ ] Link to feed (`/atom.xml`)
* [ ] Home nav icon no-op tooltip