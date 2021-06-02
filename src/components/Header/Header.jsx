import { auth } from  '../../Firebase.js';
import MainPage from  '../MainPage/MainPage.jsx';
import {NavLink, BrowserRouter as Router} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from '../AuthContext/AuthContext.jsx';

const Header = () =>{
    const {user} = useContext(AuthContext);
    /*const [user, setUser] = useState(null);

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
    }, []);*/

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
                        <h4>Witaj {user.displayName}</h4>
                        <NavLink to="/" exact>Strona główna</NavLink>
                        <NavLink to="/myprofile">Złóż zamówienie</NavLink>
                        <NavLink to="/history">Historia zamówień</NavLink>
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