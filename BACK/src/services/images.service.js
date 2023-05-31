import createError from 'http-errors';

import { fetchPixabayImagesInfo } from './pixabay.sevice.js';

// key extranl API field name, value - wanted name
const imagesInfoRequiredFieldsTranslation = {
    webformatURL: 'url',
    views: 'views',
    downloads: 'downloads',
    likes: 'likes',
    comments: 'comments'
}

export const getImagesInfo = async (page, perPage, category, sortBy) => {
    const imagesInfo = await fetchPixabayImagesInfo(page, perPage, category, sortBy);
   
    if(!imagesInfo || !imagesInfo.length) {
        throw createError(404, `Images not found!`);
    } else {
        return filterFields(imagesInfo);
    }
}

const filterFields = (imagesInfo=[]) => {
    return imagesInfo.map(imageObj => Object.keys(imagesInfoRequiredFieldsTranslation).reduce(
        (imageData, currFieldName) => {
            imageData[imagesInfoRequiredFieldsTranslation[currFieldName]] = imageObj[currFieldName];
            return imageData;
        }, {})
    )
}
