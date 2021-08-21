// Iteration #1
const { Schema, model } = require("mongoose");

const droneSchema = new Schema({
  // unless you are defining more than the "type" property, you don't have to use {} (see below)
  // title: {type: String, require: true},
  name: String,
  propellers: Number,
  maxSpeed: Number,
});

const Drone = model("Drone", droneSchema);
module.exports = Drone;