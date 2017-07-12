---
title: Message in ROS
date: 2017-07-12 10:06
comment_id: 20170712-ROSMSG
tags:
    - ros
---

Messages are spreaded accross the whole system of a ROS instance,
which are the enssence and physical base of communication and coordination 
in ROS system. The message is a serializable and platform agnostic (in the 
perspective of OS, programmign language, etc) specification of structured data.

Most of information in this post is refer to [msg page in ROS wiki](http://wiki.ros.org/msg) and [source code for ROS core module](https://github.com/ros/ros/blob/kinetic-devel/core/roslib/src/roslib/msgs.py).

A directly connected concept in ROS is _Topic_, which is named bus for message exchange, which will be covered in later post. The _Service_ is also based on 
the infrusruation of message, which will be illustrated in next post.

<!-- more -->

## Message format and definition ##

Message are defined in `msg` files, which list the detailed component of a
message. Each message of an component can be one of the following types:
* Primitive types

    Currently supported primitive types:
    * `int*`: integer of various size, including `int8`, `int16`, `int32`, `int64`;
    * `uint*`: unsigned integer of various size, including `uint8`, `uint16`, `uint32`, `uint64`;
    * `bool`: boolean value;
    * `float*`: floating point number of various size, including `float32`, `float64` (corresponding to `double` type);
    * `string`: ASCII string;
    * `time`: sec & nsec, two unsigned 32-bit integers
    * `duration`: sec & nsec, two signed 32-bit integers
    The last two item can be treated as composite data type since they are actually defined as the following ([reference](https://github.com/ros/ros/blob/kinetic-devel/core/roslib/src/roslib/msgs.py#L695-L698)): 

    ```python
    ## time as msg spec. time is unsigned 
    TIME_MSG     = "uint32 secs\nuint32 nsecs"
    ## duration as msg spec. duration is just like time except signed
    DURATION_MSG = "int32 secs\nint32 nsecs"
    ```

    Besides, there are some deprecated types which may occur in old packages:
    * `char`: aliased to `uint8`
    * `byte`: aliased to `int8`
* Arrays
    * fixed length(`type[size]`): direct serialization;
    * variable length(`type[]`): serialized as length prefixed listing 
      (length in `uint32`).
* Componsite type as defiend in other message file

    Message definition itself can be used as a type for other message definition, which just worked as a composite of several primitive types.
    
    Some composite message are defiend in ROS core packages anc commonly used 
    as convertion. The common standard message are defiend in [std_msgs](https://github.com/ros/std_msgs) which can be used for quick prototyping.
    Notable item are:

    * `Header`: header type is an standard type to provide standard metadata for a message, which is consisted of an sequence number(`uint32`), timestamp (`time`) and an id of frame (`string`). For some historical reason, this field is wide used just as an primitive type.
    * `Empty`: empty type is just as it is named, which contains no content (defined in an empty file) and can be used as an signal.
    * Multi-dimension array: define multi-dimension array, with the layout specified as [MultiArrayLayout](https://github.com/ros/std_msgs/blob/groovy-devel/msg/MultiArrayLayout.msg)
    * `ColorRGBA`: 32bit floating point number describe color format (in the order of red, green, blue, alpha)
    
    However, most of the wrapper types are simply use `data` field for its 
    payload, which lacks of sufficient semantic for maintains. Thus out of consideration of maintaince, a dedicated message definition is requried.
    Since most of other meesage types Some commmon used message types are defiend in [common message](https://github.com/ros/common_msgs)

* Constant
    
    Message definition can also contain constant definition, in the form of 
    assignment of value to primitive vlaue. (As denoted before, the `time` and 
    `duration` are special primitive value with extra structure, these types cannot be assigned as constant directly)

## Message file ##
Message defienition are stored in message file (*.msg*) and located in `msg` 
directory inside of `src` of a ROS package.

The directory structure of a simple package with an message definition is illustrated as follows:

```txt
.
├── CMakeLists.txt
├── msg
│   └── Num.msg
├── package.xml
└── src

```


## Utilize messages ##
To utilize messages, the definition of the message in language specific form ought to be generated and the message handling and processing are also required to be supported. These can be done by including `message_generation`
and `message_runtime` pcakage in `package.xml` (or uncomment the illustration gneerated by default):
```xml
<package>
  <!-- ... -->
  <build_depend>message_generation</build_depend>
  <run_depend>message_runtime</run_depend>
  <!-- ... -->
</package>
```

Then in build file (the `CMakeLists.txt` at the root of of an package in src package), register defined message and enable message findings, including the followig configuration items:
1. Add message generation package to requried component
  
  (this step affect the process of the whole project from this point, thus 
  latter pcakage can be processed correctly without proper configuration of this item, while which is not encouraged)

  ```
  find_package(catkin REQUIRED COMPONENTS
    roscpp
    rospy
    std_msgs
    message_generation
  )
  ```

2. expose message in current package
  ```
  add_message_files(
    FILES
    Num.msg
  )
  ```
3. import messages from packages
  ```
  generate_messages(
    DEPENDENCIES
    std_msgs
  )
  ```
4. declare dependencies to build tool
  ```
  catkin_package(
    CATKIN_DEPENDS roscpp rospy std_msgs message_runtime
  )
  ```

The content of the package is a listing of the entries in the this message.
Each entry is specified in seperated line, while blank line and hash started 
lines are ignored. Each entry is declared by `type` and `name` seperated by whitespace. For the constant, a `value` filed led by `=` is attached to the 
end of entry decalration.

The following is a simple message file:
```
# header entry, using Header type from std_msgs
Header header
# primitive entry
int32 num
```

## Make and list  ##
After all messages configuration setup, rebuild ros package to check potential 
errors and generate language specific headers/sources in `devel` directory.

Generated files including headers for C (in `devel/include`), python lib (in `devel/lib/python2.7/dist-packages/`), CMake configurations (in `devel/share/<package-name>/`), LISP code (in `devel/share/common-lisp`), Node.js code (in `devel/share/gennodejs`)

These generated files can be used to leverage IDE supports to messages (as well as services, actions, etc) and support other conventional toools to 
support ros package development. These introspection information can also be used to assist package shell completement, for example, `rosmsg show <package-name>/<message-name>`. (For shell completement feature, an sync of
package information is requried before these actions, which is using `source devel/setup.zsh` command).
