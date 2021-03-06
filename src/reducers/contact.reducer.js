export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'CONTACTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'CONTACTS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function contacts(state = [], action) {
    switch (action.type) {
        case 'CONTACTS_FETCH_DATA_SUCCESS':
            return action.contacts;

        default:
            return state;
    }
}