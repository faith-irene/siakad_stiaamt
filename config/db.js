import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database berhasil konek ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}
export default ConnectDB;