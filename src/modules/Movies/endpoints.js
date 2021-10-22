import MoviesController from "./movies.controller";
import schemas from "./schemas";
import middleware from "../../middlewares";

const moviesController = new MoviesController();

export default (router) => {
    router.get("/", ...middleware(schemas, "getMovies"), moviesController.getMovies);
    router.post("/", ...middleware(schemas, "createMovie"), moviesController.createMovie);
};
