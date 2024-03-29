import { resetAllData, setAgentList, setAwardHistory, setLeaderBoardRankings, setRedmptionHistory, setSelectedAgentAction } from "./agentReducer"

const getBaseURL = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:5056"
    }

    return `http://${window.location.hostname}:8080`
}

export const fetchAgentList = () => async (dispatch, getState) => {
    const store = getState();
    const selectedAgent = store.agentReducer.selectedAgent;
    try {
        const responseObj = await fetch(`${getBaseURL()}/GetAgentList?AgentCode=ABC`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        const responseJson = await responseObj.json();

        if (!responseJson || !responseJson.length) {
            return
        }

        dispatch(setAgentList(responseJson))
        const newSelectedAgent = responseJson.find(agent => agent.agentCode === selectedAgent.agentCode)
        if (newSelectedAgent) {
            dispatch(setSelectedAgent(newSelectedAgent))
        } else {
            dispatch(setSelectedAgent(responseJson[0]))
        }
    } catch(e) {
        console.error("Failed to fetch agent list. Error " + e)
    }

}

export const addBookingThunk = (data) => async (dispatch, getState) => {
    const store = getState();
    const selectedAgent = store.agentReducer.selectedAgent || {};

    if (!selectedAgent || !selectedAgent.agentCode) {
        return false
    }

    const request = {
        "agentCode": selectedAgent.agentCode,
        "bookingConfirmationNo": new Date().getTime() + "",
        "cityName": data.city,
        "countryName": data.country,
        "bookingAmount": data.price,
        "bookingDate": `${data.date}T00:00:00.000Z`,
        "countryCode": data.countryCode
      }

      try {
        const responseObj = await fetch(`${getBaseURL()}/AddAwardAfterBooking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })

        const responseJson = await responseObj.json();
        await dispatch(resetAllData())
        console.log(responseJson);
        dispatch(showConfetti())
        return true;
      } catch(e) {
        console.error("Failed to create booking. Error ");
        console.error(e);
        return false
      }
}



export const fetchAwardHistoryThunk = () => async (dispatch, getState) => {
    const store = getState();
    const selectedAgent = store.agentReducer.selectedAgent;
    dispatch(setAwardHistory([]))
    try {
        const responseObj = await fetch(`${getBaseURL()}/GetAwardHistory?AgentCode=${selectedAgent.agentCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        const responseJson = await responseObj.json();

        if (!responseJson || !responseJson.awardHistory || !responseJson.awardHistory.length) {
            return
        }
        const awardHistory = responseJson.awardHistory;
        awardHistory.sort((a, b) => {
            const timeA = new Date(a.awardOn);
            const timeB = new Date(b.awardOn);

            return timeB.getTime() - timeA.getTime();
        })
        dispatch(setAwardHistory(responseJson.awardHistory))
    } catch(e) {
        console.error("Failed to fetch award list. Error " + e)
    }

}

export const fetchLeaderboardRankings = () => async (dispatch, getState) => {
    const store = getState();
    const selectedAgent = store.agentReducer.selectedAgent;
    dispatch(setLeaderBoardRankings([]))
    try {
        const responseObj = await fetch(`${getBaseURL()}/GetLeaderboardRankings?AgentCode=${selectedAgent.agentCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        const responseJson = await responseObj.json();

        if (!responseJson || !responseJson.agentCode) {
            return
        }
        dispatch(setLeaderBoardRankings(responseJson))
    } catch(e) {
        console.error("Failed to fetch award list. Error " + e)
    }

}

export const redeemVoucher = (request) => async (dispatch, getState) => {
    try {
        const responseObj = await fetch(`${getBaseURL()}/ReedemAwardPoints`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })

        const responseJson = await responseObj.json();
        await dispatch(resetAllData());
        dispatch(fetchAgentList());
        return true;
      } catch(e) {
        console.error("Failed to create booking. Error ");
        console.error(e);
        return false
      }
}

export const fetchRedemptionHistory = () => async (dispatch, getState) => {
    const store = getState();
    const selectedAgent = store.agentReducer.selectedAgent;
    dispatch(setLeaderBoardRankings([]))
    try {
        const responseObj = await fetch(`${getBaseURL()}/GetRedemptionHistory?AgentCode=${selectedAgent.agentCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        const responseJson = await responseObj.json();

        if (!responseJson || !responseJson.length) {
            return
        }
        dispatch(setRedmptionHistory(responseJson))
    } catch(e) {
        console.error("Failed to fetch award list. Error " + e)
    }

}

export const showConfetti = (message = "Congratulations! You've moved up on the leaderboard") => async (dispatch) => {
    dispatch({type: "show.confetti", message})
    setTimeout(() => {
        dispatch({type: "hide.confetti"})
    }, 7000)
}

export const setSelectedAgent = (agent, showMessage) => async (dispatch, getState) => {
    await dispatch(setSelectedAgentAction(agent))
    await dispatch(fetchAwardHistoryThunk())
    if (!showMessage) {
        return
    }
    const state = getState()
    const awardHistory = state.agentReducer.awardHistory || [];
    const loginAwardPresent = awardHistory.find(award => (award.bookingConfirmationNo || "").toLowerCase().includes("logging"))
    if (loginAwardPresent) {
        dispatch(showConfetti(`Welcome Back! ${loginAwardPresent.awardName}`))
    }
}