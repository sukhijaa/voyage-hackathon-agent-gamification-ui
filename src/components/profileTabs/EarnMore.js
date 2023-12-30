import React from "react";
import "./TabsStyling.css";

const EarnMore = props => {
    const {selfIndex, selectedIndex} = props;

    if (selfIndex !== selectedIndex) {
        return null
    }

    return (
        <div className="agent-tab-details-wrapper">
            This is Earn More Tab
        </div>
    )
}

export default EarnMore