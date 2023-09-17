# Node Home Assistant Framework

https://github.com/grahamj/node-haf

A set of JavaScript classes and tools to facilitate interacting with Home Assistant via WebSockets. Want to run your automations in Node but prefer pure code to node-red? This is the way.

Or least, it will be. **This is very early code**, used only by me, and is **constantly changing**. You're welcome to use or borrow from it (subject to the license) but I would recommend talking to me first (see bottom of page). If you like the concept maybe we can help each other out :)

Future goal is a fully supported (and hopefully popular) OSS package but it's very early days.


#### Highlights

- This is not a standalone server, it's a Node package you can use to build one
- Not very opinionated; there is something of a class hierarchy but you can organize your project and instances however you want
- Currently stateless - no DB needed

#### Philosophy

I want to write automations like this:

```javascript
const light = new haf.domain.Light({
  entityId: 'fancy_light',
});
const motion = new haf.util.Motion({
  entityId: 'my_motion_sensor',
});
motion.onMotion(() => light.turnOn());
```

So we have a base Entity class, classes for each HA domain, some middleware type classes that abstract those (eg. Door, Window, Motion) and some utilities such as a WebSocket handler, singleton entity map etc.

The WebSocket handler receives messages from HA and passes them to Entities which maintain their state and fire registered handlers on change. Domain and middleware classes provide functions for manipulating entities, abstracting away HA service calls.

Automation is then simply wiring together instances by registering handlers and calling instance methods.

#### About Me

Hi, I'm Graham. I'm a senior developer at a company you've heard of. I live and breathe Node at work and Home Assistant at home. Hopefully you enjoy what I have to offer!

Contact me: `haf@{my first name}j.net`