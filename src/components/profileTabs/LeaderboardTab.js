import React, { useEffect, useState } from "react";
import "./TabsStyling.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboardRankings } from "../../store/thunks";

const getPointsToNextRank = (agentList, selectedAgentCode, matchKey) => {
  const selectedAgent = agentList.find(
    (agent) => agent.agentCode === selectedAgentCode
  );
  if (!selectedAgent) {
    return 0;
  }
  let requiredAgents = agentList;
  if (matchKey) {
    requiredAgents = agentList.filter(
      (agent) => agent[matchKey] === selectedAgent[matchKey]
    );
  }

  if (requiredAgents.length <= 1) {
    return 0
  }
  requiredAgents.sort((a, b) => b.totalPoint - a.totalPoint);
  const selectedAgentIndex = requiredAgents.findIndex(
    (agent) => agent.agentCode === selectedAgentCode
  );

  if (selectedAgentIndex <= 0) {
    return 0;
  }

  const justHigherAgent = requiredAgents[selectedAgentIndex - 1];

  return justHigherAgent.totalPoint - selectedAgent.totalPoint;
};

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
  const agentList = useSelector((store) => store.agentReducer.agentList || []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!leaderboardForAgent || leaderboardForAgent !== selectedAgentCode) {
      dispatch(fetchLeaderboardRankings());
    }
  }, []);

  if (selfIndex !== selectedIndex) {
    return null;
  }

  const nextCityRank = getPointsToNextRank(
    agentList,
    selectedAgentCode,
    "cityName"
  );
  const nextCountryRank = getPointsToNextRank(
    agentList,
    selectedAgentCode,
    "countryCode"
  );
  const nextGlobalRank = getPointsToNextRank(agentList, selectedAgentCode);

  return (
    <div className="agent-tab-details-wrapper">
      <div className="leaderboard-tab-item-wrapper">
        <div className="leaderboard-tab-item-title" />
        <div className="leaderboard-tab-item-value">
          <div className="leaderboard-tab-item-value-rank">Overall Ranking</div>
        </div>
        <div className="leaderboard-tab-item-value">
          <div className="leaderboard-tab-item-value-rank">Monthly Ranking</div>
        </div>
      </div>
      <div className="leaderboard-tab-item-wrapper">
        <div className="leaderboard-tab-item-title">City Ranking</div>
        <div className="leaderboard-tab-item-value">
          <div className="leaderboard-tab-item-value-rank">
            {leaderboard.cityRank}
          </div>
          {nextCityRank ? (
            <div className="leaderboard-tab-item-value-remark">
              Need only {nextCityRank} more points to become Rank {leaderboard.cityRank - 1}
            </div>
          ) : null}
        </div>
        <div className="leaderboard-tab-item-value">
          <div className="leaderboard-tab-item-value-rank">
            {leaderboard.cityRank + 1}
          </div>
        </div>
      </div>
      <div className="leaderboard-tab-item-wrapper">
        <div className="leaderboard-tab-item-title">Country Ranking</div>
        <div className="leaderboard-tab-item-value">
          <div className="leaderboard-tab-item-value-rank">
            {leaderboard.countryRank}
          </div>
          {nextCountryRank ? (
            <div className="leaderboard-tab-item-value-remark">
              Need only {nextCountryRank} more points to become Rank {leaderboard.countryRank - 1}
            </div>
          ) : null}
        </div>
        <div className="leaderboard-tab-item-value">
          <div className="leaderboard-tab-item-value-rank">
            {leaderboard.countryRank + 1}
          </div>
        </div>
      </div>
      <div className="leaderboard-tab-item-wrapper">
        <div className="leaderboard-tab-item-title">Global Ranking</div>
        <div className="leaderboard-tab-item-value">
          <div className="leaderboard-tab-item-value-rank">
            {leaderboard.globalRank}
          </div>
          {nextGlobalRank ? (
            <div className="leaderboard-tab-item-value-remark">
              Need only {nextGlobalRank} more points to become Rank {leaderboard.globalRank - 1}
            </div>
          ) : null}
        </div>
        <div className="leaderboard-tab-item-value">
          <div className="leaderboard-tab-item-value-rank">
            {leaderboard.globalRank + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
