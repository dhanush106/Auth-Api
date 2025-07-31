import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/vidtube`);
        console.log(connectionInstance.connection.host);
        console.log(connectionInstance.connection.name);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;