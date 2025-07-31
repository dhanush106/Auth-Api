import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: [true, "Password is required"] },
    refreshToken: { type: String, default: null },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}; 

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign(
        { id: this._id },
        process.env.JWT_REFRESH_SECRET_KEY,
        { expiresIn: '7d' }
    );
    this.refreshToken = token;
    return token;
};

export const User = mongoose.model("User", userSchema);
