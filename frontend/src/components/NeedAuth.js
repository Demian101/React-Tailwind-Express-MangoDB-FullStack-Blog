import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const NeedAuth = (props) => {
    const auth = useSelector(state => state.auth);
    const arti = useSelector(state => state.arti);

    console.log("I am NeedAuth", auth);
    console.log("I am arti", arti);
    
    const location = useLocation();
    console.log("auth.isLogged ", auth.isLogged ) 
    return auth.isLogged ?
        props.children :
        <Navigate
            to={"/auth-form"}
            replace
            state={{preLocation: location}}
        />;
};

export default NeedAuth;