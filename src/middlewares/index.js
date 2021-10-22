import { checkSchema } from "express-validator";
import validationsPipeChecker from "./valitationsPipeChecker";
import auth from "./auth";
export default (schemas, actionName) => {
    let middlewares = [];
    if (!schemas[actionName]) {
        return middlewares;
    }

    if (schemas[actionName].authentication) {
        middlewares.push(auth.authMiddleware);
    }

    if (schemas[actionName].validationPipe) {
        middlewares.push(checkSchema(schemas[actionName].validationPipe));
        middlewares.push(validationsPipeChecker);
    }

    return middlewares;
};
