import { useState } from 'react';
import {Redirect} from 'react-router-dom';
import { auth } from  '../../Firebase.js';
import './Login.css';

const Login = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPasswordButton, setForgotPasswordButton] =useState(false);
    const [userLogged, setUserLogged] =useState(false);
    const [wrongData, setWrongData] = useState(false);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).then(() => {
            console.log("zalogowano");
            setUserLogged(true);
            setWrongData(false);
            
        }).catch((error) => {
            console.log(error);
            setWrongData(true);
        });
    }


    if(userLogged){
        return <Redirect to="/" exact />
      }

    
    return (
        <>
        <div className="login-container">
    
            {!forgotPasswordButton ? 
                <>
                    <input
                        className="login-input"
                        type="email"
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
                </> : <button onClick={() => setForgotPasswordButton(false)}> Zatwierdź nowe hasło </button>
                } 
                {wrongData && (
                <h3 style={{ color: "red" }}>Wrong email or password</h3>    
            )}     
        </div>
        </>    
                    
        
    )
}

export default Login;