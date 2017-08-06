---
title: Install Global npm Package For Current User Without Privilege
date: 2017-07-30 10:35:00
comment_id: 20170730-NPMGLOBAL
categories:
    - javascript
tags:
    - javascript
    - npm
---

NPM is the most used package manager for node.js and JavaScript ecosystems.
By using the global packages mechanism, a node.js package can be easily integrated 
into system shell and just works like a native command line utility (or even an 
desktop GUI program). However, by default, the global packages are installed as shared 
global packages across users and requires root privilege for maintenance, which may be
unavailable for general user and also expose potential conflict of packages between 
users. This post will cover simple configuration for npm global package for current 
user only.

<!-- more -->

## Configuration

The configuration requires two steps: telling npm where to find global packages for 
current user and telling system where to find executable (as well as man files) 
provided by npm global packages.

### Create a directory

Create an directory for later usage:

```bash
mkdir -p ~/.npm-global
echo 'directory for global items of npm packages' > ~/.npm-global/README
```

### Configure `npm`

When `npm` starts, it read configurations from `~/.npmrc` (`.npmrc` located at home
directory of current user). The configuration entry for the location of global package 
is `prefix`, which is officially stated as follows:

> The location to install global items. If set on the command line, then it forces non-global commands to run in the specified folder.

Therefore, add the following configuration line to `~/.npmrc` (which sets the root of 
global package path to `~/.npm-global`). The choice of folder name has no specified restriction while a name derived from "npm" may be more preferable. (By default, `~/.npm` is already used by npm as cache directory of downloaded packages.)

```bash
# content of ~/.npmrc 

# location for global packages
prefix=${HOME}/.npm-global
```

By the way, `.npmrc` is can also configure other entries. For example, the following 
section are configuration entry related to `npm init` command for npm project
initialization.

```bash
# npm-init configuration
init-author-name="Jack Q"
init-author-url="https://jack-q.github.io/"
init-licence="MIT"
init-version="0.0.1"
```

For a complete list of supported configuration entry, refer to [npm-config](https://docs.npmjs.com/misc/config) page of npm document.

### Configure system paths

Modern operating systems use environment variable `PATH` as a list of location of file 
system in which  operating systems resolve executable name to their full path.
Apart from `PATH` for system to resolve executable, some other programs also use 
path list in environment variable to resolve other resources, like `man` (manual 
utility of POSIX) pages.

For global npm packages, the executable are located at `~/<npm-global-package>/bin` while the manual pages are located at `~/<npm-global-package>/bin`. Add the following exported environment variable to ``~/.profile` or dedicated configuration file for login shell (like `~/.bashrc`, `~/.zshrc`, etc.).


```bash
# Local NPM global packages
export NPM_PACKAGES="${HOME}/.npm-global"
# add npm executable to path
export PATH="$NPM_PACKAGES/bin:$PATH"
# add npm command manual pages
unset MANPATH
export MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
```

## Benefits

This additional step after general installation of npm provides th following benefits.

* Enable the use of global package without root privilege, which reduces the risk of 
  privileged actions;
* Enable the transition of global package for different operating systems or system
  reinstallation;
* Limit the application scope of global packages and reduce the possibility of
  conflict between users.

## Other approaches

The method introduced above is just manually configure everything 
required for specifying the root directory of global npm package
(the `prefix` config entry), which can be automated as a single 
shell script. 

```bash
# npm global package directory
NPM_GLOBAL_DIR=".npm-global"

# prep directory
mkdir -p ~/${NPM_GLOBAL_DIR}
echo 'directory for global items of npm packages' \
    > ~/${NPM_GLOBAL_DIR}/README

echo "prefix=\${HOME}/${NPM_GLOBAL_DIR}" >> ~/.npmrc

# config path
cat << EOF >> ~/.profile
# Local NPM global packages
export NPM_PACKAGES="\${HOME}/${NPM_GLOBAL_DIR}"
# add npm executable to path
export PATH="\$NPM_PACKAGES/bin:\$PATH"
# add npm command manual pages
unset MANPATH
export MANPATH="$NPM_PACKAGES/share/man:\$(manpath)"
EOF

```

Besides, official site of NPM also contains a guide for this at [fix NPM permission](https://docs.npmjs.com/getting-started/fixing-npm-permissions#option-2-change-npms-default-directory-to-another-directory)
page, which can be referenced.
