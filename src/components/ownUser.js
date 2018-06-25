import React from 'react';
import advisor from '../assets/images/advisor.svg';
import connector from '../assets/images/connector.svg';
import doer from '../assets/images/doer.svg';
import dreamer from '../assets/images/dreamer.svg';
import organizer from '../assets/images/organizer.svg';
import original from '../assets/images/original.svg';
import { connect } from 'react-redux';
import * as ActionDispatcher from '../store/actions/userActions';

class OwnUser extends React.Component{

    componentDidMount(){
        this.props.fetchOwnUser();
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
        console.log('ownUser render()');
        console.log(this.props.ownUser);

        var x = 8;
        var tag_html = '';
        var divstyle = {};
        var imgstyle = {};
        var colors = ['#3e77bd','#c52c43','#5f337f','#e69a31','#e9522e','#e69a31']
        if(this.props.ownUser.tags){
            tag_html = this.props.ownUser.tags.map((tag, index)=>{
                divstyle={ width : x + 'em', height: x + 'em', backgroundColor: colors[index] };
                imgstyle = {width : x + 'em'}
                x-=1;
                return <div className="advisor" key={tag.name+index} style = {divstyle}>
                            <img src={this.getImage(tag.name)} style={imgstyle} alt="Alt"/>
                            <p><b>{tag.name}</b></p>
                        </div>
            })
        }

        return (
            <div className="col-xs-6 text-center">
                <p><b>You</b></p>
                {tag_html}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ownUser: state.userReducer.ownUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOwnUser: () => dispatch(ActionDispatcher.fetchOwnUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnUser);