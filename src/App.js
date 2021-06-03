import './App.css';
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from './components/AuthContext/AuthContext.jsx';

function App() {
  return (
    <>
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="page-container">
          <div className="content-wrap">
            <Header/>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
