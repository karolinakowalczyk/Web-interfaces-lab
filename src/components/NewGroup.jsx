import { Component } from 'react';
import NewStudent from './NewStudent';
import createUUID from "../utils/createUUID";
import './NewGroup.css';

class NewGroup extends Component {
    state = {
        groupNameInput: "",
        members: [],
        showWarning: false
    }
    warningMesseage = "You must write group name!";

    handleGroupNameInput = (event) => {
        this.setState({
            groupNameInput: event.target.value,
        });
    };

    

    appendGroup = () => {
        if (this.state.groupNameInput === "") {
            this.setState({
              showWarning: true,
            });
          } else {
            this.props.addGroup(this.state.groupNameInput, this.state.members)
            this.setState({
                groupNameInput: "",
                members: [],
                showWarning: false,
            });
          };
    }

    addStudent = (newName, newDescription, newEmail, ...newTags) => {
        this.setState({
            members: [
              ...this.state.members,
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

        const addedStudents = this.state.members.map((member) => (
                
            <li key={createUUID(member)}>
                <p className="card-text">{member.name}</p>
                <p className="card-text">{member.description}</p>
                <p className="card-text">{member.email}</p>
                <ul>
                    {member.tags.map((tag) => (
                        <li key={createUUID(tag)}>#{tag}</li>
                    ))}
                </ul>
             </li>
         ))

        return (
        <>
            <div className="group-container">
                <input
                    id = "group-name-input"
                    type="text"
                    placeholder="group name"
                    value={this.state.groupNameInput}
                    onChange={this.handleGroupNameInput}
                ></input>
                <br></br>
                <label>Add new group member: </label>
                <NewStudent addStudent={this.addStudent}></NewStudent>
                <h5>Students in group: </h5>
                <ul>
                    {this.state.members && Boolean(this.state.members.length) && (
                        <div className="group-member">
                            {addedStudents}
                        </div>
                        )}
                </ul>
                

                <button className="btn btn-primary" onClick={this.appendGroup}>Add group</button>

                {this.state.showWarning && (
                    <h3 style={{ color: "red" }}>{this.warningMesseage}</h3>    
                )}
            </div>
        </>
        );
    }
}

export default NewGroup;
