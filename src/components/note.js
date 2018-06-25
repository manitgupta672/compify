import React from 'react';
// import { connect } from 'react-redux';
import cross from '../assets/images/cross.jpg';

class Note extends React.Component{
    
    render() {
        return (
            <div className="well-box" data-toggle="collapse" data-target={'#' + this.props.note.title} >
                <div>
                    <h5>{this.props.note.title}</h5>
                    
                    <img className="delete-cross" onClick={() => this.props.onDeleteNote()} src={cross} alt="cross"/>
                    
                </div>
                <div id={this.props.note.title} className="collapse">
                    <p>
                        {this.props.note.tags.map((tag, index) => {
                            return <span key={tag+index} className="pill"> {tag} </span>
                        })}
                    </p>
                    
                </div>
                
                
            </div>
        )
    }

}

export default Note;