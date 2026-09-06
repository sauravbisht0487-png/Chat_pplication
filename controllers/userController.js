import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

// signup
export const register = async (req, res) => {
  try {
    const { fullName, username, password, gender } = req.body;

    if (!fullName || !username || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (!["male", "female"].includes(gender)) {
      return res.status(400).json({ message: "Gender must be either male or female" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // profilePhoto
    const femaleProfilePhoto = `https://avatarapi.runflare.run/public/girl?username=${username}`;
    const maleProfilePhoto = `https://avatarapi.runflare.run/public/boy?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePhoto: user.profilePhoto,
        gender: user.gender,
        token,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// logout.....
export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });//maxage..like kitna time tak use karna chatha ho
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all users (for sidebar / chat list) — excludes logged-in user
export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId= req.id; 
    const otherUsers= await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).json(otherUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};