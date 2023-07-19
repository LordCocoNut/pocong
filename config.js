import { Organization, UserList } from "src/api/model/data-and-settings";

/**
 * @type {Record<string,{method: get, model: any}>}
 */
export const definitions = {
    UsersList: {
        method: "get",
        route: "/users",
        onMounted: true,
        model: () => UserList,
    },
    OrganizationDetail: {
        method: "get",
        route: "/organizations/{id}",
        onMounted: true,
        model: () => Organization,
    },
    UpdateOrganization: {
        method: "put",
        route: "/organizations/{id}",
    },
    CreateOrganization: {
        method: "post",
        route: "/organizations",
    }
};
