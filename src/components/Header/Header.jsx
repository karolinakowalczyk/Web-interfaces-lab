import { auth } from  '../../Firebase.js';
import MainPage from  '../MainPage/MainPage.jsx';
import {NavLink, BrowserRouter as Router} from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () =>{
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user) {
                setUser(user);
                //localStorage.setItem(user, true);
                console.log("user logged");
            }
            else {
                setUser(null);
                //localStorage.removeItem(user);
                console.log("user unlogged");
            }
        });
        return () => unsubscribe();
    }, []);

    const logOut = () => {
        auth.signOut();
    }

    if(user)
        return (
            <>
            <Router>
                <header>
                    <div>Pizza restaurant</div>
                    <nav>
                        <NavLink to="/" exact>Strona główna</NavLink>
                        <NavLink to="/myprofile">Mój profil</NavLink>
                        <a href="/" onClick={logOut}>Wyloguj się</a>
                    </nav>
                </header>
                <MainPage></MainPage>
            </Router>
            </>
        )
    return (
        <>
        <Router>
            <header>
                <div>Pizza restaurant</div>
                <nav>
                    <NavLink to="/" exact>Strona główna</NavLink>
                    <NavLink to="/login">Zaloguj się</NavLink>
                    <NavLink to="/registation">Zarejestruj się</NavLink>
                </nav>
            </header>
            <MainPage></MainPage>
        </Router>
        </>

    )

}

export default Header;