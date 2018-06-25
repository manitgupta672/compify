import axios from 'axios';

const UserActions = {
    SELECT_USER: 'SELECT_USER',
    SAVE_USERS: 'SAVE_USERS',
    SAVE_NOTES: 'SAVE_NOTES',
    SAVE_OWN_USER: 'SAVE_OWN_USER',
    DELETE_NOTE: 'DELETE_NOTE',
    ADD_NOTE: 'ADD_NOTE'
}


export const selectUser = (user_index, user_name) => {
    // {type:UserActions.SELECT_USER, 'payload':{user_index: user_index}})
    return {
        type: UserActions.SELECT_USER,
        payload:{
            user_index:user_index,
            user_name:user_name
        }
    }
}

export const saveUsers = (users) => {
    return {
        type: UserActions.SAVE_USERS,
        payload: {
            users: users
        }
    }
}

export const fetchUsers = () => {
    return dispatch => {
        axios.get('https://api.myjson.com/bins/thbgx')
        .then(function (response) {
            console.log(response);
            dispatch(saveUsers(response.data));
        })
        .then(function () {
            // console.log(response);
            dispatch(fetchNotes());
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const saveOwnUser = (user) => {
    return {
        type: UserActions.SAVE_OWN_USER,
        payload: {
            ownUser: user
        }
    }
}

export const fetchOwnUser = () => {
    return dispatch => {
        axios.get('https://api.myjson.com/bins/orzsh')
        .then(function (response) {
            console.log(response);
            dispatch(saveOwnUser(response.data[0]));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const saveNotes = (users) => {
    return {
        type: UserActions.SAVE_NOTES,
        payload: {
            usersData: users
        }
    }
}

export const fetchNotes = () => {
    return dispatch => {
        axios.get('https://api.myjson.com/bins/7if8x')
        .then(function (response) {
            console.log(response);
            dispatch(saveNotes(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const deleteNote = (user_id, note_id) => {
    console.log('[UserActions.js] deleteNote function');
    return {
        type: UserActions.DELETE_NOTE,
        payload: {
            user_id: user_id,
            note_id: note_id
        }
    }
}

export const addNote = (title, tags, user_id) => {
    console.log('[UserActions.js] addNote function');
    console.log(user_id);
    console.log(title, tags);
    return {
        type: UserActions.ADD_NOTE,
        payload: {
            title: title,
            tags: tags,
            user_id: user_id
        }
    }
}

export default UserActions;