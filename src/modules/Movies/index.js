import { Router } from "express";
import MoviesEndpoints from "./endpoints";

export default class MoviesModule {
    constructor(apiRouter) {
        this.apiRouter = apiRouter;
        this.router = Router();
    }

    createEndpoints() {
        this.assignRouter();
        this.assignEndpoints();
    }

    assignRouter() {
        this.apiRouter.use("/movies", this.router);
    }

    assignEndpoints() {
        MoviesEndpoints(this.router);
    }
}
