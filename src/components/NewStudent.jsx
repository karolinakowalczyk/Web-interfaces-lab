import { Component } from 'react';
import createUUID from "../utils/createUUID";
import suggestdata from "../utils/suggestionsData.js";
import './NewStudent.css';



class NewStudent extends Component {
    state = {
        nameInput: "",
        descriptionInput: "",
        emailInput: "",

        tags: [],
        tagsInput: "",
        suggestions: [],

        showWarning: false,
    
    }
    warningMesseage = "All inputs must be filled!";
    

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

  handleTagChange = (e) => {
      const { value } = e.target;
      this.setState({
        tagsInput: value,
      });
      this.handleSuggestion();
    };

    handleKeyDown = (e) => {
      if (e.keyCode === 9) {
        e.preventDefault();
      }
      const { tags, tagsInput, suggestions } = this.state;
      const text = suggestions.length ? suggestions[0].text : tagsInput;
      if ([9, 13].includes(e.keyCode) && text) {
        this.setState({
          tags: [...tags, text],
          tagsInput: "",
        });
      }
    };

    handleAddTags = (text) => {
      this.setState({
        tags: [...this.state.tags, text],
        tagsInput: "",
      });
    };

    handleSuggestion = () => {
      const { tagsInput, tags } = this.state;
      const suggestFilterInput = suggestdata.filter((suggest) =>
        suggest.text.toLowerCase().includes(tagsInput.toLowerCase())
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


  appendStudent = () => {
      if (
          this.state.nameInput === "" ||
          this.state.descriptionInput === "" ||
          this.state.emailInput === "" ||
          this.state.tags === ""
        ) {
          this.setState({
            nameInput: "",
            descriptionInput: "",
            emailInput: "",
            tagsInput: "",
            showWarning: true,
          });
        } else {
          this.props.addStudent(this.state.nameInput, this.state.descriptionInput, this.state.emailInput, ...this.state.tags)
          this.setState({
              nameInput: "",
              descriptionInput: "",
              emailInput: "",
              tags: [],
              tagsInput: "",
              showWarning: false,
          });
        };
    }

    

    render() {
        
        return (
        <>
          <div className="input-container">
            <div className="add-input">
              <input
                  id="name-input"
                  type="text"
                  placeholder="name"
                  value={this.state.nameInput}
                  onChange={this.handleNameChange}
              ></input>
            </div>
            <div className="add-input">
              <input
                  id = "description-input"
                  type="text"
                  placeholder="description"
                  value={this.state.descriptionInput}
                  onChange={this.handleDescriptionChange}
              ></input>
            </div>
            <div className="add-input">
              <input
                  id = "email-input"
                  type="text"
                  placeholder="email"
                  value={this.state.emailInput}
                  onChange={this.handleEmailChange}
              ></input>
            </div>
          

            <div className="added-tags">
                {this.state.tags.map((tag, i) => (
                    <div key={createUUID(i)} className="tag">
                        {tag}
                        <div className="remove-tag btn btn-danger btn-sm" onClick={() => this.handleDelete(i)}>
                        ×
                        </div>
                    </div>
                ))}
            </div>
            <br/>
            <div className="tags-input">
            <label htmlFor="tag-input">Press Enter to add Tag: </label>
            <input
                id="tag-input"
                type="text"
                value={this.state.tagsInput}
                onChange={this.handleTagChange}
                onKeyDown={this.handleKeyDown}
                placeholder="add new tag"
            />

            {this.state.tagsInput && Boolean(this.state.suggestions.length) && (
                <div className="tags-suggestions">
                    {this.state.suggestions.map((suggest) => (
                        <div
                          key={createUUID(suggest)}
                          className="suggestion-item"
                          onClick={() => this.handleAddTags(suggest.text)}
                          >
                          {suggest.text}
                        </div>
                    ))}
                </div>
                )}
            </div>
        
            
            <button className="btn btn-primary add-btn" onClick={this.appendStudent}>Add</button>


            {this.state.showWarning && (
                <h3 style={{ color: "red" }}>{this.warningMesseage}</h3>    
            )}
          </div>


        </>
        );
    }
}

export default NewStudent;