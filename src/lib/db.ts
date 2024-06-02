import mongoose from "mongoose"

const connectDB = async () => {

    if(mongoose.connections[0].readyState)
        return true;

    try {

        const mongodbURI = process.env.MONGODB_URI;

        if(!mongodbURI) {
            console.error("Could not find mongodb uri in environment");
            return false;
        }

        await mongoose.connect(mongodbURI);
        console.log("MongoDB Connected");
        return true;

    } catch(e) {
        console.error(e);
    } 

    return false;

}

export default connectDB;