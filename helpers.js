import { Pocong } from "./src/pocong";

export const prepareRoute = (route, routeParams = undefined) => {
    routeParams &&
        Object.keys(routeParams).forEach((key) => {
            route = route.replace(`{${key}}`, routeParams[key]);
        });

    undefined === route && console.error(`Couldn't create endpoint path for the request from route ${route} and params ${routeParams}`);

    return route;
};