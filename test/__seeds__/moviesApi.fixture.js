import mongoose from "mongoose";
const Movie = mongoose.model("Movie");
import "../../src/database";

export const mockUserId = 114419845;
export const mockMovieTitle = "Venom";
export const NO_AUTH_TOKEN_ERROR_RESPONSE = {
    "status": 401,
    "message": "Authorization Header is required",
    "errors": null,
    "body": {}
};
export const MOVIE_ALREADY_EXISTS_RESPONSE = {
    status: 400,
    message: "Venom already exists!",
    errors: null,
    body: { title: "Venom" }
};
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