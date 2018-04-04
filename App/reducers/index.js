import {combineReducers} from 'redux'

import {code} from './code';
import {options} from './options';

export default combineReducers({
    code,
    options,
});