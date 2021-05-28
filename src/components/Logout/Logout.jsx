import UserContext from '../UserContext/UserContext.jsx'
import { auth } from  '../../Firebase.js';
import { useState, useEffect, useContext } from 'react';
import Main from '../Main/Main.jsx'
import {NavLink, Route, Switch, BrowserRouter as Router} from 'react-router-dom';

const Logout = () =>{
    const { user, setUser } = useContext(UserContext);

    const signOut = () => {
       auth.signOut().then(() => {
            console.log("signed out!")
            setUser(!user);
          }).catch((error) => {
            console.log("error!")
          });
          
    }

    return ( 
        <>
            <h1>Czy na pewno chcesz się wylogować? </h1>
            <button onClick={signOut}>Tak</button> 
        
        </>
    )
}

export default Logout;