import React, { useEffect, useState } from "react";
import "./TabsStyling.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboardRankings } from "../../store/thunks";

const Leaderboard = (props) => {
  const { selfIndex, selectedIndex } = props;
  const leaderboard = useSelector(
    (store) => store.agentReducer.leaderboard || []
  );
  const leaderboardForAgent = useSelector(
    (store) => store.agentReducer.leaderboard?.agentCode || ""
  );
  const selectedAgentCode = useSelector(
    (store) => store.agentReducer.selectedAgent?.agentCode || ""
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!leaderboardForAgent || leaderboardForAgent !== selectedAgentCode) {
      dispatch(fetchLeaderboardRankings())
    }
  }, []);

  if (selfIndex !== selectedIndex) {
    return null;
  }

  return (
    <div className="agent-tab-details-wrapper">
        <div className="leaderboard-tab-item-wrapper">
            <div className="leaderboard-tab-item-title">
                City Ranking
            </div>
            <div className="leaderboard-tab-item-value">
                {leaderboard.cityRank}
            </div>
        </div>
        <div className="leaderboard-tab-item-wrapper">
            <div className="leaderboard-tab-item-title">
                Country Ranking
            </div>
            <div className="leaderboard-tab-item-value">
                {leaderboard.countryRank}
            </div>
        </div>
        <div className="leaderboard-tab-item-wrapper">
            <div className="leaderboard-tab-item-title">
                Global Ranking
            </div>
            <div className="leaderboard-tab-item-value">
                {leaderboard.globalRank}
            </div>
        </div>
    </div>
  );
};

export default Leaderboard;
