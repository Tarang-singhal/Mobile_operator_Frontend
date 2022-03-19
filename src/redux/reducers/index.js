import { combineReducers } from 'redux';
import auth from './auth.reducer';
import agent from './agent.reducer';

export default combineReducers({
    auth,
    agent,
});