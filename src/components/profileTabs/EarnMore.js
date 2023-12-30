import React from "react";
import "./TabsStyling.css";

const DATA = [
  {
    title: "Scenario",
    value: "Reward Points Earned",
    example: "For a booking of amount $1000",
  },
  {
    title: "On Every Booking",
    value: "1% of Total Booking Value",
    example: "You'll earn 10 Reward Points for this booking",
  },
  {
    title: "On Every 10th Booking",
    value: "Additonal 1% of Total Booking Value",
    example:
      "You'll earn a total of 20 Reward Points for this booking (including 10 Points bonus for this booking)",
  },
  {
    title: "On Every New City",
    value: "Additonal 2% of Total Booking Value",
    example:
      "You'll earn a total of 30 Reward Points (including 20 Points bonus for this booking)",
  },
  {
    title: "On Every New Country",
    value: "Additonal 2% of Total Booking Value",
    example:
      "You'll earn a total of 50 Reward Points (including 40 Points bonus for this booking - since you booked a new city and a new country)",
  },
];

const EarnMore = (props) => {
  const { selfIndex, selectedIndex } = props;

  if (selfIndex !== selectedIndex) {
    return null;
  }

  return (
    <div className="agent-tab-details-wrapper">
      <h2>Earn Reward Points on every booking</h2>
      <h4>100 Reward Points = $1</h4>
      {DATA.map((row, index) => {
        return (
          <div className={`earn-more-row-wrapper earn-more-row-${index}`}>
            <div className="earn-more-row-title">{row.title}</div>
            <div className="earn-more-row-value">{row.value}</div>
            <div className="earn-more-row-example">{row.example}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EarnMore;
