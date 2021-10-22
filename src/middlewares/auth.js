import jwt from "jsonwebtoken";
import { REQUIRED } from "../appConfig/constants";
import { jwtSecret, jwtIssuer } from "../appConfig/config";
import { AuthError } from "../appConfig/errors";

const auth = {
    authMiddleware (req, res, next) {
        try {
            const authHeaderContent = req.headers["authorization"];
            if (!authHeaderContent) {
                throw new Error(REQUIRED("Authorization Header "));
            }
            const token = authHeaderContent.split(" ")[1];
            req.user = jwt.verify(token, jwtSecret, { issuer: jwtIssuer });
            next();
        } catch (e) {
            next(new AuthError(e.message));
        }
    }
};

export default auth;