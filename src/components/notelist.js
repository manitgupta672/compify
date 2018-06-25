import React from 'react';
import { connect } from 'react-redux';
import Note from './note';
import * as ActionCreator from '../store/actions/userActions';

class NoteList extends React.Component{
    state = {
        notes:null
    }

    componentWillReceiveProps(nextProps){
        console.log('abcdefgh');
        console.log(nextProps);
        this.setState({
            notes: nextProps.notes,
            user_id: nextProps.user_id
        })
    }

    shouldComponentUpdate(nextProps) {
        console.log('^^^^^^^^^^^^^^^^^^^^^^');
        console.log(nextProps);
        return this.state.notes !== nextProps.notes;
    }

    // shouldComponentUpdate(nextState, nextProps){
    //     if (this.state.notes && this.state.notes.length !== nextProps.notes.length){
    //         console.log('shouldComponentUpdate in notelist.js------------------');
    //         return true;
    //     } else {
    //         console.log('shouldComponentUpdate in notelist.js------------------!!!!!!!!!!');
    //         return false;
    //     }
    // }

    render() {
        console.log('notelist render called');
        var notes = null;
        if(this.state.notes){
            notes = this.state.notes.map((note) => {
                return <Note onDeleteNote={() => this.props.deleteNote(this.props.user_id, note.id)} key={note.id} note={note} />
            })
        }

        return (
            <div>
                {notes}    
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (user_id, note_id) => dispatch(ActionCreator.deleteNote(user_id, note_id))
    }
}

export default connect(null, mapDispatchToProps)(NoteList);