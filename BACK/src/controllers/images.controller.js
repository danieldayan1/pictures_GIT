import { getImagesInfo } from '../services/images.service.js';
import { sortTypesValues, sortByValues } from '../dto/image.dto.js';

export const getImagesByPagination = async (req, res, next) => {
    try {
        const { page, perPage, category } = req.query
        res.json(await getImagesInfo(page, perPage, category));
    } catch (err) {
        next(err);
    }
}

export const getImagesBySort = async (req, res, next) => {
    try {
        const { page, perPage, category, sortBy, sortType } = req.query;
        let imagesInfo = await getImagesInfo(page, perPage, category, sortBy)
        
        // pixabay support only "latest" so for firsts we need to revers then
        if(sortBy == sortByValues.date && sortType == sortTypesValues.asc) {
            imagesInfo = imagesInfo.reverse();
        }

        res.json(imagesInfo);
    } catch (err) {
        next(err);
    }
}
