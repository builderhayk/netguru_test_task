import { mongoUrl } from "../appConfig/config";
import { CONNECTION_TIMEOUT } from "../appConfig/constants";
import models from "./models";
import mongoose from "mongoose";

(async () => {
    const options = {
        connectTimeoutMS: CONNECTION_TIMEOUT,
        keepAlive: "true",
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    models(mongoose);
    await mongoose.connect(mongoUrl, options);

    mongoose.set("debug", true);

    mongoose.connection.on("error", (err) => {
        console.error("Mongoose connection: error - " + err);
    });

    mongoose.connection.on("connected", () => {
        console.info("Mongoose connection: connected");
    });

    mongoose.connection.on("open", () => {
        console.info("Mongoose connection: open");
    });

    mongoose.connection.on("reconnected", () => {
        console.info("Mongoose connection: reconnected");
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("Mongoose connection: disconnected");
    });

    process.on("SIGINT", () => {
        mongoose.disconnect(() => {
            process.exit(0);
        });
    });

    return mongoose;
})();
