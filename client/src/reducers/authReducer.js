import { FETCH_USER } from '../actions/types'


export default function(state = null, action) {

    switch (action.type) {
        case FETCH_USER:
            //if user not logged in return a empty
            //string and empty strings are false
            return action.payload || false;
        default:
        return state;
    }
}