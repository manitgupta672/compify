import React from 'react';
import { connect } from 'react-redux';
// import NoteList from './notelist';
import AddNote from './addNote';
import Note from './note';
import * as ActionCreators from '../store/actions/userActions';

class UserDetail extends React.Component{
    state = {
        selected_user_id: '',
        user: null      
    }


    componentWillReceiveProps = (nextProps) => {
        console.log('*******userDetail componentWillReceiveProps');
        console.log(nextProps);
        this.setState({
            selected_user_id: nextProps.selected_user_id,
            user: this.getUserById(nextProps.selected_user_id, nextProps.users)
        })
        // console.log(nextProps.selected_user_id, nextProps.users);
        // console.log(this.getUserById(nextProps.selected_user_id, nextProps.users));
    }

    

    getUserById = (id, users) => {
        console.log('[][][][][][][][]');
        console.log(id,users);
        var a = users.filter((user) => {
            // console.log(id);
            // console.log(user.index)
            if(parseInt(user.index, 10) === parseInt(id, 10)){
                // console.log('yes');
                return true;
            }
            return false;
        })
        // console.log(a);
        return a[0];
    }
    
    render(){
        console.log('&&&&&&');
        console.log(this.state.user ? this.state.user.notes : []);

        var notes = null;
        if(this.state.user && this.state.user.notes){
            notes = this.state.user.notes.map((note) => {
                return <Note onDeleteNote={() => this.props.deleteNote(this.state.selected_user_id, note.id)} key={note.id} note={note} />
            })
        }


        return (
            <div>
                <div className="hidden-xs gap" ></div>
                <p className="text-uppercase front-para-text"> <span className="title-own-user">ORGANIZERS</span> + <span className="title-span">{this.state.user ? this.state.user.tags[0].name : ''}</span> </p>
                <p>{this.state.user ? this.state.user.about: ''}</p>
                
                <div className="links-div">
                    <a className="black-link" data-toggle="collapse" data-target="#addnote"><span className="glyphicon glyphicon-plus" ></span> Add Note</a>
                    <strong className="">&nbsp;|&nbsp;</strong>
                    <a className="black-link" >Expand All &nbsp;<span className="glyphicon glyphicon-chevron-down" ></span></a>
                    
                    <div className="clearfix"></div>
                </div>
                <div id="addnote" className="collapse">
                    <AddNote addNote={(title,tags) => this.props.addNote(title,tags,this.props.selected_user_id)} />
                </div>
                
                <div>
                    {notes}    
                </div>
                {/*<NoteList notes={this.state.user ? this.state.user.notes : []} user_id={this.state.selected_user_id} 
                />*/}
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selected_user_id: state.userReducer.selected_user_id,
        users: state.userReducer.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNote: (title,tags,user_id) => dispatch(ActionCreators.addNote(title,tags,user_id)),
        deleteNote: (user_id, note_id) => dispatch(ActionCreators.deleteNote(user_id, note_id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserDetail);