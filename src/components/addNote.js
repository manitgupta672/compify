import React from 'react';
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

class AddNote extends React.Component {
  constructor() {
    super()
    this.state = {
        tags: [],
        title: ''
    }
  }

  handleChange = (tags) => {
    this.setState({tags})
  }

  submit = (event) => {
    event.preventDefault();
    // console.log(this.state.title);
    // console.log(this.state.tags);
    if (this.state.title.length > 0){
        this.props.addNote(this.state.title, this.state.tags);
        document.getElementById("add-note").reset();
        this.setState({tags:[]});
    }
  }

  render() {
    return (
        <div>
            <form id="add-note" onSubmit={this.submit}>
                <div className="form-group">
                    <input type="text" className="form-control" onChange={(event) => this.setState({title: event.target.value })}/>
                </div>
                <TagsInput ref="tagInput" value={this.state.tags} onChange={this.handleChange} />
                <ul className="list-inline pull-right buttons-ul">
                    <li><button className="btn" data-toggle="collapse" data-target="#addnote">Cancel</button></li>
                    <li><button className="btn save-btn" type="submit">Save</button></li>
                </ul>
                <div className="clearfix"></div>
                
            </form>
        </div>
    )
  }
}

export default AddNote;