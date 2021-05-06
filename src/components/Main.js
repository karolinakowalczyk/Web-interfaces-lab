import { Component } from 'react';

import NewStudent from './NewStudent';
import StudentList from './StudentsList';

import {Route, Switch} from 'react-router-dom';


class Main extends Component {
    state = {
      membersList: [
        {
          name: "Arek",
          description: "Arek jest świetnym architektem, lubi projektować systemy",
          email: " arek.architekt@gmail.com",
          tags: ["docker", "AWS", "kubernetes", "scrum"],
        },
        {
          name: "Marcin",
          description: "Marcin nie jest świetnym architektem, lubi projektować systemy",
          email: " marcin.architekt@gmail.com",
          tags: ["js"],
        },
      ],


    }

    addStudent = (newName, newDescription, newEmail, ...newTags) => {
        this.setState({
            membersList: [
              ...this.state.membersList,
              {
                name: newName,
                description: newDescription,
                email: newEmail,
                tags: [...newTags],
              },
            ],

          });
    }


    render = () => {
        return (
          <Switch>
            <Route path="/" exact>
                <section><StudentList membersList={this.state.membersList}/></section>
            </Route>
            <Route path="/newStudent">
                <section><NewStudent addStudent={this.addStudent}/></section>
            </Route>
           
            <Route>
                <section><h2>404 not found</h2></section>
            </Route>
          </Switch>
        )
    }
      
  }

  export default Main 