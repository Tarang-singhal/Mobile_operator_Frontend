import { FETCHING_AGENTS_DETAILS, GET_AGENT_DETAILS } from '../actions/actionTypes';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

const fetchingActiveAgents = (isFetchingAgentsDetails) => {
    return {
        type: FETCHING_AGENTS_DETAILS,
        isFetchingAgentsDetails
    }
}

const getSelectedAgent = (agentId) => {
    return {
        type: GET_AGENT_DETAILS,
        agentId
    }
}

export const getActiveAgents = () => {
    return async dispatch => {
        dispatch(fetchingActiveAgents(true));
        try {
            const { data } = await axios.get(`${BASE_URL}/user/agent/active`)
            console.log(data);
        } catch (err) {
            console.log(err)
        }
    }
}