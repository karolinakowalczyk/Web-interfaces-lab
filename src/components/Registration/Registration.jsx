import { useState} from 'react';

const Registation = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {

       
    }

    
    return (
        <>
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