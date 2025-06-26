const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Test route
const test = (req, res) => {
  res.json("test is working simret congrats");
};

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return res.json({ error: "Name is required" });
    if (!password || password.length < 6)
      return res.json({ error: "Password must be at least 6 characters" });

    const exist = await User.findOne({ email });
    if (exist) return res.json({ error: "Email is already taken" });

    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "No user found" });

    if (user.password !== password) {
      return res.json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Get profile
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.json(null);

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) {
      console.log("Token error:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
    res.json(user);
  });
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
