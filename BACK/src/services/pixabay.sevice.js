import path from 'path';

import { get } from '../utils/http.util.js';
import { config } from '../configs/pixabay.config.js';

const { 
    baseUrl, 
    key, 
    fetchImagesEndpoint,
    defaultImagesPerPage 
} = config;

const sortByTranslation = {
    date: "latest"
};

export const fetchPixabayImagesInfo = async (page = 0, perPage = defaultImagesPerPage, category, sortBy) => {
    const imagesInfo = await get(path.join(baseUrl, fetchImagesEndpoint), {
        key,
        ...(perPage && {per_page: perPage}),
        ...(page && {page}),
        ...(category && {q: category}),
        ...((sortBy && sortByTranslation[sortBy]) && {order: sortByTranslation[sortBy]})
    }, 'Failed to fetch images');

    return imagesInfo.hits;
}
