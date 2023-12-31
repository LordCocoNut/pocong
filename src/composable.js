import { onMounted, ref } from "vue";
import { Pocong, pocongRequest } from "./pocong.js";

/**
 * @typedef {import("../types.js").RequestParams} RequestParams
 * @template T 
 * @typedef {import("vue").Ref<T>} Ref<T>
 */

/**
 * @param {import("../types.js").PocongConfigDefinition} definition
 * @param {RequestParams} initialParams
 * @returns {{request: ((routeParams: {}, bodyParams: {}, queryParams: {}): Promise<void>), data: *, error: *, loading: Ref<UnwrapRef<boolean>>}}
 */
export const usePocong = (definition, initialParams = {}) => {
    const data = ref(undefined);
    const error = ref(undefined);
    const loading = ref(false);

    /**
     * @param {{}} routeParams
     * @param {{}} bodyParams
     * @param {{}} queryParams
     * @returns {Promise<void>}
     */
    const request = async (routeParams, bodyParams, queryParams) => {
        loading.value = true;

        routeParams = routeParams || initialParams.routeParams;
        queryParams = queryParams || initialParams.queryParams;
        bodyParams = bodyParams || initialParams.bodyParams;

        error.value = undefined;

        const requestMethod = pocongRequest(definition.method);

        const response = await requestMethod(
            definition,
            routeParams,
            queryParams,
            bodyParams
        );

        console.log(response);

        Pocong.parseResponse(
            response,
            definition.model?.(),
            (parsedResponseData) => {
                data.value = parsedResponseData;
            },
            (errorMessage) => {
                data.value = undefined;
                error.value = errorMessage;
            }
        );

        loading.value = false;
    };

    definition.onMounted &&
        onMounted(async () => {
            await request();
        });

    return { data, error, loading, request };
};


/**
 * 
 * @param {import("../types.js").PocongCrudConfigDefinition} crudDefinition 
 * @param {RequestParams} initialParams
 * 
 * @returns {import("../types.js").PocongCrudComposableReturn}
 */
export const usePocongCrud = (crudDefinition, initialParams = {}) => {
    const error = ref(undefined);
    const loading = ref(false);
    const data = ref(undefined);

    const request = (operation) => async (routeParams, bodyParams, queryParams) => {
        loading.value = true;

        const definition = crudDefinition[operation];
        routeParams = routeParams || initialParams.routeParams;
        queryParams = queryParams || initialParams.queryParams;
        bodyParams = bodyParams || initialParams.bodyParams;

        error.value = undefined;

        const requestMethod = pocongRequest(definition.method);
        console.log(requestMethod);

        const response = await requestMethod(
            definition,
            routeParams,
            queryParams,
            bodyParams
        );

        console.log(response);

        Pocong.parseResponse(
            response,
            definition.model?.(),
            (parsedResponseData) => {
                data.value = parsedResponseData;
            },
            (errorMessage) => {
                data.value = undefined;
                error.value = errorMessage;
            }
        );

        loading.value = false;
    };

    return {
        error, loading, data,
        requestDelete: request("delete"),
        requestUpdate: request("update"),
        requestCreate: request("create")
    };
}