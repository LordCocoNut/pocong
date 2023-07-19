//@ts-check
/** @typedef {import("./adapter/AxiosAdapter.js").default} AxiosAdapterType */

import { Pocong } from "./src/pocong";

export const VuePocong = {
    /**
     * @param app
     * @param {{adapter: AxiosAdapterType, endpoints: {default: any} & Record<string, string>, parseResponse: () => any}} options
     */
    install: (app, options) => {
        Pocong.adapter = options.adapter;
        Pocong.endpoints = options.endpoints;
        Pocong.parseResponse = options.parseResponse;
    },
};

export { default as AxiosAdapter } from "./adapter/AxiosAdapter.js";
export { usePocong, usePocongCrud } from "./src/composable.js";