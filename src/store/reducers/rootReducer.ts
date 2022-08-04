import { combineReducers } from 'redux';
import UI from './UI';
import userDetails from './userDetails';

export default combineReducers({
    UI,
    userDetails,
});
