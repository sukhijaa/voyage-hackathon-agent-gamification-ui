import "./AgentSelector.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { ExpandCircleDownRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAgentList } from "../../store/thunks";
import { resetAllData, setSelectedAgent } from "../../store/agentReducer";

const DUMMY = {
  agentName: "Name",
  agencyName: "Agency Name",
  currentPoint: "Points",
  totalPoint: "Lifetime Points"
};

function RenderAgent(props) {
  const { agent, selecteable } = props;
  const selectedAgent = useSelector(
    (store) => store.agentReducer.selectedAgent || {}
  );
  const dispatch = useDispatch();

  const handleAgentSelect = () => {
    dispatch(resetAllData()).then(() => {
        dispatch(setSelectedAgent(agent))
        sessionStorage.setItem("persist:searchbot", "")
        window.location.reload();
    })
  };

  const isSelected = agent.agentCode === selectedAgent.agentCode;

  return (
    <div className="agent-row-wrapper">
      <div className="agent-code">{agent.agentName}</div>
      <div className="agency-name">{agent.agencyName}</div>
      <div className="agent-points">{agent.currentPoint}</div>
      <div className="agent-points">{agent.totalPoint}</div>
      {selecteable ? (
        <Button onClick={handleAgentSelect} variant={isSelected ? "outlined" : "text"}>
          {isSelected ? "Selected" : "Select"}
        </Button>
      ) : null}
    </div>
  );
}

function AgentSelector() {
  const dispatch = useDispatch();
  const agentList = useSelector((store) => store.agentReducer.agentList || []);
  const selectedAgent = useSelector(
    (store) => store.agentReducer.selectedAgent
  );

  useEffect(() => {
    if (!agentList || !agentList.length) {
      dispatch(fetchAgentList());
    }
  }, [agentList]);

  return (
    <Accordion elevation={3}>
      <AccordionSummary expandIcon={<ExpandCircleDownRounded />}>
        Selected Agent : {selectedAgent.agentName} | {selectedAgent.agencyName}
      </AccordionSummary>
      <AccordionDetails>
        <RenderAgent agent={DUMMY} />
        {agentList.map((agent) => {
          return <RenderAgent agent={agent} selecteable={true} />;
        })}
      </AccordionDetails>
    </Accordion>
  );
}

export default AgentSelector;
