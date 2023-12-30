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
import { setSelectedAgent } from "../../store/agentReducer";

const DUMMY = {
  agentCode: "Agent Code",
  agencyName: "Agency Name",
  currentPoint: "Points",
  totalPoint: "Lifetime Points",
  rank: "Rank",
};

function RenderAgent(props) {
  const { agent, selecteable } = props;
  const selectedAgent = useSelector(
    (store) => store.agentReducer.selectedAgent
  );
  const dispatch = useDispatch();

  const handleAgentSelect = () => {
    dispatch(setSelectedAgent(agent));
  };

  const isSelected = agent.agentCode === selectedAgent.agentCode;

  return (
    <div className="agent-row-wrapper">
      <div className="agent-code">{agent.agentCode}</div>
      <div className="agency-name">{agent.agencyName}</div>
      <div className="agent-points">{agent.currentPoint}</div>
      <div className="agent-points">{agent.totalPoint}</div>
      <div className="agent-rank">{agent.rank}</div>
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
  const agentList = useSelector((store) => store.agentReducer.agentList);
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
        Selected Agent : {selectedAgent.agentCode} | {selectedAgent.agencyName}
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
