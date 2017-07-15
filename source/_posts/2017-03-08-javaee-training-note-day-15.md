---
title: JavaEE Training Note - Day 15
date: 2017-03-08 08:32:39
comment_id: 20170308-JEENOTE-15
tags:
  - react
---

Today's topic is some component library used together with ReactJS.
The React Motion is a UX improvement library named React Motion, which 
provides supports to transition animation.

<!-- more -->

React Motion
------------

React Motion provides three component and an unified interpolation 
function to create transition effects from one state to another.

### `spring` function

The unified interpolation function is named `spring`. As it name indicates,
the function is just to crate interpolation based on the physical behavior
of a real world spring. The library choose spring as its model to create its 
interpolation function is based on the fact that by applying simple physics 
rules to restrict the motion of the `spring` controlled variable, the 
state can just behavored as a spring. Any state is a possible initial state 
and no more timing function is required. Besides, no more ugly breaks will
appear when previous action is unfinished while a new action is applied.

Even though the transition function is unified, there are still two 
parameters to describe the physical attributes, which are stiffness and damping.
The first one describes the power of the spring and generally, the larger 
stiffness, the less time required for certain animation. The second one, 
damping describes the slowing down effects for a certain
animation. The smaller the damping is, the larger time required to finish 
a certain animation. Especially, when the stiffness is set to 0, the value will not 
change, while when the damping is set to 0, the value will never stop changing, but
keep going up and down around a certain value.

Based on this unified interpolation function, React Motion provides 3 
component to apply then to other React components.

### `<Motion />`

The `<Motion />` component provides simple effects to a single components.
By wrapping a target component into the `<Motion />` component, a interpolation 
value is provided to the content and can be used to apply to styles.
A simple example is shown as follows:
```javascript
<Motion defaultStyle={{ x: 0 }} style={{ x: spring(this.leftPosition(),  {stiffness: 140, damping: 18})}}>
    {interploation =>
        <TabContainer style={{left: interploation.x + '%'}}>
            <TabPageContainer>{interploation.x > -100 ? <DiscoverPage /> : ''}</TabPageContainer>
            <TabPageContainer>{interploation.x > -200 && interploation.x < 0 ? <EventPage /> : ''}</TabPageContainer>
            <TabPageContainer>{interploation.x < -100 ? <UserPage /> : ''}</TabPageContainer>
        </TabContainer>
    }
</Motion>
```
### `<StaggeredMotion />`

The `<StaggeredMotion />` component is to provide a series of interpolated value and these values are 
interconnected. This can create a effects like a serial objects are linked by a single string.
A section of code is shown as follows:
```javascript
<StaggeredMotion
defaultStyles={new Array(cellCount).fill({ v: 100 })}
styles={prev => prev.map((_, i) => ({
    v: spring(i === 0
        ? 0
        : prev[i - 1].v, { stiffness: 430, damping: 25 })
}))}>
{staggeredInt => <div>
    <CellsTitle style={styleMap(staggeredInt[0])}>
        <FormattedMessage {...message.promptBasicInfo} />
    </CellsTitle>
    <Cells>
        <FormCell style={styleMap(staggeredInt[1])}>
            <CellHeader>
                <Label>
                    <FormattedMessage {...message.promptName} />
                </Label>
            </CellHeader>
            <CellFooter>
                <Input type="temp"></Input>
            </CellFooter>
        </FormCell>
        <FormCell style={styleMap(staggeredInt[2])}>
            <CellHeader>
                <Label>
                    <FormattedMessage {...message.promptNickname} />
                </Label>
            </CellHeader>
            <CellFooter>
                <Input type="temp"></Input>
            </CellFooter>
        </FormCell>
    </Cells>
</div>}
</StaggeredMotion>
```

### `<TransitionMotion />`

The `<TransitionMotion />` component is a state based transition, which generally 
create transition effect for a component to be mounted and to be unmounted.
The following code shows the usage of fading in and sliding in effects.

```javascript
 <TransitionMotion
      willLeave={this.willLeave}
      styles={items.map(({ key, size }) => ({
          key: key,
          style: {
              v: size
          }
      }))}>{interpolation =><Article style={styleMap(interpolation.filter(i => i.key == 'a')[0].style)}>
          </Article>}
</TransitionMotion>;
```
