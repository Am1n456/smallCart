import mongoose from "mongoose"

export const dbConnect = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
};