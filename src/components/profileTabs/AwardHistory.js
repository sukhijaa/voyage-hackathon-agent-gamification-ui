import React, { useEffect, useState } from "react";
import "./TabsStyling.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAwardHistoryThunk } from "../../store/thunks";

const SingleAward = (props) => {
    const {item} = props;

    return (
        <div className="award-tab-item-wrapper">
            <div className="award-tab-booking-code">{item.bookingConfirmationNo}</div>
            <div className="award-tab-booking-time">{item.awardOn}</div>
            <div className="award-tab-booking-amount">{item.bookingAmount}</div>
            <div className="award-tab-points">{item.earnedPoint}</div>
            <div className="award-tab-award-name">{item.awardName}</div>
        </div>
    )
}

const AwardHistory = (props) => {
  const { selfIndex, selectedIndex } = props;
  const awardHistory = useSelector((store) => store.agentReducer.awardHistory || []);
  const awardHistoryForAgent = useSelector(
    (store) => ((store.agentReducer.awardHistory || [])[0] || {}).awardedFor
  );
  const selectedAgentCode = useSelector(
    (store) => store.agentReducer.selectedAgent?.agentCode || ""
  );
  const [inProgress, setInprogress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inProgress) {
      return;
    }
    if (!awardHistoryForAgent || awardHistoryForAgent !== selectedAgentCode) {
      setInprogress(true);
      dispatch(fetchAwardHistoryThunk()).finally(() => {
        setInprogress(false);
      });
    }
  }, [inProgress, selectedAgentCode, awardHistoryForAgent]);

  console.log("Rerendered");
  if (selfIndex !== selectedIndex) {
    return null;
  }

  return (
    <div className="agent-tab-details-wrapper">
        <SingleAward item={{bookingConfirmationNo: "Booking ID", awardOn: "Booking Time", earnedPoint: "Points Earned", awardName: "Award Name", bookingAmount: "Booking Amount"}}/>
        {
            awardHistory.map(award => {
                return <SingleAward item={award}/>
            })
        }
    </div>
  );
};

export default AwardHistory;
