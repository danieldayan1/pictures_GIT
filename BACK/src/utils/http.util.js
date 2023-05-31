import axios from 'axios';
import createError from 'http-errors';

export const methods = {
    get: "GET"
}

export const get = async (url, params={}, customErrorMessage) => {
    try {
        const response = await axios.get(url, {
            params
        });
    
        return response.data;
    } catch(err) {
        throw httpErrorHandler(methods.get, url, err, customErrorMessage)
    }
}

export const httpErrorHandler = (method, url, err, message) => {
    console.log(`external http request failed = [${method}] - ${url} - ${err}`);
    return (createError(err?.response?.status || 500, message || `The request to ${url} failed`));
}
