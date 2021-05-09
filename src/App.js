import './App.css';
import Main from  './components/Main';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';


function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <h2>Tinder Project App</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink to="/" exact className="navbar-brand">Student List</NavLink>
              <NavLink to="/newStudent" className="nav-link">Add New Student</NavLink>
              <NavLink to="/newGroup" className="nav-link">Add New Group</NavLink>
          </nav>
        <Main /> 
      </Router>
    </>
   
  );
}

export default App;