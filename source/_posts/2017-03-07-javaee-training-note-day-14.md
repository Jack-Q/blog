---
title: JavaEE Training Note - Day 14
date: 2017-03-07 23:05:13
comment_id: 20170307-JEENOTE-14
tags:
  - react
---

Today's topic is continued to the day before yesterday. It is still about the ReactJS framework.
Based on the start point created on that day, today is to create the first component and then 
introduce the React Router library to solving the problem of routing inside the whole client 
side application in React.

<!-- more -->

React Component
---------------

There are several ways to crate a Rract component. Which can be choosed according to the 
configuration of project and target environment. 

### class based component

JavaScript supports object oriented programming in an early age since its creation. However, 
unlike those primary object oriented programming language like Java and C#, the object oridented 
progrmming in JavaScript is implemented via function and prototype chain based inheritence.
Another point that worth mentioning is that the `class` is not a key work (an reversed work) 
in JavaScript until recent version of language specification.

As mentioned in another post, even though the new language feature are not available in common 
environment like browsers and current node version, the code confronting to newer specification 
can be transformed into older version via Babel. Therefore, in development stage, the new 
feature can be used easily.

Based on the `class` syntax, a simple component can be declared in following pattern:
```javascript
import React from 'react';
class FooComponent extends React.Component {
  // define the initial state
  state = {
    foo: 'foo-val',
    bar: 'bar-val',
  }

  // invoked by React when teh component is loaded 
  componentDidMount = () => {
    this.setState({
      foo: 'new-foo',
    })
  }

  // the main function for component rendering
  render = () => {
    return <div>{this.state.foo}</div>
  }
} 
```

### object based creation

Apart from the new syntax, the information which is required to create a new component can also provided 
via a JavaScript object. To support this pattern, React provide an interface to create a component by passing 
a JavaScript object. The coresponding component defiend in previous section is showed below.

```javascript
import React from 'react';
const FooComponent = React.createComponent({
  getInitialState: () => {
    return {
      foo: 'foo-val',
      bar: 'bar-val',
    };
  },

  componentDidMount: () => {
    this.setState({
      foo: 'new-foo',
    })
  }, 

  render: () => {
    return <div>{this.state.foo}</div>;
  }
});
```

Then the value returned from `React.Component` is a new component that can be used in other places.

### function based creation

For o simple component without concering to he state to it as well as no other lifecycle event is related,
the only required function is the `render` function to create represental UI. Thus, this simgle unction 
can be used as a component.

The function based component is simple enough that most of lifecycle hanfler is not supported. 
A simplied version of this pattern is shown as following:
```javascript
import React from 'react';
const FooComponent = (props) = {
  foo: 'foo-val',
  bar: 'bar-val',
}) => {
  return <div{this.props.foo}</div>
}
```

Comparing the lised method. the first one is the official recommended methods for large state, while 
the javascript based declaration is moch handier.

React Router
------------

React router is a routing module for react base d application.

A simple usage is shown as followings

```javascript
import React from 'react';
import {Router, Route, Link, hashHistory} from 'react-router';

import {App, SubModule1, SubModule2} from './component';

export const hsitory = hashHistory;

export default class RouterComponent extends Rract.Component {
  render = () =>{
    return <Router history={history}>
    <Route path="/" exact component={App}>
      <Route path="/edit-user" component={SubModule1}/>
      <Route path="/recommendation" component={SubModule2}/>
    </Route>
  </Router>;
  }
}
```

In thsi router component, the path are mapped to three different component. When the path 
string is matched, the related component will be rendered.

Then, to change the location of the current application, the `Link` component provided by the 
react router library is a component for this function.
```javascript
<Link to='target-path'>Message</Link>
```

If the `Link` component is not suitable for a dedicate scenario, the history interface can be used 
to change the location as well.
```javascript
import {hashHistory} from 'react-router';

const history = hashHistory;

// navigate to target path
// and push it to history stack
history.push('target-path');

// navigate to target path 
// and replace the original page from history stack
history.replace('target-path');

// get current location for link activity detection
history.getCurrentLocation();
```

