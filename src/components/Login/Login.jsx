import { useState } from 'react';
import {Redirect} from 'react-router-dom';
import { auth } from  '../../Firebase.js';
import './Login.css';

const Login = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userLogged, setUserLogged] =useState(false);
    const [wrongData, setWrongData] = useState(false);
    const [error, setError] = useState("");

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).then(() => {
            console.log("zalogowano");
            setUserLogged(true);
            setWrongData(false);
            setError("")
            
        }).catch((error) => {
            console.log(error);
            setWrongData(true);
            setError("Zły email lub hasło!");
        });
    }


    if(userLogged){
        return <Redirect to="/" exact />
      }

    
    return (
        <>
        <div className="login-container">
        <h2 className="text-center mb-4">Logowanie </h2>
            {wrongData && <div className="alert alert-danger" role="alert">{error}</div>}
                <div>
                    <label htmlFor="inputEmail1">Email</label>
                    <input
                        className="login-input form-control"
                        id="inputEmail1"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                    <label htmlFor="inputPassword1">Hasło</label>
                    <input
                        className="login-input form-control"
                        id="inputPassword1"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                    <button type="button" className="btn btn-success login-btn" onClick={signIn}>Zaloguj się</button>
                </div>
        </div>
        </>    
                    
        
    )
}

export default Login;