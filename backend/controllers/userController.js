import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender, status } =
      req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exit try different" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // profilePhoto
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
      status,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
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
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
        userStatus: user.status,
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.status = status;
    await user.save();

    res.json({ msg: "User status updated successfully", user });
  } catch (err) {
    console.error("Error updating user status:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};

export const getUserStatus = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("status");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ status: user.status });
  } catch (error) {
    console.error("Error fetching user status:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const getStatusByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("status");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ status: user.status });
  } catch (error) {
    console.error("Error fetching user status:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    const timeout = Math.random() * (15000 - 5000) + 5000;
    setTimeout(() => {
      res.status(200).json({
        message: "This is a mock response from the LLM based on user input",
        prompt:`Got this prompt: ${prompt}`
      });
    }, timeout);
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const generateResponse = async (req, res) => {
//   const { prompt } = req.body;
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const chat = model.startChat({
//     history: [
//       {
//         role: "user",
//         parts:
//           "You need to pretend a human who is offline or busy right now, on the behalf of them you need to make the conversation going on...",
//       },
//       {
//         role: "model",
//         parts:
//           "Hello! Right now current user is busy, that's why on the behalf of them, I, Google's Gemini is responding back to you. How's your day going?",
//       },
//     ],
//     generationConfig: {
//       maxOutputTokens: 100,
//     },
//   });

//   const msg = { prompt };
//   const result = await chat.sendMessage(msg);
//   console.log(result.response.text());
//   res.status(200).json({
//     message: result.response.text(),
//   });
// };
