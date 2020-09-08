import {createStore} from 'redux';

import reducer from './redusers/reducer';

const store = createStore(reducer);

export default store;