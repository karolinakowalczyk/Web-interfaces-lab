import { auth } from  '../../Firebase.js';
import MainPage from  '../MainPage/MainPage.jsx';
import {NavLink, BrowserRouter as Router} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from '../AuthContext/AuthContext.jsx';
import './Header.css';

const Header = () =>{
    const {user} = useContext(AuthContext);

    const logOut = () => {
        auth.signOut();
    }

    if(user)
        return (
            <>
            <Router>
                <header>
                <div className="head-title">
                    <h1>Pizza Hut</h1>
                </div>
                <div className="pizza-icon">
                    <span class="material-icons">
                        local_pizza
                    </span>
                </div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <NavLink to="/" exact className="navbar-brand">Strona główna</NavLink>
                        <NavLink to="/myprofile" className="navbar-brand">Złóż zamówienie</NavLink>
                        <NavLink to="/history" className="navbar-brand">Historia zamówień</NavLink>
                        <a href="/" className="navbar-brand" onClick={logOut}>Wyloguj się</a>
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
            <div className="head-title">
                <h1>Pizza Hut</h1>
            </div>
            <div className="pizza-icon">
                <span class="material-icons">
                    local_pizza
                </span>
            </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink to="/" exact className="navbar-brand">Strona główna</NavLink>
                    <NavLink to="/login" className="navbar-brand">Zaloguj się</NavLink>
                    <NavLink to="/registation" className="navbar-brand">Zarejestruj się</NavLink>
                </nav>
            </header>
            <MainPage></MainPage>
        </Router>
        </>

    )

}

export default Header;