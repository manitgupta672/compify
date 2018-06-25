import UserActions from '../actions/userActions';

const initialState = {
    ownUser:{},
    users: [
        
    ],
    selected_user_id: '',
    selected_user_name: ''
}
const reducer = (state = initialState, action) => {

    switch(action.type){
        case UserActions.SELECT_USER:
            return {
                ...state,
                selected_user_id: action.payload.user_index,
                selected_user_name: action.payload.user_name
            }
        case UserActions.SAVE_USERS:
            return {
                ...state,
                users: action.payload.users,
                selected_user_id: action.payload.users[0].index,
                selected_user_name: action.payload.users[0].name
            }
        case UserActions.SAVE_OWN_USER:
            return {
                ...state,
                ownUser: action.payload.ownUser 
            }
        case UserActions.SAVE_NOTES:
            // var objCopy = Object.assign({}, state.users);
            let users = [...state.users];
            let notesUsers = action.payload.usersData ;
            // console.log('[[[[[[');
            // console.log(users);
            // console.log(notesUsers);
            
            // users = users.map((user)=>{
            //     var requiredNoteUser = notesUsers.filter(function(noteUser){
            //         return noteUser.user.id === user.index;
            //     })
            //     if (requiredNoteUser){
            //         user['notes'] = requiredNoteUser.notes;
            //     }
            //     return user;
            // })
            // console.log('ppppppppppppppp');
            // console.log(users);
            // console.log(users.length);
            
            for (var i=0; i < users.length; i++){
                // console.log(i);
                users[i]['notes'] = [];
                for (var j=0;j<notesUsers.length;j++){
                    // console.log(notesUsers[j].user.id, users[i].index);
                    if (parseInt(notesUsers[j].user.id, 10) === parseInt(users[i].index,10)){
                        // console.log(notesUsers[j]['notes']);
                        users[i]['notes'] = notesUsers[j]['notes'];
                    }
                }
            }
            // console.log('===============');
            // console.log(users);

            return {
                ...state,
                users: users 
            }
        case UserActions.DELETE_NOTE:
            console.log('lllllllll');
            console.log(action.payload);
            users = [...state.users];
            console.log(users);
            for (let i=0;i<users.length;i++){
                console.log('console',users[i].index);
                if(parseInt(users[i].index, 10) === parseInt(action.payload.user_id, 10)){
                    console.log(users[i].index, action.payload.user_id);
                    users[i].notes = users[i].notes.filter( (note) => {
                        console.log('->', note.id, action.payload.note_id);
                        return parseInt(note.id, 10) !== parseInt(action.payload.note_id,10);
                    });
                }
            }
            console.log(users);
            
            return {
                ...state,
                users: users
            }
        case UserActions.ADD_NOTE:
            console.log(action.payload);
            users = [...state.users];
            var last_id = 0;
            for (let i=0;i<users.length;i++){
                if(parseInt(users[i].index, 10) === parseInt(action.payload.user_id, 10)){
                    if (users[i].notes && users[i].notes.length > 0){
                        last_id = users[i].notes[users[i].notes.length - 1].id;
                    }
                    console.log(last_id);
                    users[i].notes.push({
                        id:parseInt(last_id,10)+1,
                        title:action.payload.title,
                        tags: action.payload.tags
                    })
                    console.log('opopopopop');
                    console.log(users[i]);
                }
            } 

            return {
                ...state,
                users: users
            }
        default:
            return state;
    }
}

export default reducer;