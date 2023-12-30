import { setAgentList, setSelectedAgent } from "./agentReducer"

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
        dispatch(fetchAgentList())
        console.log(responseJson);
        return true;
      } catch(e) {
        console.error("Failed to create booking. Error ");
        console.error(e);
        return false
      }
}