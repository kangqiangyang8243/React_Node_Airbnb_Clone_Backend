const Place = require("../models/placeModel");

const router = require("express").Router();

//post places
router.post("/createplaces", async (req, res) => {
  try {
    const {
      owner,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const place = await Place.create({
      owner,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    // console.log(res);

    res.json(place);
  } catch (error) {
    res.status(404).json(error);
  }
});

// Edit place
//post places
router.put("/editplace/:placeId", async (req, res) => {
  try {
    const {
      owner,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const place = await Place.findByIdAndUpdate(
      req.params.placeId,
      {
        owner,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      },
      { $news: true }
    );

    // console.log(res);

    res.json("Update successful");
  } catch (error) {
    res.status(404).json(error);
  }
});

//get ALL User post places
router.get("/:id", async (req, res) => {
  try {
    const places = await Place.find({ owner: req.params.id });
    // console.log(res);

    res.status(200).json(places);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get User post places
router.get("/singlePlace/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    // console.log(res);

    res.json(place);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    // console.log(res);
    // console.log(places);
    res.json(places);
  } catch (error) {
    res.status(404).json(error);
  }
});

// check someoneBook
router.put("/someoneBook/:id", async (req, res) => {
  try {
    const { someoneBook } = req.body;
    const res = await Place.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          someoneBook,
        },
      },
      {
        $news: true,
      }
    );
    res.json("update success");
  } catch (error) {
    res.json(error);
  }
});

// delete Post
router.delete("/:id", async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json("Delete Post Successful");
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
