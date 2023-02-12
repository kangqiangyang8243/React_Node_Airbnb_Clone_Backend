const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      require: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      require: true,
    },

    numberOfGuests: {
      type: Number,
      required: true,
    },

    numberOfNight: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
