import { combineReducers } from 'redux';
import { authentication } from './auth.reducer';
import { alert } from './alert.reducer';
import { contacts, itemsHasErrored, itemsIsLoading } from './contact.reducer';


const rootReducer = combineReducers({
    authentication,
    alert,
    contacts,
    itemsHasErrored,
    itemsIsLoading,
});

export default rootReducer;