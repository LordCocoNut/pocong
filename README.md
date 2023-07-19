# Pocong
> **Hard WIP**: this package is still work in progress. Documentation might be misleading or uncomplete or contain bad practices
> as there has to be stuff done for handling proper plugin setup etc.

Slang term for local train Počong, is a Vue3 wrapper for multiple rest services like Axios. It provides simplified
handling of
rest api request by providing configuration file for endpoints as well as simple switching between supported rest api
libraries.

## Currently supported

- Axios **get, post, put, delete**

## To be done
- [ ] Fix js definitions and polish the code to make it as natural to use as possible without digging around
- [ ] Add pinia integration
- [ ] Add http package support

## Usage
To start with, you have to configure the plugin for the app. The folowing code is just an example. It is recommended to specify
plugin installation in separate file.

```js
//Import pocong plugin
import {VuePocong, AxiosAdapter} from "pocong";

///Create vue 3 app as normally
const app = createApp({
    /* root component options */
});

///Provide Pocong plugin
app.use(VuePocong, {
    adapter: new AxiosAdapter(),
    endpoints: {
        default: "https://my-api-url.com",
    },
    //Custom response process method. Allowing you to easily handle repsonse with custom endpointResponse model
    parseResponse: (
        endpointResponse,
        model,
        successCallback,
        errorCallback
    ) => {
        if (!endpointResponse.isSuccess()) {
            return errorCallback(endpointResponse.data);
        }

        if (endpointResponse.isSuccess() && model) {
            return successCallback(new model(endpointResponse));
        }

        return successCallback(endpointResponse.data);
    },
});

```

### Configure
To prepare your definitios, simply create a static object with configuration for specific endpoints. Supported configuraton
```js
export const definitions = {
    MyDefinition: {
        method: "get", //method to use
        route: "/any-path/with/{param}", //Simple route path wrapping any variables in '{}', will be filled from route parameters
        onMounted:true, //Trigger request on component mount
        model:() => MyModelObject, //Function that returns class supposed to be used as data wrapper
        responseType: "Blob" //Simple parameter passed in request configuration where you need change the response type to blob for example
    }
};
```

### Usage in template composable
```js

//If onMounted: true is specified in the config, we dont need to do anything else
// {data, request, loading, error}
const users = usePocong(definitions.UsersList);

//In case you need to provide for example id of the entity (for detail requests, you can specify initial params)
const users = usePocong(definitions.UserDetail, {
    routeParams: {id: userDetailId}, //u can use for example vueRouter shortcut as
    // routeParams: route.params
});

//If you need to do request any time but the Pocong config supported like onMounted, you can acces **request** method on the composable

users.request() //This will do request as defined via composable

//If you need to do request for example to store form data, you can provide current params to the request method
//Considering you have properly configured the CreateUserMethod
const users = usePocong(definitions.CreateUser);
const store = () => users.request(
    route.params,
    formData
);


```