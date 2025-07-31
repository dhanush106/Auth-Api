import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ message: "Username or email already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.cookie('refreshToken', newUser.generateRefreshToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Optionally, send a welcome email or perform other post-registration actions

    const mailOptions = {
        from: process.env.SENDER_EMAIL, // e.g., '
        to: email,
        subject: "Welcome to Our Service",
        text: `Hello ${username},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nThe Team`
    }

    await transporter.sendMail(mailOptions)
        .then(() => console.log("Welcome email sent successfully"))

    return res.status(201).json({ message: "User registered successfully" });
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user || !(await user.isValidPassword(password))) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    user.refreshToken = user.generateRefreshToken();
    await user.save();

    const mailOptions = {
        from: process.env.SENDER_EMAIL, // e.g., '
        to: "dhanussh_sarppor@srmap.edu.in",
        subject: "Welcome to Our Service",
        text: `Hello ${username},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nThe Team`
    }

    await transporter.sendMail(mailOptions)
        .then(() => console.log("Welcome email sent successfully"))

    // return res.status(200).json({ token, refreshToken: user.refreshToken });
    return res.status(200).json({
        message: "User logged in successfully",
        token,
        refreshToken: user.refreshToken,
        user
    });
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })
    } catch (error) {
        return res.json({ message: "Error logging out" });
    }

    return res.json({ message: "User logged out successfully" });

};