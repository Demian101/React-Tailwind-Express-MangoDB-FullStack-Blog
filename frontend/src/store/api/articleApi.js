import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


// 创建Api对象
//createApi() 用来创建 RTKQ 中的 API 对象
// RTKQ 的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const articleApi = createApi({
    reducerPath: 'articleApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/",
        prepareHeaders:(headers, {getState})=>{
            // 获取用户的token
            const token = getState().auth.token;
            if(token){
              // headers.set("Authorization", `Bearer ${token}`);
              headers.set("x-access-token", `${token}`);
            }
            return headers;
        }   // 替代了 mobx 离得拦截器，用来统一设置请求头

    }),  // 指定查询的基础信息，发送请求使用的工具
    tagTypes: ['articles'],   // 用来指定 Api 中的标签类型
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getArticles: build.query({
                query() {  // 指定请求子路径, 访问 baseUrl + 'article' ， 获取全部文章 (默认是 Get 方法)   
                    return 'articles'   // 带参可以这样写： query: (id) => `{/pokeman/offset=${id}}`
                }            
            }),
            getArticleById: build.query({
                query(id) {
                    return `articles/${id}`;   // localhost:8080/api/articles/123
                },
                /* 加上下面这些反而取不到数据.... 
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },
                keepUnusedDataFor: 60, // 设置数据缓存的时间，单位秒 默认60s
                providesTags: (result, error, id) => [{type: 'articles', id}] */
            }),
            
            // del 还没开发
            // delStudent: build.mutation({
            //     query(id) {
            //         //http://localhost:1337/api/students/4
            //         return {
            //             // 如果发送的get请求，需要返回一个对象来设置请求的信息
            //             url: `students/${id}`,
            //             method: 'delete'
            //         };
            //     }
            // }),

            createArticle: build.mutation({
                query(stu) {
                    return {
                        url: 'articles',
                        method: 'post',
                        body: {data: stu} // data  未被定义
                    };
                },
                invalidatesTags: [{type: 'student', id: 'LIST'}]
            }),
            // updateStudent: build.mutation({
            //     query(stu) {
            //         return {
            //             url: `students/${stu.id}`,
            //             method: 'put',
            //             body: {data: stu.attributes}
            //         };
            //     },
            //     invalidatesTags: ((result, error, stu) =>
            //         [{type: 'student', id: stu.id}, {type: 'student', id: 'LIST'}])
            // }),

        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetArticlesQuery,
    useGetArticleByIdQuery,
    // useDelStudentMutation,
    useAddStudentMutation,
    // useUpdateStudentMutation
} = articleApi;

export default articleApi;