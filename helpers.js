import { Pocong } from "./src/pocong";

export const prepareRoute = (route, routeParams = undefined) => {
    routeParams &&
        Object.keys(routeParams).forEach((key) => {
            route = route.replace(`{${key}}`, routeParams[key]);
        });

    return route;
};
