import { INVALID, REQUIRED } from "../../appConfig/constants";

export default {
    getMovies: {
        authentication: true
    },
    createMovie: {
        authentication: true,
        validationPipe: {
            title: {
                in: "body",
                trim: true,
                isLength: {
                    errorMessage: INVALID("title"),
                    options: { min: 2, max: 55 }
                },
                notEmpty: {
                    errorMessage: REQUIRED("title")
                },
            }
        }
    }
};
