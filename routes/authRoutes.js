const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    const savedUser = await User.create(newUser);
    const { password, ...user } = savedUser._doc;

    // console.log(savedUser);
    res.status(201).json({ status: true, user });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.json({ msg: "User Not Found!", status: false });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.json({ msg: "Invalid Password!", status: false });
    }
    const { password, ...userWithoutPassword } = user._doc;
    // console.log(userWithoutPassword);
    res.status(200).json({ status: true, userWithoutPassword });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
