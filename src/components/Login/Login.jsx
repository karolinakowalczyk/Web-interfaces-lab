import { useState, useEffect, useContext } from 'react';
import { auth } from  '../../Firebase.js';
import ProfilePage from '../ProfilePage/ProfilePage.jsx';
import UserContext from '../UserContext/UserContext.jsx'

import './Login.css';
const Login = (props) =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPasswordButton, setForgotPasswordButton] =useState(false);
    const [userLogged, setUserLogged] =useState(false);
    //const [ user, setUser ] = useState(props);
    const { user, setUser } = useContext(UserContext);

    /*useEffect(() => {
        setUser(!user);
    }, [user]);*/

    const signIn = () => {

        auth.signInWithEmailAndPassword(email, password).then(() => {
            console.log("zalogowano");
            //setUserLogged(true);
            setUserLogged(!userLogged)
            setUser(!user);
            
            
        }).catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <>
        {user ? 
        <>
            <div className="containter">

                <div className="profile-page-container">
                    <ProfilePage></ProfilePage>

                </div>
            </div>
        
        </> : <>
        <div className="login-container">
    
            {!forgotPasswordButton ? 
                <>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                    <input
                        className="login-input"
                        type="password"
                        placeholder="hasło"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                    <button onClick={signIn}>Zaloguj się</button>
                    <button onClick={() => setForgotPasswordButton(true)}> Zapomniałeś hasła? </button>
                </> : <button onClick={() => setForgotPasswordButton(false)}> Zatwierdź nowe hasło </button>}         
        </div>
        </> }
        </>    
                    
        
    )
}

export default Login;