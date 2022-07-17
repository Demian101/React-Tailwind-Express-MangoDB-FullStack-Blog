import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8080/api/'
    }),
    endpoints(build) {
        return {
            register:build.mutation({  // 注册
                query(user) {
                    return {
                        url:'auth/signup',
                        method:"post",
                        body:user, // username password email
                    }
                }
            }),

            login:build.mutation({  // 登录
                query(user) {
                    return {
                        url:'/auth/signin',
                        method:'post',
                        body:user   // identifier 
                    }
                }
            }),

        }
    }
});

export const {
    useRegisterMutation,
    useLoginMutation
} = authApi;