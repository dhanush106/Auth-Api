import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js'; 
import {app} from './app.js';



const PORT = process.env.PORT || 5000;



// Connect to MongoDB
connectDB()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1); // Exit process with failure
});