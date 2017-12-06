---
title: Sign Git Commit with GPG
date: 2017-08-06 10:39:05
comment_id: 20170806-GITSIGN
tags:
  - git
  - gpg
categories:
---

GPG, Gnu Privacy Guard, is a popular and wide used encryption tool
compatible to PGP (Pretty Good Privacy) tool. By using widely-accepted 
asymmetric encryption methods, GPG becomes an handy utility for
signing digital information with a personal or organizational credential
or securing private or sensitive message with high level encryption.

This post is to integrate GPG with Git for more reliable and controllable source code management.

<!-- more -->

## Prepare GPG Key

<!-- GPG use a set of  -->

### Check environment

First of all, both GPG and Git are required to be installed on your environment, which are 
generally packaged with name `gpg` and `git`. Install them via package manager or refer to their
official sites for source code and compiling & installing by yourself.

### Check the existence of GPG key


```bash
gpg --list-secret-keys --keyid-format LONG

# some distro requires explicitly specifying version: gpg2
gpg2 --list-secret-keys --keyid-format LONG
```

### Generate new key pair

Generate a new key pair is generally using a interactive session initiated by following commands.

```bash
gpg --gen-key

gpg2 --gen-key
```

Enter key-phrase, user name, email as well as other information according to the prompts.

### Send your key to public key server

The public key of your key pair is meant to be public for others to validate your 
signature or encrypt message to be sent to you. The key server is the most convenient approach 
to achieve this goal. 

In order to improve the availability of public key, most of common key servers are actually
a unified system with synchronization mechanism to make each one serer is a mirror server of the rest servers.
The following command will send the public key to [pgp.key-server.io]().

```
gpg --keyserver "pgp.key-server.io" --send-keys <key-id>

gpg2 --keyserver "pgp.key-server.io" --send-keys <key-id>
```

For the peers who want the key, they can fetch key from key server via following command.

```
gpg --keyserver pgp.key-server.io --recv-keys 7b383e00

gpg2 --keyserver pgp.key-server.io --recv-keys 7b383e00
```

(Notice: to fetch a public from key server is achieved via recv-keys, a.k.a "receive public keys", 
instead of "fetch-keys", which is used to download exported, ascii armored key string
directly from a specified URI.)

## Configure Git to Use GPG

As is mentioned, in this post, GPG is used to be configured for Git.

### Add configuration
Add configuration to global scope or locally.

```bash
# use GPG 2 as designated version of GPG to be used by Git
git config --global gpg.program gpg2
# specify key pair for signing information.
git config --global user.signingkey <key-id | user-id | user-email>


# enable automate signing of git commit
git config --global commit.gpgsign true
```

You can check your configuration via following Git command.

```bash
git config --list --global
```

Or check the configuration file directly.

```bash 
cat ~/.gitconfig 
```


### Sign Git commits and tags

The `-S` option of git-commit sub-command is used to sign this commit with globally configured 
GPG key, while the `-s` option is for git-tag sub-command.

```bash
# submit a signed git commit
git commit -S -m <commit-message>
# create a git tag with signature
git tag -s <tag-name>
```

When `commit.gpgsign` configuration option is toggled on for repository or globally,
the `-S` is optional for git-commit sub-command.

### Verify signed Git commits

The following commands are used to verify signature of commits.

```bash
git verify-commit <commit-ref>

# verify tag
git verify-tag <tag-name>
git tag -v <tag-name>
```

Before verifying git commits signed by others, import their public key globally in advance.

### Add to GitHub

GitHub supports GPG signature verification for commits and tags. After signing a git commit, the only option required
is to bind your GPG public key to yout GitHub profile.

List keys:
```bash
gpg2 --list-secret-keys --keyid-format LONG
```

Output format:

```txt
/path/to/key/file
------------------------------------
sec   4096R/<key-id> 2016-03-10 [expires: 2017-03-10]
uid                          <user-id> | <user-email>
ssb   4096R/<key-id> 2016-03-10
```

Export current GPG key in ASCII armored format:

```
gpg2 --armor --export <key-id | user-id | user-email>
```

Add the generated contents to GitHub settings of your account 
at [SSH and GPG keys](https://github.com/settings/keys) of proile setting page.