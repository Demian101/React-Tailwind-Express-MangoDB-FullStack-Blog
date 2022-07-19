import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./api/authApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authSlice} from "./reducer/authSlice";
import {articleSlice} from "./reducer/articleSlice";
import articleApi from "./api/articleApi";
// import studentApi from "./api/studentApi";

const store = configureStore({

    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        [articleApi.reducerPath]:articleApi.reducer,
        // [studentApi.reducerPath]:studentApi.reducer,
        arti:articleSlice.reducer,
        auth:authSlice.reducer,
    },

    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            articleApi.middleware
            // studentApi.middleware
            )

});

setupListeners(store.dispatch);

export default store;
