import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth } from '../firebase/firebase';
import firebase from 'firebase';


/*****************************  User Login Actions *******************************************************/

export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}
  
export const receiveLogin = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        user
    }
}

export const setupLocalstorage = (user) => {
    return {
        type: ActionTypes.SETUP_LOCALSTORAGE,
        user
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin())

    return auth.signInWithEmailAndPassword(creds.email, creds.password)
    .then(() => {
        var user = auth.currentUser;
        localStorage.setItem('user', JSON.stringify(user));
        // Dispatch the success action
        dispatch(receiveLogin(user));
    })
    .catch(error => dispatch(loginError(error.message)))
};

/*****************************  User SignUp Actions *******************************************************/

export const requestSignup = () => {
    return {
        type: ActionTypes.SIGNUP_REQUEST
    }
}
  
export const receiveSignup = (user) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        user
    }
}
  
export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

export const signupUser = (creds) => (dispatch) => {
    // We dispatch requestSignup to kickoff the call to the API
    dispatch(requestSignup(creds))
    console.log(creds)

    return auth.createUserWithEmailAndPassword(creds.email, creds.password)
    .then(() => {
        var user = auth.currentUser;
        localStorage.setItem('user', JSON.stringify(user));
        // Dispatch the success action
        dispatch(receiveSignup(user));
        var userEmail = {
            email: user.email,
            name: user.displayName,
            id: user.uid,
            phoneNumber: user.phoneNumber,
            signUpDate: user.metadata.creationTime
        }
        dispatch(registerUser(userEmail));
    })
    .catch(error => dispatch(signupError(error.message)))
};

export const registerUser = (user) => (dispatch) => {
    return firestore.collection('users').doc(user.id).set(user)
        .then();
}

/*****************************  User Logout Actions *******************************************************/

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    auth.signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    localStorage.removeItem('user');
    
    dispatch(receiveLogout())
}

/*****************************  User Google login Action *******************************************************/

export const googleLogin = () => (dispatch) => {
    const provider = new fireauth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
            
            // Dispatch the success action
            dispatch(receiveLogin(user));
            var userEmail = {
                email: user.email,
                name: user.displayName,
                id: user.uid,
                phoneNumber: user.phoneNumber,
                signUpDate: user.metadata.creationTime
            }
            dispatch(registerUser(userEmail));
            
        })
        .catch((error) => {
            dispatch(loginError(error.message));
        });
}

/*****************************  Find Rides Actions *******************************************************/

export const findRide = (data) => (dispatch) => {
    dispatch(fetchRideRequest());

    return firestore.collection('rides').where('src', '==', data.src).where('dst', '==', data.dst).get()
        .then(snapshot => {
            let rides = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                rides.push({_id, ...data });
            });
            
            return rides;
        })
        .then(rides => dispatch(fetchRide(rides)))
        .catch(error => dispatch(fetchRideFailed(error.message)));
}

export const fetchRideRequest = () => ({
    type: ActionTypes.FETCH_RIDES_REQUEST
});

export const fetchRide = (rides) => ({
    type: ActionTypes.FETCH_RIDES,
    rides
});

export const fetchRideFailed = (errmess) => ({
    type: ActionTypes.FETCH_RIDES_FAILURE,
    payload: errmess
});


/*****************************  Post Rides Actions *******************************************************/

export const postRide = (data) => (dispatch) => {
        
    return firestore.collection('rides').add(data)
    .then(response => { console.log('Rides', response); alert('Your ride has been successfully posted!'); })
    .catch(error =>  { console.log('Rides', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};

/*****************************  Request Rides Actions *******************************************************/

export const requestAutoRide = () => {
    return{
        type: ActionTypes.REQUEST_AUTO_RIDE
    }
}

export const successAutoRide = (msg) => {
    return{
        type: ActionTypes.SUCCESS_AUTO_RIDE,
        payload: msg
    }
}

export const failureAutoRide = (err) => {
    return{
        type: ActionTypes.FAILURE_AUTO_RIDE,
        payload: err
    }
}

export const autoRide = (ride) => (dispatch) => {
        dispatch(requestAutoRide)
        
        const ridetime = dateToFirebaseTimeStamp(ride.rideDetail.rideDate, ride.rideDetail.rideTime)
        const endtime = ride.rideDetail.isRideTwoWay 
                        ?  dateToFirebaseTimeStamp(ride.rideDetail.endDate, ride.rideDetail.endTime) 
                        : null

        const rideDetails = {
            pickUp: {
                Address: ride.rideDetail.pickupAddress,
                City: ride.rideDetail.pickupCity
            },
            destination: {
                Address: ride.rideDetail.destAddress,
                City: ride.rideDetail.destCity
            },
            isRideTwoWay: ride.rideDetail.isRideTwoWay,
            rideTime: ridetime,
            returnTime: endtime            
        }

        firestore.collection('ride-request').add(
            rideDetails
        )
        .then(
            dispatch(successAutoRide("Your ride request has been submitted successfully."))
        )
        .catch(error => {
                dispatch(failureAutoRide(error))
            }
        )
}

const dateToFirebaseTimeStamp = (fulldate, time) => {
    const d = fulldate.split("-")
    const year = d[0]
    const month = parseInt(d[1]) - 1
    const date = d[2]


    const t = time.split(":")
    const hour = t[0]
    const minute = t[1]

    return firebase.firestore.Timestamp.fromDate(new Date(year, month, date, hour, minute))
}

/****************************** Fetching User Profile Actions ******************************/
export const requestUserProfile = () => {
    return {
        type: ActionTypes.FETCH_USER_PROFILE_REQUEST
    }
}

export const successUserProfile = (userProfile) => {
    return{
        type: ActionTypes.FETCH_USER_PROFILE_SUCCESS,
        userProfile: userProfile
    }
}

export const failureUserProfile = (err) => {
    return{
        type: ActionTypes.FETCH_USER_PROFILE_FAILURE,
        err: err
    }
}

export const fetchUserProfile = (userUID) => (dispatch) => {
    dispatch(requestUserProfile())

    /*firestore
    .collection('users')
    .doc(userUID)
    .get()
    .then(
        (doc) => {
            if(doc.exists){
                let data = doc.data()
                dispatch(successUserProfile(data))
                return data       
            }
            else{
                dispatch(failureUserProfile("No such Document exists."))
            }
        }
    )
    .catch(err => {
        dispatch(failureUserProfile(err))
    })*/
    console.log(userUID)
}

/****************************** Updating User Profile Actions ******************************/
export const requestUpdateUserProfile = () => {
    return {
        type: ActionTypes.UPDATE_USER_PROFILE_REQUEST
    }
}

export const successUpdateUserProfile = (msg) => {
    return{
        type: ActionTypes.UPDATE_USER_PROFILE_SUCCESS,
        msg: msg
    }
}

export const failureUpdateUserProfile = (err) => {
    return{
        type: ActionTypes.UPDATE_USER_PROFILE_FAILURE,
        err: err
    }
}

export const UpdateUserProfile = (userUID, userProfile) => (dispatch) => {
    dispatch(requestUpdateUserProfile())
    
    firestore
    .collection('users')
    .doc(userUID)
    .update(userProfile)
    .then(dispatch(successUpdateUserProfile("Successfully updated your profile")))
    .catch(err => {
        dispatch(failureUpdateUserProfile(err))
    })
}
