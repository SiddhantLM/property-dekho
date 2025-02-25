const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  img: {
    url: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
  },
  description: {
    type: String,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
