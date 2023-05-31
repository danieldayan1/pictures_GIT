import express from 'express';

import { QueryValidator } from '../middlewares/validator.middleware.js';
import {
    getPaginationImageSchema,
    getSortedImagesSchema
} from '../dto/image.dto.js';
import { getImagesByPagination, getImagesBySort } from '../controllers/images.controller.js';

const router = express.Router();

/* GET pagination images */
router.get('/', QueryValidator(getPaginationImageSchema), getImagesByPagination);
/* GET sorted images */
router.get('/sort', QueryValidator(getSortedImagesSchema), getImagesBySort);

export default router;