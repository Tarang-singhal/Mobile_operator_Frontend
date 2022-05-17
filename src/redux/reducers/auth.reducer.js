import { SIGNING_UP_USER, SAVE_USER_LOCATION, LOGGING_IN_USER, LOGGED_IN_USER, LOGOUT_USER, UPDATING_USER, UPDATED_USER } from '../actions/actionTypes';

const initialState = {
    user: {},
    isLoggedIn: false,
    employeeDetails: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNING_UP_USER:
            return {
                ...state,
                isSigningUpUser: action.isSigningUpUser
            }
        case LOGGING_IN_USER:
            return {
                ...state,
                isLoggingInUser: action.isLoggingInUser
            }
        case LOGGED_IN_USER:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true
            }
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false
            }
        case UPDATING_USER:
            return {
                ...state,
                isUpdatingUser: action.isUpdatingUser,
                isLoggedIn: true
            };
        case UPDATED_USER:
            return {
                ...state,
                user: { ...state.user, ...action.user },
                isLoggedIn: true
            };
        case SAVE_USER_LOCATION:
            return {
                ...state,
                user: { ...state.user, ...action.location },
                isLoggedIn: true
            }
        default:
            return state;
    }

}
