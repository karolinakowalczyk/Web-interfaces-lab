import { Component } from 'react';
import createUUID from "../utils/createUUID";

class StudentList extends Component {
    state = {
        tagsSearch: "",
        descriptionSearch: "",
        filteredStudentsList: []

    
    }

    handleTagsSearchChange = (event) => {
        this.setState({
            tagsSearch: event.target.value,
            /*filteredMembersList: this.state.membersList.filter((member => {
            return member.tags.includes(event.target.value)
            })),
            membersCounter: this.state.filteredMembersList.length*/
        });
    };
    
    handleDescriptionSearchChange = (event) => {
        this.setState({
          //membersCounter: this.state.filteredMembersList.length,
          descriptionSearch: event.target.value,
          /*filteredStudentsList: this.props.membersList.filter((member => {
            return member.description.toLowerCase().indexOf(this.state.descriptionSearch.toLowerCase()) !== -1;
          })),*/
          
          
        });
        
      };
  
    render = () => {
        const studentsList = this.props.membersList.map(el => (
            <li key={createUUID(el)}>
                {el.name}
                {el.description}
                {el.email}
                <ul>
                    {el.tags.map((tag) => (
                        <li key={createUUID(tag)}>#{tag}</li>
                    ))}
                </ul>
            </li>
                
        ))

        const filteredStudentsList = this.props.membersList.filter(el => ((el.description.includes(this.state.descriptionSearch)) && (el.tags.find(tag => tag.includes(this.state.tagsSearch))) )).map(filteredStudents => (
            <li key={createUUID(filteredStudents)}>
                {filteredStudents.name}
                {filteredStudents.description}
                {filteredStudents.email}
                <ul>
                    {filteredStudents.tags.map((tag) => (
                        <li key={createUUID(tag)}>#{tag}</li>
                    ))}
                </ul>
            </li>
          ))


    return (
        <>
        <input className="search-input"
            type="text"
            placeholder="search by tags"
            value={this.state.tagsSearch}
            onChange={this.handleTagsSearchChange}
        ></input>
        <br/>
        <input className="search-input"
            type="text"
            placeholder="search by description"
            value={this.state.descriptionSearch}
            onChange={this.handleDescriptionSearchChange}
        ></input>
        <h3>List of students</h3>
        <ul>
            {studentsList}
        </ul>
        <h3>After filter</h3>
        <ul>
            {filteredStudentsList}
        </ul>
        
        </>
        )
    }
      
  }

  export default StudentList 