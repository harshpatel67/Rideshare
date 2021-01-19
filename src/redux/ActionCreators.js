import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth } from '../firebase/firebase';

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
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return auth.signInWithEmailAndPassword(creds.email, creds.password)
    .then(() => {
        var user = auth.currentUser;
        localStorage.setItem('user', JSON.stringify(user));
        // Dispatch the success action
        dispatch(receiveLogin(user));
    })
    .catch(error => dispatch(loginError(error.message)))
};

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
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignup(creds))

    return auth.createUserWithEmailAndPassword(creds.email, creds.password)
    .then(() => {
        var user = auth.currentUser;
        localStorage.setItem('user', JSON.stringify(user));
        // Dispatch the success action
        dispatch(receiveSignup(user));
    })
    .catch(error => dispatch(signupError(error.message)))
};

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

export const googleLogin = () => (dispatch) => {
    const provider = new fireauth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
            // Dispatch the success action
            dispatch(receiveLogin(user));
        })
        .catch((error) => {
            dispatch(loginError(error.message));
        });
}

export const postFindRide = (data) => (dispatch) => {

    return firestore.collection('rides').where('source', '==', data.src).get()
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
        .catch();
}

/*export const postRide = (rides) => (dispatch) => {
        
    return firestore.collection('rides').add(rides)
    .then(response => { console.log('Rides', response); alert('Thank you for your feedback!'); })
    .catch(error =>  { console.log('Rides', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};*/

export const fetchRide = (rides) => ({
    type: ActionTypes.FETCH_RIDES,
    rides
});