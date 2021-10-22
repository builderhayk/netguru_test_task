import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import corsOptions from "./appConfig/cors";
import modules from "./modules";
export default class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        this.configApp();
        this.setRouter();
        this.setErrorHandler();
        this.enableModules();
    }

    configApp() {
        this.app = express();
        this.app.use(cors(corsOptions))
            .use(bodyParser.json()) // for parsing application/json
            .use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    }

    setRouter() {
        this.router = express.Router();
        this.app.use("/api", this.router);
    }

    enableModules() {
        (async () => {

            await modules(this.router);
        })();
    }

    setErrorHandler() {
        this.app.use(errorHandler);
    }
}
