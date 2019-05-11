import {combineReducers} from 'redux';
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER } from './action-type'

/*
 reducer provide user state
 */

const initUser = {
    email : '',
    username : '',
    msg : '',
    redirectTo:''   
}


function user(state=initUser, action ){
    switch (action.type){
        case AUTH_SUCCESS:
            return { ...action.data, redirectTo:'true' }
        case ERROR_MSG:
            return {...state, msg:action.data}
        case RECEIVE_USER:
            return {...action.data }
        case RESET_USER:
            return {...initUser, msg:action.data }
        default :
         return state
    }
}


// export user object { user: { } }

export default combineReducers({ user })
