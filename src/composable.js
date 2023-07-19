import { onMounted, ref } from "vue";
import { pocongRequest } from "src/plugins/pocong/src/pocong";
import { Pocong } from "./pocong";

/**
 * @param {typeof definitions } definition
 * @param {{bodyParams?: {}, queryParams?: {}, routeParams?: {}}} initialParams
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
