import mongoose from "mongoose";
let isConnected = false;


export const connectToDB=async ()=>{
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("all connections are set")
        return;
    }

    try {
        
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_NAME || 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected=true;
        console.log("db connected")
    } catch (error) {
        console.log(error)
        
    }
}