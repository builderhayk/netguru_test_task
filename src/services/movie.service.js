import axios from "axios";
import { omdbApiKey } from "../appConfig/config";
import { NotFound } from "../appConfig/errors";
import { NOT_EXISTS } from "../appConfig/constants";

export default class MovieService {
    static async getMovieByTitle(title) {
        const { data } = await axios(`https://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`);
        if (data?.Response === "False") {
            throw new NotFound(NOT_EXISTS("Movie with this name"));
        }
        return data;
    }
}