const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    perks: {
      type: [String],
      required: true,
    },
    extraInfo: {
      type: String,
      required: true,
    },
    checkIn: {
      type: Number,
      required: true,
    },
    checkOut: {
      type: Number,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    someoneBook: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Place", placeSchema);
