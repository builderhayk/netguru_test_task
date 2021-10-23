export const NOT_ALLOWED_TO_CREATE_MOVIE_MSG = "Basic users are not allowed to create more than 5 movies per month" ;

export const NOT_ALLOWED_TO_CREATE_MOVIE_RESPONSE_OBJ = {
    status: 403,
    message: NOT_ALLOWED_TO_CREATE_MOVIE_MSG,
    errors: null,
    body: { title: "Batman" }
} ;
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

export const VALIDATION_ERROR_EXAMPLE ={
    errors: [
        {
            value: "V",
            msg: "Title is invalid",
            param: "title",
            location: "body"
        }
    ]
};
export const moviesTitles = ["Venom 2", "X-men", "Spider man", "Hulk"];