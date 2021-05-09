import { Component } from 'react';

import NewStudent from './NewStudent';
import NewGroup from './NewGroup';
import StudentList from './StudentsList';

import {Route, Switch} from 'react-router-dom';
import { nanoid } from "nanoid";

import './Main.css';


class Main extends Component {
    state = {
      membersList: [
        {
          id: "member" + nanoid(),
          name: "Arek",
          description: "Arek jest świetnym architektem, lubi projektować systemy",
          email: " arek.architekt@gmail.com",
          tags: ["docker", "AWS", "kubernetes", "scrum"],
        },
        {
          id: "member" + nanoid(),
          name: "Marcin",
          description: "Marcin nie jest świetnym architektem, lubi projektować systemy",
          email: " marcin.architekt@gmail.com",
          tags: ["js"],
        },
        {
          id: "member" + nanoid(),
          name: "Anna",
          description: "Anna interesuje się Pythonem i data science",
          email: " anna.nowak@gmail.com",
          tags: ["Python"],
        },
      ],
      groupsList: [
        {
          groupName: "grupa 1",
          members:[{
              id: "member" + nanoid(),
              name: "Julia",
              description: "Julia lubi Reacta",
              email: "julia.kowalska@gmail.com",
              tags: ["React", "JavaScript"]
          },
          {
              id: "member" + nanoid(),
              name: "Andrzej",
              description: "Andrzej lubi C++",
              email: "andrzej.maj@gmail.com",
              tags: ["C++", "C#", "C"]
          }],
          
        },
        
      ],


    }

    addStudent = (newName, newDescription, newEmail, ...newTags) => {
        this.setState({
            membersList: [
              ...this.state.membersList,
              {
                id: "member" + nanoid(),
                name: newName,
                description: newDescription,
                email: newEmail,
                tags: [...newTags],
              },
            ],

          });
    }

    editStudent = (id, newName, newDescription, newEmail, ...newTags) => {
      const editedMembersList = this.state.membersList.map(member => {
     
        if (id === member.id) {
          
          return {...member, name: newName, description: newDescription, email: newEmail, tags: newTags}
        }
        return member;
      });
      this.setState({
        membersList: editedMembersList
      })
    }

    addGroup = (newGroupName, students) => {
      this.setState({
        groupsList: [
          ...this.state.groupsList,
          {
            groupName: newGroupName,
            members: students,
          },
        ],

      });

    }


    render = () => {
        return (
          <>
          <Switch>
            <Route path="/" exact>
                <section><StudentList membersList={this.state.membersList} groupsList={this.state.groupsList} editStudent={this.editStudent}/></section>
            </Route>
            <Route path="/newStudent">
                <section><NewStudent addStudent={this.addStudent}/></section>
            </Route>
            <Route path="/newGroup">
              {/* To jest komentarz addStudent={this.addMemberStudent??}*/}
                <section><NewGroup addGroup={this.addGroup}/></section>
            </Route>
           
            <Route>
                <section><h2>404 not found</h2></section>
            </Route>
          </Switch>
          </>
        )
    }
      
  }

  export default Main 