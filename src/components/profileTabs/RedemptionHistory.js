import React, { useEffect } from "react";
import "./TabsStyling.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRedemptionHistory, redeemVoucher } from "../../store/thunks";
import { Button, Card } from "@mui/material";

const REDEEM_OBJECT = [
    {
        redemptionTitle: "Voucher Name",
        requirePoints: "Points Required",
        dontSell: true
    },
    {
        redemptionTitle: "Get $10 Off On Next Booking",
        requirePoints: 1000
    },
    {
        redemptionTitle: "Get $10 Amazon Voucher",
        requirePoints: 1500
    },
    {
        redemptionTitle: "Get 10% Off On Car Rentals",
        requirePoints: 2000
    },
    {
        redemptionTitle: "Get Double Commission on Next Booking (max upto $1000)",
        requirePoints: 5000
    },
    {
        redemptionTitle: "Get 10% Off on Hilton Hotels (upto $100)",
        requirePoints: 3000
    }
]

const RedeemItemObject = (props) => {
    const {item} = props;
    const selectedAgent = useSelector((store) => store.agentReducer.selectedAgent)
    const selectedAgentCode = useSelector(
        (store) => store.agentReducer.selectedAgent?.agentCode || ""
      );
      const dispatch = useDispatch();

      const handleRedeem = () => {
        dispatch(redeemVoucher({...item, agentCode: selectedAgentCode, redemptionRuleCode: new Date().getTime() + ""}))
      }

      return (
        <Card elevation={3} className="redeem-item-wrapper">
            <div className="redeem-item-title">{item.redemptionTitle}</div>
            <div className="redeem-item-required-points">{item.requirePoints}</div>
            {
                item.dontSell ? null : <Button onClick={handleRedeem} variant="outlined" disabled={item.requirePoints > selectedAgent.currentPoint}>REDEEM</Button>
            }
        </Card>
      )
}

const RedemptionItemObject = (props) => {
    const {item} = props;
      return (
        <Card elevation={3} className="redeem-item-wrapper">
            <div className="redemption-item-title">{item.redemptionTitle}</div>
            <div className="redemption-item-required-points">{item.pointsUsed}</div>
            <div className="redemption-item-date">{item.lastModifyON}</div>
        </Card>
      )
}

const RedemptionHistory = props => {
    const {selfIndex, selectedIndex} = props;
    const dispatch = useDispatch();
    const redemptionHistory = useSelector(store => store.agentReducer.redemptionHistory)

    useEffect(() => {
        dispatch(fetchRedemptionHistory())
    }, [])

    if (selfIndex !== selectedIndex) {
        return null
    }

    return (
        <div className="agent-tab-details-wrapper">
            <h2>Redeem Points</h2>
            {
                REDEEM_OBJECT.map((item) => {
                    return <RedeemItemObject item={item}/>
                })
            }
            <h2>Redemption History</h2>
            <RedemptionItemObject item={{redemptionTitle: "Voucher Name", pointsUsed: "Points Used", lastModifyON: "Time"}}/>
            {
                redemptionHistory?.length ? redemptionHistory.map(item => <RedemptionItemObject item={item}/>) : "No Redemptions Yet"
            }
        </div>
    )
}

export default RedemptionHistory