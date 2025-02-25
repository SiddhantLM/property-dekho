const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate the input data
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin account
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newAdmin);
    // await newAdmin.save();

    res
      .status(200)
      .send({ success: true, message: "Admin account created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input data
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the admin account by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { name: admin.name, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { signup, login };
