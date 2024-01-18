import React from "react";
import "./AgentProgress.css";
import { EmojiEvents } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";

const getClassname = (value) => {
    if (value < 25) {
        return "progress-bar-custom progress-silver"
    } else if (value < 50) {
        return "progress-bar-custom progress-gold"
    } else if (value < 75) {
        return "progress-bar-custom progress-platinum"
    } else {
        return "progress-bar-custom progress-diamond"
    }
}

const AgentProgress = () => {
  const selectedAgent = useSelector(
    (store) => store.agentReducer.selectedAgent
  );

  const progressValue = Math.ceil(selectedAgent.totalPoint / 20)

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
          <p>TBO Silver +</p>
          <EmojiEvents className="profile-progress" />
        </div>
        <div className="profile-icon-wrapper">
          <p>TBO Gold +</p>
          <EmojiEvents className="profile-progress" />
        </div>
        <div className="profile-icon-wrapper">
          <p>TBO Platinum +</p>
          <EmojiEvents className="profile-progress" />
        </div>
        <div className="profile-icon-wrapper">
          <p>TBO Diamond +</p>
          <EmojiEvents className="profile-progress" />
        </div>
      </div>
      <LinearProgress
        variant="determinate"
        className={getClassname(progressValue)}
        value={progressValue}
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
