//import './App.css';
import { Component} from "react";
import Student from "./components/student";
import 'bootstrap/dist/css/bootstrap.min.css';

/*class Student extends Component {
  state = {
    nameInput: "",
    descriptionInput: "",
    emailInput: "",

    tags: [],
    input: "",
    suggestions: [],

    membersList: [
      {
        name: "Arek",
        description: "Arek jest świetnym architektem, lubi projektować systemy",
        email: " arek.architekt@gmail.com",
        tags: ["docker", "AWS", "kubernetes", "scrum"],
      },
      {
        name: "Marcin",
        description:
          "Marcin nie jest świetnym architektem, lubi projektować systemy",
        email: " marcin.architekt@gmail.com",
        tags: ["js"],
      },
    ],
    showWarning: false,
    membersCounter: 2,

    tagsSearch: "",
    descriptionSearch: "",
    filteredMembersList: [
      {
        name: "Arek",
        description: "Arek jest świetnym architektem, lubi projektować systemy",
        email: " arek.architekt@gmail.com",
        tags: ["docker", "AWS", "kubernetes", "scrum"],
      },
      {
        name: "Marcin",
        description:
          "Marcin nie jest świetnym architektem, lubi projektować systemy",
        email: " marcin.architekt@gmail.com",
        tags: ["js"],
      },
    ],
  };

  warningMesseage = "All inputs must be filled!";
  
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      input: value,
    });
    this.handleSuggestion();
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
    }
    const { tags, input, suggestions } = this.state;
    const text = suggestions.length ? suggestions[0].text : input;
    if ([9, 13].includes(e.keyCode) && text) {
      this.setState({
        tags: [...tags, text],
        input: "",
      });
    }
  };

  handleSuggestion = () => {
    const { input, tags } = this.state;
    const suggestFilterInput = suggestdata.filter((suggest) =>
      suggest.text.toLowerCase().includes(input.toLowerCase())
    );

    const suggestFilterTags = suggestFilterInput.filter(
      (suggest) => !tags.includes(suggest.text)
    );

    this.setState({
      suggestions: suggestFilterTags,
    });
  };

  handleDelete = (i) => {
    const { tags } = this.state;
    const newTags = tags.filter((tag, j) => i !== j);
    this.setState({
      tags: newTags,
    });
  };

  AddTags = (text) => {
    this.setState({
      tags: [...this.state.tags, text],
      input: "",
    });
  };
  

  handleNameChange = (event) => {
    this.setState({
      nameInput: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      descriptionInput: event.target.value,
    });
  };

  handleEmailChange = (event) => {
    this.setState({
      emailInput: event.target.value,
    });
  };


  handleSubmitButton = (event) => {
    if (
      this.state.nameInput === "" ||
      this.state.descriptionInput === "" ||
      this.state.emailInput === "" ||
      this.state.tags === ""
    ) {
      this.setState({
        showWarning: true,
      });
    } else {
      this.setState({
        // eslint-disable-next-line no-dupe-keys
        membersList: [
          ...this.state.membersList,
          {
            name: this.state.nameInput,
            description: this.state.descriptionInput,
            email: this.state.emailInput,
            tags: [...this.state.tags],
          },
        ],
        filteredMembersList: [
          ...this.state.membersList,
          {
            name: this.state.nameInput,
            description: this.state.descriptionInput,
            email: this.state.emailInput,
            tags: [...this.state.tags],
          },
        ],
        
       
        membersCounter: this.state.membersCounter + 1,
        
        tags: [],
        nameInput: "",
        input: "",
        descriptionInput: "",
        emailInput: "",
        tagsInput: "",
        showWarning: false,
      });
    }
  };

  handleTagsSearchChange = (event) => {
    //nie do konca dobrze
    this.setState({
      tagsSearch: event.target.value,
      filteredMembersList: this.state.membersList.filter((member => {
        return member.tags.includes(event.target.value)
      })),
      membersCounter: this.state.filteredMembersList.length
    });
  };

  handleDescriptionSearchChange = (event) => {
    this.setState({
      descriptionSearch: event.target.value,
      filteredMembersList: this.state.membersList.filter((member => {
        console.log(member.description.toLowerCase().indexOf(this.state.descriptionSearch.toLowerCase()) !== -1)
        return member.description.toLowerCase().indexOf(this.state.descriptionSearch.toLowerCase()) !== -1;
      })),

      membersCounter: this.state.filteredMembersList.length
    });
  };

 
  render() {
  
    return (
      <>
        <h2>Add new student</h2>
        <input
          type="text"
          placeholder="search by tags"
          value={this.state.tagsSearch}
          onChange={this.handleTagsSearchChange}
        ></input>
        <input
          type="text"
          placeholder="search by description"
          value={this.state.descriptionSearch}
          onChange={this.handleDescriptionSearchChange}
        ></input>
        <p>Remember to write down all the fields</p>
        <input
          type="text"
          placeholder="name"
          value={this.state.nameInput}
          onChange={this.handleNameChange}
        ></input>
        <input
          type="text"
          placeholder="description"
          value={this.state.descriptionInput}
          onChange={this.handleDescriptionChange}
        ></input>
        <input
          type="text"
          placeholder="email"
          value={this.state.emailInput}
          onChange={this.handleEmailChange}
        ></input>

        <div className="tags-content">
          {this.state.tags.map((tag, i) => (
            <div key={createUUID(i)} className="tag">
              {tag}
              <div className="remove-tag" onClick={() => this.handleDelete(i)}>
                ×
              </div>
            </div>
          ))}
          <div className="tags-input">
            <label htmlFor="tag-input">Press Enter to add Tag: </label>
            <input
              id="tag-input"
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              placeholder="add new tag"
            />

            {this.state.input && Boolean(this.state.suggestions.length) && (
              <div className="tags-suggestions">
                {this.state.suggestions.map((suggest) => (
                  <div
                    key={createUUID(suggest)}
                    className="suggestion-item"
                    onClick={() => this.AddTags(suggest.text)}
                  >
                    {suggest.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button onClick={this.handleSubmitButton}>Submit</button>
        {this.state.showWarning && (
          <h2 style={{ color: "red" }}>{this.warningMesseage}</h2>
        )}
        <div>
          <Counter membersNumber={this.state.membersCounter} />
        </div>
        <div>
          <h3>List of students</h3>
          {this.state.membersList.map((el) => (
            <Members key={createUUID(el)} {...el} />
          ))}
        </div>
        
        
        <div>
          <h3>After filter</h3>
          {this.state.filteredMembersList.map((el) => (
          <Members key={createUUID(el)} {...el} />
        ))}
        </div>
        
      </>
    );
  }
}*/

class App extends Component {
  state = {};
  render() {
    return (
      <>
        <h1>Tinder project app</h1>
        <Student />
      </>
    );
  }
}

export default App;
