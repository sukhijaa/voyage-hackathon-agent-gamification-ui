import React from "react";
import "./TabsStyling.css";

const TierBenefits = props => {
    const {selfIndex, selectedIndex} = props;

    if (selfIndex !== selectedIndex) {
        return null
    }

    return (
        <div className="agent-tab-details-wrapper">
            This is Tier Benefits Tab
        </div>
    )
}

export default TierBenefits