//import './App.css';
import Main from  './components/Main';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <header>tu jest naglowek</header>
      <main>

        <nav>
            <NavLink to="/" exact>Student List</NavLink>
            <NavLink to="/newStudent">Add New Student</NavLink>
            
        </nav>
       <Main />
      </main>
    </Router>
   
  );
}

export default App;