import { getStringEnvByName, getNumberEnvByName } from '../utils/env.util.js';

export const config = {
    baseUrl: getStringEnvByName("PIXABAY_BASE_URL", "https://pixabay.com/api/"),
    fetchImagesEndpoint: getStringEnvByName("PIXABAY_FETCH_IMAGES_ENDPOIND", "/"),
    // Without default value because it's a secret
    key: getStringEnvByName("PIXABAY_KEY"),
    // 20 as the default of pixabay
    defaultImagesPerPage: getNumberEnvByName("DEFAULT_IMAGES_PER_PAGE", 20)
};