import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sugokuReducer from "./reducers/boardReducer"

const reducer = combineReducers({
    sugokuReducer
  })

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
