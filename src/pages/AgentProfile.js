import React, { useState } from "react";
import "./AgentProfile.css";
import Layout from "../components/layout/Layout";
import AgentSelector from "../components/agentSelector/AgentSelector";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  LinearProgress,
  Tab,
  Tabs,
} from "@mui/material";
import { useSelector } from "react-redux";
import { EmojiEvents, ExpandLess, ExpandMore } from "@mui/icons-material";
import AgentProgress from "../components/agentProgress/AgentProgress";
import AwardHistory from "../components/profileTabs/AwardHistory";
import RedemptionHistory from "../components/profileTabs/RedemptionHistory";
import TierBenefits from "../components/profileTabs/TierBenefits";
import EarnMore from "../components/profileTabs/EarnMore";
import Leaderboard from "../components/profileTabs/LeaderboardTab";

const PersonalDetailItem = (props) => {
  const { title, value } = props;

  return (
    <div className="profile-single-item-wrapper">
      <div className="profile-single-item-title">{title}</div>
      <div className="profile-single-item-value">{value}</div>
    </div>
  );
};

const AgentProfile = (props) => {
  const selectedAgent = useSelector(
    (store) => store.agentReducer.selectedAgent
  );
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (e, newValue) => setCurrentTab(newValue);

  return (
    <Layout title="Agent Profile">
      <AgentSelector />
      {!selectedAgent || !selectedAgent.agentCode ? null : (
        <Card elevation={3} className="agent-profile-wrapper">
          <Accordion elevation={0}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <h3 style={{ margin: 0 }}>Welcome {selectedAgent.agentName}</h3>
            </AccordionSummary>
            <AccordionDetails>
              <PersonalDetailItem
                title={"Code"}
                value={selectedAgent.agentCode}
              />
              <PersonalDetailItem
                title={"Agency"}
                value={selectedAgent.agencyName}
              />
              <PersonalDetailItem
                title={"City"}
                value={selectedAgent.cityName}
              />
              <PersonalDetailItem
                title={"Country"}
                value={selectedAgent.countryName}
              />
            </AccordionDetails>
          </Accordion>
          <PersonalDetailItem
            title={"Current Points"}
            value={selectedAgent.currentPoint}
          />
          <PersonalDetailItem
            title={"Total Points"}
            value={selectedAgent.totalPoint}
          />
          <AgentProgress />
          <Card elevation={3} style={{ marginTop: "20px" }}>
            <Tabs value={currentTab} onChange={handleTabClick}>
              <Tab label={"Leaderboard"} />
              <Tab label={"Award History"} />
              <Tab label={"Redeem Points"} />
              <Tab label={"Tier Benefits"} />
              <Tab label={"Earn More"} />
            </Tabs>
            {currentTab === 0 ? <Leaderboard selfIndex={0} selectedIndex={currentTab} /> : null}
            {currentTab === 1 ? <AwardHistory selfIndex={1} selectedIndex={currentTab} /> : null}
            {currentTab === 2 ? <RedemptionHistory selfIndex={2} selectedIndex={currentTab} /> : null}
            {currentTab === 3 ? <TierBenefits selfIndex={3} selectedIndex={currentTab} /> : null}
            {currentTab === 4 ? <EarnMore selfIndex={4} selectedIndex={currentTab} /> : null}
          </Card>
        </Card>
      )}
    </Layout>
  );
};

export default AgentProfile;
