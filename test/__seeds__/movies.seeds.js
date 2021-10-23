import "../../src/database";
import mongoose from "mongoose";
import { AuthError } from "../../src/appConfig/errors";
import { REQUIRED } from "../../src/appConfig/constants";

const Movie = mongoose.model("Movie");
export const createMovie = async ({ userId, title }) => {
    await Movie.create({
        "userId": userId,
        "title": title,
        "released": "2018-10-05T00:00:00.000Z",
        "genre": "Action, Adventure, Sci-Fi",
        "director": "Ruben Fleischer",
    });
};

export const deleteMovies = async ({ userId }) => {
    await Movie.deleteMany({ userId });
};

export const stubAuthMiddleware = (req, res, next) => {
    try {
        const authHeaderContent = req.headers["authorization"];
        if (!authHeaderContent) {
            throw new Error(REQUIRED("Authorization Header"));
        }
        req.user = {
            userId: 114419845,
            role: authHeaderContent.split(" ")[1] === "basic" ? "basic" : "premium",
        };
        next();
    } catch (e) {
        next(new AuthError(e.message));
    }
};