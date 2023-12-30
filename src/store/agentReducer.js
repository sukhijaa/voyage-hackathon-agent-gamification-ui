const initialState = {
    profile: {},
    awardHistory: [],
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
        case "agent.set.awardHistory": {
            return {...state, awardHistory: action.payload}
        }
        case "agent.reset": {
            return {...initialState}
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

export const setAwardHistory = (data) => {
    return {
        type: "agent.set.awardHistory",
        payload: data
    }
}

export const setSelectedAgent = (data) => {
    return {
        type: "agent.set.selected",
        payload: data
    }
}

export const resetAllData = () => {
    return {
        type: "agent.reset"
    }
}

export default agentReducer