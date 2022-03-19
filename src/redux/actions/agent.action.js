import { FETCHING_AGENTS_DETAILS, GET_AGENT_DETAILS, SAVE_FETCHED_AGENTS } from '../actions/actionTypes';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

const fetchingActiveAgents = (isFetchingAgentsDetails) => {
    return {
        type: FETCHING_AGENTS_DETAILS,
        isFetchingAgentsDetails
    }
}

const saveFetchedAgents = (agents) => {
    return {
        type: SAVE_FETCHED_AGENTS,
        agents
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
            dispatch(saveFetchedAgents(data.data))
        } catch (err) {
            console.log(err)
        }
        dispatch(fetchingActiveAgents(false));
    }
}