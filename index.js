// very basic express server
var express = require('express');
var app = express();
var palmetto = require('@twilson63/palmetto-couchdb'); // https://github.com/twilson63/palmetto-couchdb
// this is setting up the palmetto service, see above's readme for what config options to pass in
var ee = palmetto({
  // for the couchdb adapter: `endpoint` is the database host and `app` is the database name
  endpoint: 'http://localhost:5984',
  app: 'samandnickdb'
});
//this helper method contructs the palmetto event
var newEvent = require('palmettoflow-event').newEvent // https://github.com/twilson63/palmettoflow-event/blob/master/index.js#L16

// the route accessable from the client
app.get('/callNicksContainer', function (req, res) {
  // create the palmetto event using the helper method we brought in from above (see the above link for and explanation of what is going on and what to pass in)
  var event = newEvent('callNickContainer', 'put', { foo: 'bar' })
  console.log("event:", event)
  // using our configured palmetto, emit a send event with your event object you built above as the second parameter
  ee.emit('send', event)
  // checkout the events api in the Node docs for different instance methods you can call
  // https://nodejs.org/api/events.html#events_class_eventemitter
  ee.once(event.from, function (event) {
    console.log("eventFromNicksContainer:", event)
    // respond to the http call from the client with the message sent back from the palmetto event
    res.status(200).send(event.object.message)
  })
});

app.get('/callSamsContainer', function (req, res) {
  // create the palmetto event using the helper method we brought in from above (see the above link for and explanation of what is going on and what to pass in)
  var event = newEvent('callSamContainer', 'put', { beep: 'boop' })
  console.log("event:", event)
  // using our configured palmetto, emit a send event with your event object you built above as the second parameter
  ee.emit('send', event)
  // checkout the events api in the Node docs for different instance methods you can call
  // https://nodejs.org/api/events.html#events_class_eventemitter
  ee.once(event.from, function (event) {
    console.log("eventFromSamsContainer:", event)
    // respond to the http call from the client with the message sent back from the palmetto event
    res.status(200).send(event.object.message)
  })
});

//starting our server
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
