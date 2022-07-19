import React, {useRef, useState} from 'react';
import {useLoginMutation, useRegisterMutation} from "../store/api/authApi";
import {useDispatch} from "react-redux";
import {login} from "../store/reducer/authSlice"
import {useLocation, useNavigate} from "react-router-dom";
// import { AiFillCodeSandboxCircle } from 'react-icons/ai';

const AuthForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    // // 引入注册的api
    // const [regFn, {error:regError}] = useRegisterMutation();
    const [loginFn, {error:loginError}] = useLoginMutation();

    const usernameInp = useRef();
    const pwdInp = useRef();
    // const emailInp = useRef();

    // 获取dispatch
    const dispatch = useDispatch();

    // 获取Navigate
    const navigate = useNavigate();
    const location = useLocation();

    // console.log("authForm-->", location.state.preLocation);

    const from = location.state?.preLocation?.pathname || "/";

    const submitHandler = (e) => {
        console.log("submitHandler-->", e);
        e.preventDefault();

        // 获取用户输入的内容
        const username = usernameInp.current.value;
        const password = pwdInp.current.value;
        // 处理登录功能
        if(isLoginForm){
            console.log('登录 -->', username, password);
            loginFn({
                username: username,
                password
            }).then(res => {
                if(!res.error){
                    console.log("res.data: ", res.data)
                    // 登录成功后，需要向系统中添加一个标识，标记用户的登录状态
                    // 登录状态（布尔值，token(jwt)，用户信息）
                    dispatch(login( // retrieve Token from server
                        {
                            token: res.data.accessToken,    // res.data.jwt,
                            username: res.data.username
                        }
                    ));
                    // 跳转页面到之前的目录
                    navigate(from, {replace:true});
                }
            });
        }
        // else{
        //     const email = emailInp.current.value;
        //     //console.log('注册 -->', username, password, email);
        //     regFn({
        //         username,
        //         password,
        //         email
        //     }).then(res => {
        //         if(!res.error){
        //             // 注册成功
        //             setIsLoginForm(true);
        //         }
        //     });
        // }

    };

    return (
      <>  
        <div className="mt-20 justify-between font-inter font-serif items-center">
          <div className="max-w-2xl border border-slate-200 rounded-xl mx-auto shadow-md font-inter p-5">
            <form onSubmit={submitHandler}>
                <label htmlFor="username">
                    <span className="my-4 font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">
                        Username
                    </span>
                    <input ref={usernameInp}  id="username" type="text" placeholder="Your username.." className="my-4 px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:bg-slate-50 focus:border-slate-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer">
                    </input>
                    <p className="text-sm m-1 text-pink-700 invisible peer-invalid:visible">
                        Username is required
                    </p>
                </label>
                <label htmlFor="password">
                    <span className="my-4 font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">
                        Password
                    </span>
                    <input ref={pwdInp}  id="password" type="password" placeholder="Your password.." className="my-4 px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:bg-slate-50 focus:border-slate-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer">
                    </input>
                    <p className="text-sm m-1 text-pink-700 invisible peer-invalid:visible">
                        Password is required
                    </p>
                </label>
                
                <button className="bg-gray-400 px-5 py-2 rounded-full text-white font-semibold font-inter block hover:bg-slate-500 active:bg-slate-600 focus:ring focus:bg-slate-600 mx-auto dark:bg-slate-300 dark:text-slate-800 dark:hover:text-slate-900 dark:hover:bg-slate-100"
                >
                  Login
                </button>
            </form>
          </div>
        </div>
        </>
    );
};

export default AuthForm;

        /* <div>
            <p style={{color:'red'}}>
                {regError && "用户名或电子邮件重复"}
            </p>
            <p style={{color:'red'}}>
                {loginError && "用户名或密码错误"}
            </p>


            <h2>{isLoginForm?"登录":"注册"}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInp} type="text" placeholder={"用户名"}/>
                </div>
                {
                    !isLoginForm &&
                    <div>
                        <input ref={emailInp} type="email" placeholder={"电子邮件"}/>
                    </div>
                }
                <div>
                    <input ref={pwdInp} type="password" placeholder={"密码"}/>
                </div>
                <div>
                    <button>{isLoginForm?"登录":"注册"}</button>
                    <a href="/ss" onClick={
                        event => {
                            event.preventDefault();
                            setIsLoginForm(prevState => !prevState);
                        }
                    }>
                        {
                            isLoginForm?
                            "没有账号？点击注册":
                            "已有账号？点击登录"}
                    </a>
                </div>
            </form>
        </div> */