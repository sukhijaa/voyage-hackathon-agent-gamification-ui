import React from "react";
import "./TabsStyling.css";
import TierBenefitsImg from "./TierBenefits.png"

const TierBenefits = props => {
    const {selfIndex, selectedIndex} = props;

    if (selfIndex !== selectedIndex) {
        return null
    }

    return (
        <div className="agent-tab-details-wrapper">
            <img src={TierBenefitsImg} className="tier-benefits-img"/>
        </div>
    )
}

export default TierBenefits