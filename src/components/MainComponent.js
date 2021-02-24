import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logoutUser, googleLogin, signupUser, findRide, postRide, autoRide, fetchUserProfile, setupLocalstorage } from '../redux/ActionCreators';
//import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
import UserProfile from './userProfileComponent'
import MiddleComponent from './MiddleComponent';
import LoginComponent from './LoginComponent';


const mapStateToProps = state => {
    return {
        auth: state.auth,
        rides: state.rides,
        autoRide: state.autoRide,
        userProfile: state.userProfile
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  googleLogin: () => dispatch(googleLogin()),
  findRide: (data) => dispatch(findRide(data)),
  postRide: (data) => dispatch(postRide(data)),
  autoRideRequest: (data) => dispatch(autoRide(data)),
  fetchUserProfile: (data) => dispatch(fetchUserProfile(data)),
  setupLocalstorage: (user) => dispatch(setupLocalstorage(user))
});


class Main extends Component {
  
  refreshToken=()=> {
    var user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      console.log(user)
      this.props.setupLocalstorage(user)
    }
    else {
      console.log(user)
    }
  }

  componentDidMount() {
    this.refreshToken()
  }

  returnHeaderStore = () => {
    const store = {
      auth: this.props.auth, 
      signupUser: this.props.signupUser,
      loginUser: this.props.loginUser,
      logoutUser: this.props.logoutUser,
      googleLogin: this.props.googleLogin, 
    }

    return store
  }

  returnMiddleStore = () => {
    const store = {
      rides: this.props.rides,
      findRide: this.props.findRide,
      postRide: this.props.postRide,
      autoRide: this.props.autoRide,
      autoRideRequest: this.props.autoRideRequest
    }

    return store
  }

  returnUserStore = () => {
    const store = {
      auth: this.props.auth
    }
    
    return store
  }

  returnUserProfileStore = () => {
    const store = {
      auth: this.props.auth,
      userProfile: this.props.userProfile,
      fetchUserProfile: this.props.fetchUserProfile
    }

    return store
  }
  
  render() {

    return (
      <div>
        <Header store={this.returnHeaderStore()}/>

        <Switch>
        <Route exact path="/updateProfile" component={()=><UserProfile store={this.returnUserProfileStore()}/>} />
        <Route exact path="/login" component={()=><LoginComponent store={this.returnUserStore()}/> } />
        <Route path="/" component={()=><MiddleComponent store={this.returnMiddleStore()}/>} />
       
        
        </Switch>
        
        <Footer />
      </div>
    );
  } 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
