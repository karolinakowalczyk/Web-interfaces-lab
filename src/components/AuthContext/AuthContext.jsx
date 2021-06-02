import { createContext, useEffect, useState } from 'react';
import { auth } from  '../../Firebase.js';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setPending(false);
        });
    }, []);

    if(pending) {
        return (<>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
      </>)
    }

    return (
        <AuthContext.Provider
            value={{user}}
        >
            {children}
        </AuthContext.Provider>
    )
}