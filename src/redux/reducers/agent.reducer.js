import { FETCHING_AGENTS_DETAILS, GET_AGENT_DETAILS } from '../actions/actionTypes';

const initialState = {
    agents: [],
    isFetchingAgentsDetails: false,
    selectedAgentId : '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_AGENT_DETAILS:
            return state.agents.find(agent => agent.id === action.agentId)
        case FETCHING_AGENTS_DETAILS:
            return {
                ...state,
                isFetchingAgentsDetails: action.isFetchingAgentsDetails
            }
        default:
            return state;
    }

}
