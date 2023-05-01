const { body, validationResult } = require('express-validator');

exports.validate = [
    body('ShortName', 'ShortName attribute must exist').exists(),
    body('ShortName', 'ShortName value cannot be empty').trim().escape().notEmpty(),
    body('Text', 'Text attribute must exist').exists(),
    body('Text', 'Text value cannot be empty').trim().escape().notEmpty()
];

exports.validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ Errors: errors.array().map(error => error.msg) });
    }
    else {
        return next();
    }
};