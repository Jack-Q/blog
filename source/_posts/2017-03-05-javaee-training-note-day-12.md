---
title: JavaEE Training Note - Day 12
date: 2017-03-04 21:43:19
comment_id: 20170304-JEENOTE-11
tags:
  - react
---

A website (as well as other types of web applications) is gnenrally composited 
of frontend interface and backend service provider. Traditionally, when the website 
is the most fancy application of web, the frontend is static html pages genrated 
by http server. However, in the recent years, the AJAX technology and mobile platform
driven some kinds of new applications. The Single Page Application (SPA) is 
an envolved version of the original web page which is performed like a local application
while requires no binary installation process. Today's topic is related to the 
ReactJS framework, a frontend solution to manage the SPA and more.

<!-- more -->

Introduce React
---------------

When a website is worked as a local application within a single webpage, the webpage 
requires a large amount of scripts to manage the problems including the visual style, 
the content fetching and synchoronizing, the performance, and the collision 
of different modules. To solve these problems, some large and heavy JavaScript 
libraries trid to provide common modules to support large applications. The complexities
are encapslated into the library, which makes it easy to use as it is while no means to 
make customization. When a application requires a feature that is uncommon,
the existing library is of nearly no use.

However, the ReactJs proposed a new approach for large application of web. Instead of 
create a project level of encapsulation, ReactJs use the component concept to make the UI
element into a self-contianed and independent block. Once the block is sealed, it can be 
reused in other where. This is basic concept of ReactJs.

A component in ReactJs is a JavaScript object with its properties (`props`) applied by 
its parent component and states (`states`) managed by itself. Then, a required function named 
`render` is responsible to render the DOM nodes of the current componsnt based on its 
properties and states. 

The component in ReactJs is managed by ReactJs library, which is independent to 
the DOM of current page in browser. This is the virtual DOM technology. When 
the properties or states of the original component is changed, a new virtual DOM 
is constructed. ReactJs can detect the difference of the actual effects to the real DOM.
Then, some ReactJs update the real DOM tree via the DOM api.

Another notable feature of React the `jsx` syntax introduced by itself. Based on its component 
concept, the DOM (either virtual one or the real one) as a required part of the component sholud
be placed as close as possible. Therefore, the `jsx` is merely including the xml tags into the script file, 
For instanse, a simple `jsx` file is represented as follows:
```jsx
ReactDOM.render(
  <Provider store={store}>
  <LanguageProvider locale={'zh-Hans'}>
    <SiteRouter/>
  </LanguageProvider>
</Provider>, document.getElementById('content'));
```

In `jsx`, the xml tags are actually a simpler form of function invocation to the ReactJs 
api `React.createElement`. As a expanded version of JavaScript, `jsx` is not limited to be 
only used by ReactJs. Some other JavaScript frameworks also use this syntax extension to 
provide modulation.

React Peoject
-------------

To create a ReactJs project, some preparations are required to transform the `jsx` syntax
to normal JavaScript accepted by browsers. The most used compiler is [babel](babeljs.io).
Another alternation is TypeScript, which support a `tsx` extension to compile `tsx` to `ts` 
as well as JavaScript.

To manage the compiling process, some building management and packaging solutions are 
wildly used, including the build tools like `grunt`, `glup` and packageing tools like 
`webpack`.

the following simple steps use `webpack` and `babel` as start point.

### prerequisite

All of the tools mentioned above are written in JavaScript, which requies the Node.js
and `npm`. Besides, a text editor with some supports to these new languages are much 
more useful.

### create project

Create a new folder and create file as the following directory structure:
```txt
/
├── app
│   └── index.js
├── build
│   └── index.html
├── package.json
├── webpack.config.json
└── .babelrc

```

Then the `index.js` is filled with following content:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React</title>
</head>
<body>
  <div id="content" style="height: 100%"></div>
  <script src="bundle.js"></script>
</body>
</html>
```
This is a minimal webpage in which the application will exectue.

The `index.js` is filled with the following content:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>hello</div>, 
  document.getElementById('content'));
```

This is merely a `div` (this is a virtual element mapped to html `div` element) in the whole webpage.

The `.babelrc` is shown as follows:
```json
{
  "presets": [
    "react",
    "es2015"
  ],
  "env": {
    "development": {
      "plugins": [[
        "react-transform",
        {"transforms": [{
              "transform": "react-transform-hmr",
              "imports": ["react"],
              "locals": ["module"]
      }]}]]
    }
  }
}
```
This file is the instruction to babel to control the compiling process.

The final one is webpack, which shown as follows:
```js
module.exports = {
  devtool: 'eval-source-map', 
  entry: [ __dirname + '/app/main.js'],
  output: { 
    path: __dirname + '/build', 
    filename: 'bundle.js' 
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/, 
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  }
};
```
This file controls how to transform each kinds of file and then pack then all together.

### Dependencies

The last file `package.json` lists the project wide configurations and dependencies.
Dependencies can be installed via following command:
```bash
npm install --save-dev \
   react react-dom webpack \
   babel-cli babel-core \
   react-transform-hmr \
```

Finally the project can be build by `webpack` command. This whill genrate a bundled 
JavaScript file with all components and dependecies.

