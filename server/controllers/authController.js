import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const userResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  balance: user.virtualBalance,
  role: user.role,
});

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({ user: userResponse(user), token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email and password
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    // Find user
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    // Check password
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({ user: userResponse(user), token: generateToken(user._id) });
    }

    res.status(401).json({
      message: "Invalid email or password",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  res.json({ user: userResponse(req.user) });
};
