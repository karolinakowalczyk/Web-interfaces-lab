import Login from '../Login/Login.jsx'
import Main from '../Main/Main.jsx'
import Logout from '../Logout/Logout.jsx'
import UserContext from '../UserContext/UserContext.jsx'
import {NavLink, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

const Header = () =>{
    const { user, setUser } = useContext(UserContext);
    return (
        <>
        { user ?  <>
                <Router>
                    <header>
                        <div>Pizza restaurant</div>
                        <nav>
                            <NavLink to="/" exact>Strona główna</NavLink>
                            <NavLink to="/login">Mój profil</NavLink>
                            <NavLink to="/logout">Wyloguj się</NavLink>
                        </nav>
                    </header>
                    <Switch>
                        <Route exact path='/'>
                            <Main></Main>
                        </Route>
                        <Route path='/login'>
                            <Login  user={user}></Login>
                        </Route>
                        <Route path='/logout'>
                            <Logout></Logout>
                        </Route>
                    </Switch>
                </Router>
                </> : <>
                <Router>
                    <header>
                        <div>Pizza restaurant</div>
                        <nav>
                            <NavLink to="/" exact>Strona główna</NavLink>
                            <NavLink to="/login">Zaloguj się</NavLink>
                            <NavLink to="/registation">Zarejestruj się</NavLink>
                            
                        </nav>
                    </header>
                    <Switch>
                        <Route exact path='/'>
                            <Main></Main>
                        </Route>
                        <Route path='/login'>
                            <Login user={user}></Login>
                        </Route>
                        <Route path='/logout'>
                            <Main></Main>
                        </Route>
                    </Switch>
                </Router>
                
                </>}
        </>
      
    )
}

export default Header;