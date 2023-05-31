import createHttpError from 'http-errors'

const defaultOptions = {
    stripUnknown: true // remove unknown props
};

export const QueryValidator = (joiSchema, options={}) => {
    const fullOptions = {
        ...defaultOptions,
        ...options
    };

    return (req, _res, next) => {
        const { error, value } = joiSchema.validate(req.query, fullOptions);
        if (error) {
            next(createHttpError(400, `Validation error: ${error.details.map(x => x.message).join(', ')}`));
        } else {
            req.query = value;
            next();
        }
    }
}
