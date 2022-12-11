const mongoose = require("mongoose");
const bootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, "Please providearating forabootcamp"] ,
  },
  description: {
    type: String,
    required: [true, "Please provide bootcamp with description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide bootcamp with price"],
  },
});
// turn validation schema into a modal object
const Bootcamp = mongoose.model('Bootcamp', bootcampSchema);

module.exports=Bootcamp;
