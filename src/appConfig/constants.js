export const CONNECTION_TIMEOUT = 30 * 1000;

export const VALIDATION_ERROR = "Request didn't pass validation";
export const PERMISSION_DENIED = "Permission Denied";
export const SOMETHING_WENT_WRONG = "Something went wrong, please try again";
export const REQUIRED = resource => `${resource} is required`;
export const INVALID = resource => `${resource} is invalid`;
export const ALREADY_EXISTS = resource => `${resource} already exists!`;
export const NOT_EXISTS = resource => `${resource} doesn't exist!`;
export const SERVICE_UNAVAILABLE = "Service is temporarily unavailable";

export const DATE_FORMAT_STRING = "YYYY-MM-DD";


export const USER_ROLES = {
    BASIC: "basic",
    PREMIUM: "premium",
};

export const NOT_ALLOWED_TO_CREATE_MOVIE = "Basic users are not allowed to create more than 5 movies per month";