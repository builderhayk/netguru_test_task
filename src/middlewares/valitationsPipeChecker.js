import { validationResult } from "express-validator";
import { VALIDATION_ERROR_CODE } from "../appConfig/status-codes";

export default async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }

    next();
};
