//@ts-check
/**
 * @template T 
 * @typedef {import("vue").Ref<T>} Ref<T>
 */

/** @typedef {{route: string, method: string }} PocongConfigDefinitionRequired */
/** @typedef {{endpoint?: string, responseType?: string, model?: () => Object, onMounted?: boolean}} PocongConfigDefinitionOptional */
/** @typedef {PocongConfigDefinitionRequired & PocongConfigDefinitionOptional} PocongConfigDefinition */
/** @typedef {{create?: PocongConfigDefinition, update?: PocongConfigDefinition, delete?: PocongConfigDefinition}} PocongCrudConfigDefinition */
/** @typedef {Record<string, PocongConfigDefinition|PocongCrudConfigDefinition>} Definitions */
/** @typedef {{routeParams?: Record<string, any>,queryParams?: Record<string, any>,bodyParams?: Record<string, any>}} RequestParams */
/** @typedef {{error: Ref<string|undefined>, loading: Ref<boolean>, requestDelete: (routeParams, bodyParams, queryParams) => Promise<any>, requestUpdate: (routeParams, bodyParams, queryParams) => Promise<any>,requestCreate: (routeParams, bodyParams, queryParams) => Promise<any>}} PocongCrudComposableReturn */

export { };