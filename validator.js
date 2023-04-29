const { body, validationResult } = require('express-validator');

exports.validate = [
    body('ShortName', 'ShortName must exist').exists(),
    body('ShortName', 'ShortName cannot be empty').trim().escape().notEmpty(),
    body('Text', 'Text must exist').exists(),
    body('Text', 'Text cannot be empty').trim().escape().notEmpty()
];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        return next();
    }
};