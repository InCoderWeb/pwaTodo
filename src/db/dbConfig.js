import mongoose from "mongoose";

export async function connect () {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        })
        connection.on("error", (error) => {
            console.log(`mongoDB Connection error ${error}`);
            process.exit(1);
        })
    } catch (error) {
        console.log(error);
    }
}