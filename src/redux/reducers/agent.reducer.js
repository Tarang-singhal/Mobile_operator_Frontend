import { FETCHING_AGENTS_DETAILS, GET_AGENT_DETAILS, SAVE_FETCHED_AGENTS } from '../actions/actionTypes';

const initialState = {
    agents: [],
    isFetchingAgentsDetails: false,
    selectedAgentId : '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_AGENT_DETAILS:
            return state.agents.find(agent => agent.id === action.agentId)
        case SAVE_FETCHED_AGENTS:
            return{
                ...state,
                agents: [...action.agents],
            }
        case FETCHING_AGENTS_DETAILS:
            return {
                ...state,
                isFetchingAgentsDetails: action.isFetchingAgentsDetails
            }
        default:
            return state;
    }

}
