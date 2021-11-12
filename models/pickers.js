const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let pickerSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es necesario"],
  },
  telefono: {
    type: Number,
    require: [true, "El numero es necesario"],
  },
});

module.exports = mongoose.model("Picker", pickerSchema);
