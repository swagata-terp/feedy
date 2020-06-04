import axios from 'axios'
import { FETCH_USER  } from './types'

//thunk breaks the rule that we have to immediately return an action object
// our action creator returns an object that has a type property and
// an optional payload payload 

//with thunk the action creator really just creates an action
//it will send it to the dispatch function the dispatch function
//is being used behind the scenes but now we get to use it maually

export const fetchUser = () => async dispatch => {
       const res = await axios.get('/api/current_user')

        dispatch({ type: FETCH_USER, payload: res.data })
    }

export const handleTokens = (token) => async dispatch => {

    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data})
};





