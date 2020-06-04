//data layer ie redux 
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
import 'materialize-css/dist/css/materialize.min.css'

// how redux works again
// React Components calls a Action Creator -> returns Action that is sent
//to a reducer which updates the state 
//Provider tag that helps tie react with redux 

//when first starting an app we want to intialize the store as
// const store = createStore(() => [], {}, applyMiddleware())

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
    <Provider store = {store}><App/></Provider>,
    document.querySelector('#root'));
