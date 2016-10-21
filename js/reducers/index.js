import { combineReducers } from 'redux';

import tay from './tayReducer';
import tty from './ttyReducer';

export default combineReducers({
  tay, tty,
});
