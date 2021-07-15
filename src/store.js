import { createStore } from 'redux'
import combineReducers from './Reducers/index.jsx'

const store = createStore(combineReducers)
export default store