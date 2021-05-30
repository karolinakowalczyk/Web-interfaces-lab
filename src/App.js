import './App.css';
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <>
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header/>
        <Footer />
      </div>
    
    </Router>
    </>
  );
}

export default App;
