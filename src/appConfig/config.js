require("dotenv").config();

export const apiUrl = process.env.API_URL;
export const appUrl = process.env.APP_URL;
export const apiPort = process.env.PORT;

export const corsOrigins = process.env.CORS_ORIGINS
        ?.split(",");

export const mongoUrl = process.env.MONGO_CONNECTION_STRING;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtIssuer = process.env.JWT_ISSUER;
export const omdbApiKey = process.env.OMDB_API_KEY;
