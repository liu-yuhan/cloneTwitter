/*
Module included multiples api request
output expected: promise
*/

import ajax from './ajax'

//api request for user registration
export const reqRegister = (user) => ajax('/register', user, 'POST')

//api request for user login
export const reqLogin = ({ email ,password }) => ajax('/login', {email , password}, 'POST' )

//api request for user update profile
export const reqUserUpdate = (user) => ajax('/update', user, 'POST')
