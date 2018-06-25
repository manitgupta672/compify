import React, { Component } from 'react';
import SelectUser from './components/selectUser';
import OwnUser from './components/ownUser';
import UserDetail from './components/userDetail';
import { connect } from 'react-redux';

import home1 from './assets/images/home-11.jpg';
import home2 from './assets/images/home-22.jpg';

import  './assets/css/home.css';

class App extends Component {
  render() {
    return (
      <div className="parent-div">
        <div>
          <ul class="nav navbar-nav list-inline jnav-left text-xs-center">
              <li class="active"><a href="#"><span className="j-logo">Josh Technology Group</span></a></li>
            </ul>

            <ul class="nav navbar-nav list-inline jnav-right hidden-xs">
              <li><a href="#">Play</a></li>
              <li><a href="#">Explore</a></li>
              <li><a href="#">Connect</a></li>
              <li><a href="#">Apply</a></li>
            </ul>

            <div className="clearfix"></div>
        </div>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
        
          {/*<ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            
          </ol>*/}

        
          <div className="carousel-inner">
            <div className="item active">
              <img className="home-carousel-image" src={home1} alt="Los Angeles" />
              <div className="mid-text hidden-xs">
                <p>Slide 1</p>
                <a href="#">CTA Link To Redirect</a>
              </div>
            </div>

            <div className="item">
              <img className="home-carousel-image" src={home2} alt="Chicago" />
              <div className="mid-text hidden-xs">
                <p>Slide 2</p>
                <a href="#">CTA Link To Redirect</a>
              </div>
            </div>

          </div>

          
          {/*<a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>*/}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h3 className="text-center margin-top-bottom">Your Profile Comparison with <b>{this.props.selected_user_name}</b></h3>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-4 border-right">
            <div className="row">
              <OwnUser />
              <div className="col-xs-6 text-center">
                <SelectUser />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <UserDetail />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selected_user_name: state.userReducer.selected_user_name
  }
}

export default connect(mapStateToProps)(App);
