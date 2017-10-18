import { combineReducers } from 'redux';
import scores from './scores';

const rootReducer = combineReducers({
  scores,
});

export default rootReducer;
