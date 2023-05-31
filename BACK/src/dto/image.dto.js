import Joi from 'joi';

export const sortByValues = {
    date: 'date',
}

export const sortTypesValues = {
    desc: 'desc',
    asc: 'asc'
}

const baseProps = {
    page: Joi.number().
        integer()
        .min(1)
        .optional(), 
    perPage: Joi.number()
        .integer()
        .min(3)     // As the pixabay doc 
        .max(200)   // As the pixabay doc 
        .optional(),
    category: Joi.string()
        .max(100)  // As the pixabay doc 
        .optional()
}

export const getPaginationImageSchema = Joi.object({
    ...baseProps
});

export const getSortedImagesSchema  = Joi.object({
    ...baseProps,
    sortBy: Joi.string()
        .valid(sortByValues.date)
        .optional(),
    sortType: Joi.string()
        .valid(sortTypesValues.desc, sortTypesValues.asc)
        .optional(),

});
