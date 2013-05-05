# circles

Yay circles!

A demo application for [msgs.js][] and [clicks.js][]


## Overview

Circles is a demo application that's fun to play with. Each browser window gets to control a single circle on the screen. As you move your mouse cursor across the screen, the circle will track your mouse movement. When you click, your circle ripples. As more users join, each circle will appear on every other user's screen.

The raw source of events is captured by clicks.js. Clicks specializes in being able to capture raw user events and turn them into a stream that can be processed and ultimately serialized. From clicks, the stream is passed to msgs. On the client, some basic information is added to the event stream to correlate the source of the events and ensure the same color appears in every client.

The stream of events is sent to the server via a WebSocket. In this case, we're using [SockJS][] as it gracefully supports environments where native WebSockets don't work (some browsers and networks still don't speak WebSockets). On the server, we have two modes of operation. In the single instance mode, message are received off the WebSocket in msgs.js and immediately broadcast back down to every client. In a multi-instance mode, like on [Cloud Foundry][], before messages can be sent back to the client, they first need to be broadcast to every other server node. On Cloud Foundry, we use [Redis][] pubsub to broadcast messages across nodes.

The real power of msgs.js should be evident. We can easily convert the app from a single instance, to multiple instances by replacing a single line of code.

From the server, messages return to the client over the same WebSocket (they're full duplex after all). Once back on the client, the events are routed by type. 'mousemove's are handled separately from 'click's. For move events, the event is correlated with it's circle, or a new circle is created, and finally the location of that circles is updated on the screen.


## Getting Started

First you need to get the source. Since you're reading this, I assume you found it.  Before you can run the circles app, we need to download and install some dependencies.  We use [npm][] to manage dependencies, which is installed with [Node.js][].

    $ npm install

This will fetch both server side dependencies from the npm package repository, and client side dependencies using [bower][].

To start the app locally, simply run:

    $ npm start

Then in a browser navigate to http://localhost:8000/


## Running on Cloud Foundry

You can see the app running at [http://cujojs-circles.cloudfoundry.com/](http://cujojs-circles.cloudfoundry.com/).

    $ cf apps
    Getting applications in production... OK
    
    name      status    usage      plan   url                    
    circles   running   3 x 128M   dev    cujojs-circles.cloudfoundry.com

Deploying to Cloud Foundry is simple.  There are just a couple things to keep in mind:
* run `npm install` before `cf push`
* you must bind a redis instance, reusing an existing instance is ok, but dedicated is better
* you must pick a unique URL


Contributors
------------

- Scott Andrews <andrewss@vmware.com>
- Brian Cavalier <bcavalier@vmware.com>

Please see CONTRIBUTING.md for details on how to contribute to this project.


Copyright
---------

Copyright 2012-2013 the original author or authors

circles is made available under the MIT license. See LICENSE.txt for details.


Change Log
----------

0.1.1
- update Cloud Foundry info for latest CF kit

0.1.0
- first release, everything is new


[msgs.js]: https://github.com/cujojs/msgs
[clicks.js]: https://github.com/s2js/clicks
[SockJS]: http://sockjs.org/
[Cloud Foundry]: http://www.cloudfoundry.com/
[Redis]: http://redis.io/
[npm]: https://npmjs.org/
[Node.js]: http://nodejs.org/
[bower]: http://twitter.github.com/bower/
