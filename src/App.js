//import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import {BrowserRouter as Router} from 'react-router-dom';
import UserContext from './components/UserContext/UserContext.jsx';
import { useState} from 'react';

function App() {
  const [user, setUser] = useState(false);
  return (
    <>
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <UserContext.Provider value={{user, setUser}}>
            <Header/>
            <Footer />
            </UserContext.Provider>
      </div>
    
    </Router>
    </>
  );
}

export default App;
