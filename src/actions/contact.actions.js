import { userService } from '../services/';
import { alertActions } from './';
import {userConstants} from "../constants";


export const contactActions = {
    getContacts
};


export function itemsHasErrored(bool) {
    return {
        type: 'CONTACTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'CONTACTS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(contacts) {
    return {
        type: 'CONTACTS_FETCH_DATA_SUCCESS',
        contacts
    };
}


function getContacts(){
    return dispatch => {

        dispatch(itemsIsLoading(true));

        let apiEndpoint = 'users';

        userService.get(apiEndpoint)
            .then((response)=>{

                if (response && response.data) {
                    dispatch(itemsFetchDataSuccess(response.data));
                    dispatch(itemsHasErrored(true));
                    //console.log(response.data);
                }

                else
                {
                    dispatch(itemsIsLoading(false));
                    dispatch(alertActions.error('contacts konnten nicht geladen werden.'));
                }
            })
    };
}
