import axios from "axios";
import { Pocong } from "src/plugins/pocong/src/pocong";

export default class AxiosAdapter {
    constructor() {
        this.axios = axios;
    }

    parseConfig(definition, route, queryParams, postData) {
        return {
            url: route,
            baseURL: definition.endpoint
                ? Pocong.endpoints[definition.endpoint]
                : Pocong.endpoints.default,
            params: queryParams,
            data: postData,
            method: definition.method,
            config: {
                responseType: definition.responseType,
            },
        };
    }

    get(route, queryParams, definition) {
        return this.axios.request(
            this.parseConfig(definition, route, queryParams)
        );
    }

    delete(route, queryParams, definition) {
        return this.axios.request(
            this.parseConfig(definition, route, queryParams)
        );
    }

    post(route, postData, queryParams, definition) {
        return this.axios.request(
            this.parseConfig(definition, route, queryParams, postData)
        );
    }

    put(route, postData, queryParams, definition) {
        return this.axios.request(
            this.parseConfig(definition, route, queryParams, postData)
        );
    }
}
