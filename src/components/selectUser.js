import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../store/actions/userActions';
import advisor from '../assets/images/advisor.svg';
import connector from '../assets/images/connector.svg';
import doer from '../assets/images/doer.svg';
import dreamer from '../assets/images/dreamer.svg';
import organizer from '../assets/images/organizer.svg';
import original from '../assets/images/original.svg';

class SelectUser extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    state = {
        selected_user_id: "",
        users: []
    }
    componentDidMount(){
        console.log('SelectUser componentDidMount');
        this.props.fetchInitialUsers();
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            selected_user_id: nextProps.selected_user_id,
            users: nextProps.users
        })
    }

    onSubmit = (event) => {
       console.log('Selected value:', event.target.value);
       this.props.onSelectUser(event.target.value, this.getUserById(event.target.value, this.props.users).name);
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

    getImage(tag){
        switch(tag){
            case 'Advisor':
                return advisor;
            case 'Organiser':
                return organizer;
            case 'Connector':
                return connector;
            default:
                return connector;
        }
    }

    render(){
        var tag_html = '';
        // var select_user_id = 0
        console.log('___________!!!!!!!', this.state.selected_user_id);
        console.log('___________*******', this.state.users);
        if(this.state.selected_user_id >= 0 && this.state.users.length > 0){

            console.log('___________!!!!!!!___________', this.state.selected_user_id);
            console.log('___________*******___________', this.state.users);

            // if (this.props.selected_user_id.length > 0){
            //     console.log('999999');
            //     console.log(this.props.selected_user_id);
            //     select_user_id = this.props.selected_user_id;
            // } else {

            // }
            // console.log('========',select_user_id);
            var selectedUser = this.getUserById(this.state.selected_user_id, this.state.users);
            console.log(selectedUser);
            var x = 8;
            var divstyle = {};
            var imgstyle = {};
            // var colors = ['#3e77bd','#c52c43','#5f337f','#e69a31','#e9522e','#e69a31']
            var colors = ['#e69a31','#3e77bd','#e69a31','#5f337f','#e9522e','#c52c43'];
            if(selectedUser.tags){
                tag_html = selectedUser.tags.map((tag, index)=>{
                    console.log(index);
                    divstyle={ width : x + 'em', height: x + 'em', backgroundColor: colors[index] };
                    imgstyle = {width : x + 'em'}
                    x-=1;
                    return <div key={index + tag.name} className="advisor" style = {divstyle}>
                                <img src={this.getImage(tag.name)} style={imgstyle} alt="Alt"/>
                                <p><b>{tag.name}</b></p>
                            </div>
                })
            }
        }



        return (
            <div>   
                <select name="selectedUser" onChange={this.onSubmit}>
                    {this.props.users.map((user)=>{
                        return <option key={user.index} value={user.index}>{user.name}</option>    
                    })}
                </select>

                {tag_html}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userReducer.users,
        selected_user_id: state.userReducer.selected_user_id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectUser: (user_index, user_name) => dispatch(ActionCreators.selectUser(user_index, user_name)),
        fetchInitialUsers: () => dispatch(ActionCreators.fetchUsers()),
        // fetchNotes: () => dispatch(ActionCreators.fetchNotes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectUser)
// export default SelectUser;