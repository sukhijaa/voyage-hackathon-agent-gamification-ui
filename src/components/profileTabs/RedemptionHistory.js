import React from "react";
import "./TabsStyling.css";

const RedemptionHistory = props => {
    const {selfIndex, selectedIndex} = props;

    if (selfIndex !== selectedIndex) {
        return null
    }

    return (
        <div className="agent-tab-details-wrapper">
            This is Redemption Historu Tab
        </div>
    )
}

export default RedemptionHistory