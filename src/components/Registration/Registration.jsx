import { useState} from 'react';
import { Redirect } from 'react-router';
import { auth } from '../../Firebase';

const Registation = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [redirect, setRedirect] = useState(false);

    const signUp = () => {
       
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
        .catch(error =>{
            console.log(error);
        })
       
    
    };

    if (redirect) {
        return <Redirect to="/" exact />
    }

    
    return (
        <>

            <input
                className="registation-input"
                type="text"
                placeholder="nazwa użytkownika"
                value={userName}
                onChange={e => setUserName(e.target.value)}
            ></input>
            <input
                className="registation-input"
                type="text"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            ></input>
            <input
                className="registation-input"
                type="password"
                placeholder="hasło"
                value={password}
                onChange={e => setPassword(e.target.value)}
            ></input>
            <button onClick={signUp}>Zarejestruj się</button>
        </>    
                    
        
    )
}

export default Registation;