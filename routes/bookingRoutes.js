const router = require("express").Router();
const Booking = require("../models/BookingModel");

//create booking
router.post("/createbooking", async (req, res) => {
  try {
    const {
      user,
      place,
      checkIn,
      checkOut,
      name,
      phone,
      numberOfGuests,
      price,
      numberOfNight,
    } = req.body;

    const res = await Booking.create({
      user,
      place,
      checkIn,
      checkOut,
      name,
      phone,
      numberOfGuests,
      price,
      numberOfNight,
    });

    // console.log(booking);

    res.json(res.data);
  } catch (error) {
    res.json(error);
  }
});

// delete bookings
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findOneAndDelete({ place: req.params.id });
    res.json("Delete Booking Successful");
  } catch (error) {
    res.json(error);
  }
});

//get single booking places
router.get("/singlebooking/:bookingId", async (req, res) => {
  try {
    const bookings = await Booking.findById(req.params.bookingId).populate(
      "place"
    );
    // console.log(res);
    // console.log(places);
    res.json(bookings);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get all user booking places
router.get("/:userid", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userid }).populate(
      "place"
    );
    // console.log(res);
    // console.log(places);
    res.json(bookings);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
