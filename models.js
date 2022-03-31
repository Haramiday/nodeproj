const mongoose = require("mongoose");

//Driver Model
const DriverSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    license: {
      type: String,
      default: 0,
    },
    location: {
        latitude: {
            type: Number,
          },
        longitude: {
            type: Number,
          },
        last_update: {
            type: String,
          },
      },
  });
  
const Driver = mongoose.model("Driver", DriverSchema);


module.exports.Driver = Driver;