import { Component } from 'react';
import createUUID from "../utils/createUUID";
import './StudentsList.css';


class StudentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tagsSearch: "",
            descriptionSearch: "",
            isEditing: false,
            newName: "",
            newDescription: "",
            newEmail: "",
            newTag: "",
            newTags: [],
            studentId: "",
            showWarning: false,   
        }
        
      }
 
    warningMesseage = "You must input all fields!";
    handleTagsSearchChange = (event) => {
        this.setState({
            tagsSearch: event.target.value,
        });
    };
    
    handleDescriptionSearchChange = (event) => {
        this.setState({
          descriptionSearch: event.target.value,     
        });
    };

    handleNewTagChange = (event) => {
        this.setState({
          newTag: event.target.value,
        });
      };
  
    handleKeyDown = (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
        }
        const { newTag, newTags} = this.state;
        if ([9, 13].includes(e.keyCode) && newTag) {
            this.setState({
            newTags: [...newTags, newTag],
            newTag: "",
            });
        }
    };
    

    handleEditButton = (id) => {
        this.setState({
            isEditing: true,
            studentId: id
          }, () => {
            console.log("id")
            console.log(id)
            console.log("student id")
            console.log(this.state.studentId)
          });
          
    }

    handleCancelButton = () => {
        this.setState({
            isEditing: false
          });
    }

    handleNewNameChange = (event) => {
        this.setState({
            newName: event.target.value,
          });
      }

    handleNewDescriptionChange = (event) => {
    this.setState({
        newDescription: event.target.value,
        });
    }

    handleNewEmailChange = (event) => {
        this.setState({
            newEmail: event.target.value,
          });
      }


    handleSaveButton = () => {
        if (this.state.newName === "" ||
            this.state.newDescription === "" ||
            this.state.newEmail === "" ||
            this.state.newTags === "") {
            this.setState({
              showWarning: true,
            });
        } else {
            this.props.editStudent(this.state.studentId, this.state.newName, this.state.newDescription, this.state.newEmail, ...this.state.newTags);

            this.setState({
                newName: "",
                newDescription: "",
                newEmail: "",
                newTags: [],
                isEditing: false,
                studentId: "",
                showWarning: false,
            });
        }
    }

  
    render = () => {
        /*const studentsList = this.props.membersList.map((el) => 
            (
                <>
                <li key={createUUID(el.id)}>
                    {el.name}
                    {el.description}
                    {el.email}
                    <ul>
                        {el.tags.map((tag) => (
                            <li key={createUUID(tag)}>#{tag}</li>
                        ))}
                    </ul>
                    
                </li>
                <button onClick={() => this.handleEditButton(el.id)}>Edit</button>
                </>
            )
        )*/

        const editStudentsList =
                (
                    <>
                        <label>Edit name</label>
                        <input 
                            value={this.state.newName}
                            onChange={this.handleNewNameChange}
                        ></input>
                        <label>Edit description</label>
                        <input 
                            value={this.state.newDescription}
                            onChange={this.handleNewDescriptionChange}
                        ></input>
                        <label>Edit email</label>
                        <input 
                            value={this.state.newEmail}
                            onChange={this.handleNewEmailChange}
                        ></input>
                        <label>Edit tags</label>
                        <h6>Press enter to add</h6>
                        <input
                            type="text"
                            value={this.state.newTag}
                            onChange={this.handleNewTagChange}
                            onKeyDown={this.handleKeyDown}
                        />
                        <h5>Added tags: </h5>
                            <ul>
                                {this.state.newTags && Boolean(this.state.newTags.length) && (
                                    <div className="group-new-tags">
                                        <ul>
                                            {this.state.newTags.map((tag) => (
                                                <li key={createUUID(tag)}>#{tag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    )}
                            </ul>
        
                        <button className="btn btn-primary" onClick={this.handleSaveButton}>Save</button>
                        <br></br>
                        <button className="btn btn-primary" onClick={this.handleCancelButton}>Cancel</button>
                        <br></br>
                        {this.state.showWarning && (
                            <h3 style={{ color: "red" }}>{this.warningMesseage}</h3>    
                        )}
                    </>
                )

        const filteredStudentsList = this.props.membersList.filter(el => ((el.description.includes(this.state.descriptionSearch)) && (el.tags.find(tag => tag.includes(this.state.tagsSearch))) )).map(filteredStudents => (
            <>
            
            <li key={createUUID(filteredStudents)}>
                <p className="card-text">{filteredStudents.name}</p>
                <p className="card-text">{filteredStudents.description}</p>
                <p className="card-text">{filteredStudents.email}</p>
                <ul>
                    {filteredStudents.tags.map((tag) => (
                        <li key={createUUID(tag)}>#{tag}</li>
                    ))}
                </ul>
                
            </li>
            <button className="btn btn-primary" onClick={() => this.handleEditButton(filteredStudents.id)}>Edit</button>
            </>
          ))
        
        /*const groupStudentsList = this.props.groupsList.map(el =>
            <>
                <h4 className="collapse-head"> {el.groupName} </h4>
                <ul>
                    {el.members.map((member) => (
                        <li key={createUUID(member)}>
                            <ul>
                                <li key={createUUID(member.name)}>{member.name}</li>
                                <li key={createUUID(member.description)}>{member.description}</li>
                                <li key={createUUID(member.email)}>{member.email}</li>
                                <li key={createUUID(member.tags)}>
                                    <ul>
                                        {member.tags.map((memberTag) => (
                                            <li key={createUUID(memberTag)}>#{memberTag}</li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                            
                        </li>
                    ))}
                </ul>
            </>
        )*/

        const filteredGroupStudentsList = this.props.groupsList.map(el =>
            <>
            
                <h4 className="card-subtitle"> {el.groupName} </h4>
               
                    {el.members.filter(m => (m.description.includes(this.state.descriptionSearch)) && (m.tags.find(tag => tag.includes(this.state.tagsSearch)))).map(member => (
                            <ul className="list-group list-group-flush">
                                <li key={createUUID(member.id)} className="list-group-item">
                                
                                    <p className="card-text">{member.name}</p>
                                    <p className="card-text">{member.description}</p>
                                    <p className="card-text">{member.email}</p>
                                    <ul>
                                        {member.tags.map((memberTag) => (
                                            <li key={createUUID(memberTag)}>#{memberTag}</li>
                                        ))}
                                    </ul>  
                                </li>  
                            </ul>
                    ))}

            </>
        )
    



    return (
        <>
        <br></br>
        <div className="search-content container">
            <div className="row">
                <input className="search-input col-sm"
                    type="text"
                    placeholder="search by tags"
                    value={this.state.tagsSearch}
                    onChange={this.handleTagsSearchChange}
                 ></input>
            
            
                <input className="search-input col-sm"
                    type="text"
                    placeholder="search by description"
                    value={this.state.descriptionSearch}
                    onChange={this.handleDescriptionSearchChange}
                ></input>
            </div>
        </div>
        
       
        {/*<h3>List of students</h3>
        <ul>
            {this.state.isEditing ? editStudentsList : studentsList}
        </ul>*/}
        <div className = "list-container">
            <div className = "list-child card">
            
            <div className="card-body">
                <h3 className="card-title">List of students</h3>
                <h5 className="card-subtitle">I've found {filteredStudentsList.length} students!</h5>
                <br></br>
                <ul className="list-group list-group-flush">
                    {this.state.isEditing ? editStudentsList : filteredStudentsList}
                </ul>     
                </div>
            </div>
            <div className = "list-child card">
                <h3 className="card-title">Students groups</h3>
                {filteredGroupStudentsList}
                
                
            </div>

        </div>
        
        {/*<h3>Students groups</h3>
            {groupStudentsList}*/}
      
        </>
        )
    }
      
  }

  export default StudentList 