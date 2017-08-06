# Hexo based blog

## Deployment and maintains

### Add new post

```bash
hexo new "${POST_NAME}"
```
Then change the `commend_id` field accordingly.

### Preview in local

```bash
npm start
```

(Do not use `hexo s` to preview locally since `npm start` will pass extra configuration file to hexo)

### Deploy

Deployment is involved in the `git` machinism.

* Preparation:

```bash
npm install hexo-deployer-git --save
```

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
hexo deploy
```
