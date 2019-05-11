import {reqRegister,reqLogin,reqUserUpdate, reqMyspace} from '../api/index'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER } from './action-type'

//every action type should correspond a synchronize function

//synchronize function for AUTH_SUCCESS
const authSuccess = (user) =>({type:AUTH_SUCCESS, data:user})

//synchronize function for ERROR_MSG
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg })

//synchronize function to receive user information
const receiveUser = (user) => ({type: RECEIVE_USER, data:user})

//synchronize function to 
const resetUser = (msg) => ({type: RESET_USER, data: msg})

/* 
asynchronous  action for register
*/
export  const  register = (user) => {
    const { username, email, password, confirm_password } = user
    if(!username ){
        return errorMsg("username is required")        
    }
    if(password !== confirm_password){
        //form check in front-end
        return errorMsg("Confirm_password isn't identical to password")
    }
    return async dispatch =>{
        //send asynchronous register request
        //once we use keyword "await", this function must add keyword "async"
        const response = await reqRegister({username, email, password})
        // another way to finish await function ... (but old and long)
        /*  const promise = reqRegiter(user)
            promise.then(response => {
                const result = response.data //{code:0/1, data: user, msg:''}
            })
        */
        const result = response.data
        if(result.code===0){ //code 0, register success
            //dispacher success action            
            dispatch(authSuccess(result.data))
        }else{ //code 1, register failed
            //dispacher failed action
            dispatch(errorMsg(result.msg))
        }
    }
}

/* 
asynchronous  action for Login
*/
export const login = (user)=>{
    const {email, password } = user
    if(!email ){
        return errorMsg("email is required")        
    }
    if(!password){
        //form check in front-end
        return errorMsg("password is required")        
    }
        
    return async dispatch =>{
        const response = await reqLogin(user)
        const result = response.data
        if(result.code===0){ //code 0, register success
            dispatch(authSuccess(result.data))
        }else{ //code 1, register failed
            dispatch(errorMsg(result.msg))
        }
    }
}


//asynchronous  action for Uspace get Info
export const myspace = () => {
    console.log("myspace action in" )
    return async dispatch =>{
        const response = await reqMyspace()
        const result = response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}


export const update = (user) =>{
    return async dispatch =>{

        const response =await reqUserUpdate(user)
        const result = response.data
        if(result.code===0 ){
            dispatch(receiveUser(result.data) )
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

  


