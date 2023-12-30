const initialState = {
    profile: {},
    rewardHistoru: [],
    milestones: [],
    agentList: [],
    selectedAgent: {}
}

const agentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "agent.set.list": {
            return {...state, agentList: action.payload}
        }
        case "agent.set.selected": {
            return {...state, selectedAgent: action.payload}
        }
        default: 
        return state
    }
}

export const setAgentList = (data) => {
    return {
        type: "agent.set.list",
        payload: data
    }
}

export const setSelectedAgent = (data) => {
    return {
        type: "agent.set.selected",
        payload: data
    }
}

export default agentReducer