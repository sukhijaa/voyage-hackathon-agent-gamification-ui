import React, { useState } from "react";
import "./AgentProfile.css";
import Layout from "../components/layout/Layout";
import AgentSelector from "../components/agentSelector/AgentSelector";
import { Card, LinearProgress, Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";
import { EmojiEvents } from "@mui/icons-material";
import AgentProgress from "../components/agentProgress/AgentProgress";
import AwardHistory from "../components/profileTabs/AwardHistory";
import RedemptionHistory from "../components/profileTabs/RedemptionHistory";
import TierBenefits from "../components/profileTabs/TierBenefits";
import EarnMore from "../components/profileTabs/EarnMore";

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
      <Card elevation={3} className="agent-profile-wrapper">
        <h3>Welcome {selectedAgent.agentName}</h3>
        <PersonalDetailItem title={"Code"} value={selectedAgent.agentCode} />
        <PersonalDetailItem title={"Agency"} value={selectedAgent.agencyName} />
        <PersonalDetailItem
          title={"Current Points"}
          value={selectedAgent.currentPoint}
        />
        <PersonalDetailItem
          title={"Total Points"}
          value={selectedAgent.totalPoint}
        />
        <AgentProgress />
        <Card elevation={3} style={{marginTop: "20px"}}>
          <Tabs value={currentTab} onChange={handleTabClick}>
            <Tab label={"Award History"} />
            <Tab label={"Redemption History"} />
            <Tab label={"Tier Benefits"} />
            <Tab label={"Earn More"} />
          </Tabs>
          <AwardHistory selfIndex={0} selectedIndex={currentTab}/>
          <RedemptionHistory selfIndex={1} selectedIndex={currentTab}/>
          <TierBenefits selfIndex={2} selectedIndex={currentTab}/>
          <EarnMore selfIndex={3} selectedIndex={currentTab}/>
        </Card>
      </Card>
    </Layout>
  );
};

export default AgentProfile;
