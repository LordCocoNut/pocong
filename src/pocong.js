/**
 * @typedef {object} PocongRequestWrapper
 * @property {string} route
 * @property {object} routeParams
 * @property {object} queryParams
 * @property {string?} endpoint
 */

import { prepareRoute } from "../helpers.js";

/**
 * @type {{endpoints: {default: undefined}, adapter?: AxiosAdapter, parseResponse: () => any}}
 */
export const Pocong = {
    adapter: undefined,
    endpoints: {
        default: undefined,
    },
    parseResponse: (
        endpointResponse,
        model,
        successCallback,
        errorCallback
    ) => {
        console.error("Pocong response handle was not defined");
    },
};

/**
 *
 * @param {PocongRequestWrapper} requestConfig
 * @returns {(function(string): void)|*}
 */
const pocongGet = (requestConfig, routeParams, queryParams) => {
    return Pocong.adapter.get(
        prepareRoute(requestConfig.route, routeParams),
        queryParams,
        requestConfig
    );
};
/**
 *
 * @param {PocongRequestWrapper} requestConfig
 * @returns {(function(string): void)|*}
 */
const pocongDelete = (requestConfig, routeParams, queryParams) => {
    return Pocong.adapter.delete(
        prepareRoute(requestConfig.route, routeParams),
        queryParams,
        requestConfig
    );
};

/**
 *
 * @param {PocongRequestWrapper} requestConfig
 * @returns {(function(string): void)|*}
 */
const pocongPost = (requestConfig, routeParams, queryParams, bodyParams) => {
    return Pocong.adapter.post(
        prepareRoute(requestConfig.route, routeParams),
        bodyParams,
        queryParams,
        requestConfig
    );
};

/**
 *
 * @param {PocongRequestWrapper} requestConfig
 * @returns {(function(string): void)|*}
 */
const pocongPut = (requestConfig, routeParams, queryParams, bodyParams) => {
    return Pocong.adapter.put(
        prepareRoute(requestConfig.route, routeParams),
        bodyParams,
        queryParams,
        requestConfig
    );
};

/**
 * @param {string} method 
 */
export const pocongRequest = (method) => {
    return {
        get: pocongGet,
        post: pocongPost,
        put: pocongPut,
        delete: pocongDelete,
    }[method];
};
