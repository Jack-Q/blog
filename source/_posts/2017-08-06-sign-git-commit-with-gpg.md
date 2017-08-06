---
title: Sign Git Commit with GPG
date: 2017-08-06 10:39:05
no_comments: The comment thread is disabled for this thread for some reasons
comment_id: 20170806-GITSIGN
tags:
  - git
  - gpg
categories:
---



<!-- more -->

### Prepare GPG Key

#### Check the existence of GPG key
```bash
gpg --list-secret-keys --keyid-format LONG

# some distro requires explicitly specifying version: gpg2
gpg2 --list-secret-keys --keyid-format LONG
```

#### Generate new key pair

```bash
gpg --gen-key

gpg2 --gen-key
```

Enter key-phrase, user name, email.

### Configure Git to Use GPG


#### Add configuration
Add configuration to global scope or locally.
```bash
git config --global gpg.program gpg2
git config --global user.signingkey <key-id | user-id | user-email>

git config --global commit.gpgsign true
```

#### Sign Git commits and tags

```bash
git commit -S -m <commit-message>
git tag -s <tag-name>
```
#### Verify signed Git commits
```bash
git verify-commit <commit-ref>

# verify tag
git verify-tag <tag-name>
git tag -v <tag-name>
```

#### Add to GitHub

List keys:
```bash
gpg2 --list-secret-keys --keyid-format LONG
```


Output format
```txt
/path/to/key/file
------------------------------------
sec   4096R/<key-id> 2016-03-10 [expires: 2017-03-10]
uid                          <user-id> | <user-email>
ssb   4096R/<key-id> 2016-03-10
```

Export current key
```
gpg2 --armor --export <key-id | user-id | user-email>
```

Add the generated contents to GitHub setting.
