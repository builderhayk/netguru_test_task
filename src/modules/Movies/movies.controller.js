import { CREATED_CODE, SUCCESS_CODE } from "../../appConfig/status-codes";
import mongoose from "mongoose";
const Movie = mongoose.model("Movie");
import MovieService from "../../services/movie.service";
import { BadRequest, Forbidden } from "../../appConfig/errors";
import { ALREADY_EXISTS, NOT_ALLOWED_TO_CREATE_MOVIE, USER_ROLES } from "../../appConfig/constants";

class MoviesController {
    async getMovies({ user }, res, next) {
        try {
            const movies = await Movie.find({ userId: user.userId }).lean();
            res.status(SUCCESS_CODE).send({ movies });
        } catch (e) {
            next(e);
        }
    }

    async createMovie({ user, body }, res, next) {
        try {
            const { title } = body;
            const movie = await MovieService.getMovieByTitle(title);
            if (user.role === USER_ROLES.BASIC) {
                const oneMonthSubtracted = new Date(new Date().setMonth(new Date().getMonth() - 1));
                const moviesCountPerThisMonth = await Movie.countDocuments({
                    createdAt: {
                        $gte:new Date(oneMonthSubtracted),
                        $lt: new Date()
                    }
                });
                if (moviesCountPerThisMonth > 4) {
                    throw new Forbidden(NOT_ALLOWED_TO_CREATE_MOVIE);
                }
            }
            const movieExists = await Movie.findOne({ title: movie.Title }).lean();
            if (movieExists) {
                throw new BadRequest(ALREADY_EXISTS(title));
            }
            const new_movie = await Movie.create({
                title: movie.Title,
                userId: user.userId,
                released: new Date(movie.Released),
                genre: movie.Genre,
                director: movie.Director,
            });
            res.status(CREATED_CODE).send(new_movie);
        } catch (e) {
            next(e);
        }
    }
}

export default MoviesController;
