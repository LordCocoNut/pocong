import { Pocong } from "src/plugins/pocong/src/pocong";

export default {
    /**
     * @param app
     * @param {{adapter: AxiosAdapter}} options
     */
    install: (app, options) => {
        Pocong.adapter = options.adapter;
        Pocong.endpoints = options.endpoints;
        Pocong.parseResponse = options.parseResponse;
    },
};
