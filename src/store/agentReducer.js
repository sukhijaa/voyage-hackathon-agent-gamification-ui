const initialState = {
    profile: {},
    awardHistory: [],
    milestones: [],
    agentList: [],
    selectedAgent: {},
    leaderboard: {}
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
        case "agent.leaderboard": {
            return {...state, leaderboard: action.payload}
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

export const resetAllData = () => async (dispatch) => {
    await dispatch({
        type: "agent.reset"
    })
}

export const setLeaderBoardRankings = (data) => {
    return {
        type: "agent.leaderboard",
        payload: data
    }
}

export default agentReducer