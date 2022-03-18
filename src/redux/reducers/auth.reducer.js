import { SIGNING_UP_USER, SAVE_USER_LOCATION, LOGGING_IN_USER, LOGGED_IN_USER, LOGOUT_USER, UPDATING_USER, UPDATED_USER, FETCHED_AUTH_USER, FETCHING_AUTH_USER, FETCHING_EMPLOYEE_DETAILS, FETCHED_EMPLOYEE_DETAILS } from '../actions/actionTypes';

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
                isUpdatingUser: action.isUpdatingUser
            };
        case UPDATED_USER:
            return {
                ...state,
                user: { ...state.user, ...action.user }
            };
        case FETCHING_AUTH_USER:
            return {
                ...state,
                isFetchingAuthReducer: action.isFetchingAuthReducer
            };
        case FETCHED_AUTH_USER:
            return {
                ...state,
                user: { ...state.user, ...action.user }
            }
        case FETCHING_EMPLOYEE_DETAILS:
            return {
                ...state,
                isFetchingEmployeeDetails: action.isFetchingEmployeeDetails
            }
        case FETCHED_EMPLOYEE_DETAILS:
            return {
                ...state,
                employeeDetails: {
                    ...state.employeeDetails,
                    [action.userId]: action.employeeDetails
                }
            }
        case SAVE_USER_LOCATION:
            return {
                ...state,
                user: { ...state.user, ...action.location }
            }
        default:
            return state;
    }

}
