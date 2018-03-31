# Blog of Jack Q


[![license](https://img.shields.io/github/license/Jack-Q/blog.svg?style=flat-square)](https://github.com/Jack-Q/blog/blob/master/LICENSE)


[visit blog](https://jack-q.github.io/blog/)

## Theme

The theme for this blog is development from scratch, 
refer to [themes/jack-q-blog](themes/jack-q-blog/README.md)
for more info.

## Deployment and maintains

### Add new post

```bash
npm run new "${POST_NAME}"
```
Then change the `commend_id` field accordingly.

### Preview in local

```bash
npm start
```

(Do not use `hexo s` to preview locally since `npm start` will pass extra configuration file to hexo)

### Deploy

Deployment is involved in the `git` mechanism (using `hexo-deployer-git` package).

* Configuration

```yaml
deploy:
  type: git
  repo: https://github.com/Jack-Q/blog/
  branch: gh-pages
  message: Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}
```

* Deploy

```bash
npm run deploy
```
---
Contents in this site are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).