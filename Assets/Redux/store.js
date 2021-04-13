import {createStore} from 'redux'
import loginReducer from './Login/loginReducer'

const store=createStore(loginReducer)
export default store;