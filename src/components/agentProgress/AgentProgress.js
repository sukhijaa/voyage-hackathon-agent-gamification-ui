import React from "react";
import "./AgentProgress.css";
import { EmojiEvents } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";

const AgentProgress = () => {
  const selectedAgent = useSelector(
    (store) => store.agentReducer.selectedAgent
  );
  return (
    <>
      <div className="profile-level-wrapper">
        <p>
          Congratulations, you are a <span>{selectedAgent.badgeName}</span> Tier
          Member
        </p>
      </div>
      <div className="profile-progress-top">
        <div className="profile-icon-wrapper">
          <p>Executive</p>
          <EmojiEvents className="profile-progress" />
        </div>
        <div className="profile-icon-wrapper">
          <p>Leadership</p>
          <EmojiEvents className="profile-progress" />
        </div>
        <div className="profile-icon-wrapper">
          <p>Chairman</p>
          <EmojiEvents className="profile-progress" />
        </div>
        <div className="profile-icon-wrapper">
          <p>President</p>
          <EmojiEvents className="profile-progress" />
        </div>
      </div>
      <LinearProgress
        variant="determinate"
        value={Math.ceil(selectedAgent.totalPoint / 20)}
      />
      <div className="profile-progress-top">
        <div className="profile-icon-wrapper">0</div>
        <div className="profile-icon-wrapper">500</div>
        <div className="profile-icon-wrapper">1000</div>
        <div className="profile-icon-wrapper">1500</div>
      </div>
    </>
  );
};

export default AgentProgress;
