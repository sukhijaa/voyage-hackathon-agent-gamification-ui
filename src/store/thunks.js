import { resetAllData, setAgentList, setAwardHistory, setSelectedAgent } from "./agentReducer"

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
    const selectedAgent = store.agentReducer.selectedAgent;

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