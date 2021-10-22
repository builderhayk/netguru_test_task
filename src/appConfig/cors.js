import { corsOrigins } from "./config";

const corsOptions = {
    development: {
        origin: corsOrigins,
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    },
    production: {
        origin: corsOrigins || "*",
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    }
};

export default corsOptions[process.env.NODE_ENV || "development"];
