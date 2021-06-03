import { useState} from 'react';
import { Redirect } from 'react-router';
import { auth } from  '../../Firebase.js';
import validator from 'validator'
import './Registration.css';

const Registation = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");

    const signUp = () => {
        if(password !== passwordConfirm){
            return setError("Hasła nie są identyczne!")
        }
        if(password.length < 6){
            return setError("Hasło musi mieć długość co najmniej 6 znaków!")
        }
        if(! validator.isEmail(email)){
            return setError("Niepoprawny adres email!")
        }
      
        setError("")
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
           
                auth.signInWithEmailAndPassword(email, password)
                .then(loggedUser => {
                    loggedUser.user.updateProfile({
                        displayName: userName,
                    })
                    
                })
                .catch(error => {
                    console.log(error);
                })
            
            setRedirect(true);      
        })
        .catch(err =>{
            setError(err)
        })
       
    
    };

    if (redirect) {
        return <Redirect to="/" exact />
    }

    
    return (
        <>
            <div className="registration-container">
                <h2 className="text-center mb-4">Rejestracja</h2>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="inputUserName1">Nazwa użytkownika</label>
                        <input
                            className="registation-input form-control"
                            id="inputUserName1"
                            type="text"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        ></input>
                        <label htmlFor="inputEmail1">Email</label>
                        <input
                            className="registation-input form-control"
                            id="inputEmail1"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        ></input>
                        <label htmlFor="inputPassword1">Hasło</label>
                        <input
                            className="registation-input form-control"
                            id="inputPassword1"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        ></input>
                        <label htmlFor="inputPasswordConfirm1">Powtórz hasło</label>
                        <input
                            className="registation-input form-control"
                            id="inputPasswordConfirm1"
                            type="password"
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                        ></input>
                         <button type="button" className="btn btn-success register-btn" onClick={signUp}>Zarejestruj się</button>
                    </div>        
            </div>
        </>    
                    
        
    )
}

export default Registation;