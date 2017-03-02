---
title: JavaEE Training Note - Day 09
date: 2017-03-01 17:53:56
comment_id: 2017-03-01 17:53:56
tags:
  - java 
---

Test is always one of the major steps in software enginering.
which is today's topic. Some basic concepts is introduced 
several days ago when introdcing the unit test supporting in 
Spring MVC framework. Today's point is related to the managment 
and theory approach of the test.

Importance of Testing 
---------------------

The goal of testing is to find out as much as faults and errors of program 
in order to improve the quaity of the program. From the unit testing targeting 
at each section of code to integrated testing targeting the whole project, the 
testing is progressed in parallel with the development progress. For a large program,
each module of it can execute into unexpected when the input of the program is not fully considered.

The ultimate aim of testing is to assert and prove the correctness given program. However,
the input of of software are unbounded that can never be either enumerated or 
unified. Therefore, in current stage, testing is mainly to create the typical or 
suspecious use case as a present to a set of input. Some other attempts are undergoing 
about the find and prove equivalent subset of input.

Black-Box Testing
-----------------

The black box testing approach is to treate the program as a sealed 
box which generate output as a response to given input without consideration 
about the detail of its inner implementation detail.

From the process of software development, the software is development to 
provide a solution to satisfy the requirement proposed in advance. The black
test is also design test case from the same perspective. Each test case is defined 
to create a set of certain input as a simulation to a practical scenario of usage,
then the expected result is based on the requirement.

Black is usually uesd to test the functinality of a program when sub-modules of the 
project is integrated.

White-Box Testing 
-----------------

The white box testing is on the opposite of the black-box testing, in which the 
program is not treated as a sealed box. In the white box testing, test case are designed based on the internal
view and detail of implementation of program. The test target of whilte 
box testing is usually the API, the method (or procedure) or the 
class. Testing engineer can trace the source code of target program, 
and follow the execution path of program, make assertion at certain 
decisino point.

Traditionally, white box testing use the following approach to systematically
manage test cases. The API testing is to design test cases from 
the declare method/procedure of program. The Code coverage approach is 
to design test cases to let each line of code to be executed at least once.

