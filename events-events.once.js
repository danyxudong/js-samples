// jshint esversion: 8

const { once, EventEmitter} = require("events");

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit("myevent", 42);
  });

  const [value] = await once(ee, "myevent");
  console.log(value);

  const err = new Error("kaboom");
  process.nextTick(() => {
    ee.emit("error", err);
  });

  try {
    await once(ee, "myevent");
  } catch(e) {
    console.log("error happened", e);
  }
}

run();
