import mongoose from "mongoose";

const startDB = async () => {
    // @ts-ignore
    const connect: any = await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`db start success! ${connect?.connection.host}`)
}

export default startDB;
