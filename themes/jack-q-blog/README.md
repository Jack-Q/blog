# the theme for this blog

This is the theme of this blog with a horizontal list of post (on large screen) and 
responsive design (adoptive design).

## Configuration Options

* Google Analystic (GA) ID
```yaml
googleAnalyticsId: "UA-ID"
```

* Math Integration

  For usage information, refer to [Math](#math) section.

```yaml
math_inline: false
```

## Math

Math module is an integration of KaTeX ([GitHub](https://github.com/Khan/KaTeX/)) 
library to render LaTeX math formula into MathML or CSS controled representation.

Math module supports two kinds of usage, the block style and the inline style.

* Block Style

  The block style is the recommended approach for insert a math formula in 
  a post. 
  ```md
  {% math %}
    x = \frac{1}{y}
  {% endmath %}
  ```
  By default, the math expression will be rendered in a seperated block, which 
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
  
  By defaule, this is desabled to prevent possible conflict with other expression. This 
  can be toggled by either a page wide setting (front matter) or global setting.

  This inline style also contains some other options applied via latex comment notaion.
  (Such as: `$$%display% y=x^2 $$`). The option can be the following ones:
  + `display`: render this block as display mode
