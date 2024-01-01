const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/users");
const { secret } = require("../utils");


exports.signup = async (req, res) => {
  console.log('Received signup request');
  try {
    console.log('Received signup request with data:', req.body);
    const { name, email, password } = req.body;
    console.log('Received signup request22');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, password });

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save the new user to the database
    await newUser.save();

    // Send a success response to the client
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });

    console.log(token)

    res.status(200).json({user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
