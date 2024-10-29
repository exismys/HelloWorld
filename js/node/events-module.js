const events = require("events");

const eventEmitter = new events.EventEmitter();

const exampleCallback = function() {
    console.log("Sing event has been fired.");
}

// Registering an event
eventEmitter.on("sing", exampleCallback);

// Firing an event
eventEmitter.emit("sing");