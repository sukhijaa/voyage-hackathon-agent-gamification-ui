import "./FaqPage.css";
import Layout from "../components/layout/Layout.js";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import TierBenefits from "../components/profileTabs/TierBenefits.png";
import { Link } from "react-router-dom";

const FAQs = [
  {
    question: "How to use this POC?",
    answer: "Please watch this video for details: ",
  },
  {
    question: "How it works?",
    answer:
      "For every booking made by agent, we give him some reward point which he can later reddem of discount vochers etc. To motivate him to book more, we are classifying him as Silver, Gold, Platinum or Diamond tier agent - each tier having it's own exclusive benefits. We also show him his ranking in city, country and globally so as to create a healthy competition between agents",
  },
  {
    question: "What does a single Tier means?",
    answer: (
      <div>
        <p>Each Tier has it's own unique benefits. Same are described below</p>
        <img src={TierBenefits} style={{width: "100%"}}/>
      </div>
    ),
  },
  {
    question: "How can an agent earn points",
    answer: (
      <ul>He earns points on basis of amount of booking he's making
        <li>For every booking : 1% Reward Points</li>
        <li>For every 10th booking : 1% Extra Reward Points</li>
        <li>For every new city booking : 2% Extra Reward Points</li>
        <li>For every new country booking : 2% Extra Reward Points</li>
        <li>For more details, go to Earn More Section <Link to="/profile">here</Link></li>
      </ul>
    )
  },
  {
    question: "How much is a point worth",
    answer:
      "For sake of POC, we have considered 100 Reward Points = $1",
  },
  {
    question: "How can he redeem his points",
    answer:
      <div>For details go to Redeem Points Section <Link to="/profile">here</Link></div>,
  },
  {
    question: "Which technology did we use?",
    answer: (
      <ul>
        <h4>Below are the technologies used:</h4> <li>Frontend : ReactJS</li>{" "}
        <li>Backend : C3 (.NET8)</li> <li>Cloud: AWS</li>{" "}
      </ul>
    ),
  },
  {
    question: "What is our Git Repo",
    answer: (
      <ul>
        <h3>UI</h3>https://github.com/sukhijaa/voyage-hackathon-agent-gamification-ui 
        <h3>BE</h3>https://github.com/sukhijaa/voyage-hackathon-agent-gamification-backend 
      </ul>
    )
  }
];

const FUTURE_SCORE = [
  {
    question: "Booking Streaks",
    answer: "We had planned to create leaderboard based on his booking streaks and award him badges. For instance, if a user creates 1 booking every for 5 straight weeks, his streak would be of 5 Weeks. This way, we wanted to show a leaderboard of Agents with longest Booking Streaks based on Weeks, Fortnights and Months"
  },
  {
    question: "Referral Points",
    answer: "Referral is a big business driver for TBO. We intended to award 10000 Reward Points or $100 to Agent who brings on a new agent to the platform"
  },
  {
    question: "Badge Allocation",
    answer: "We had planned to giving badges to Agent for various milestones he achieve like New City Booking, 5 Unique Countries Booking etc. These badges can be shared on Social Media Platforms to drive awareness about TBO"
  }
];

function RenderOneSide({ items, title }) {
  return (
    <div className="faq-half-side">
      <h2>{title}</h2>
      {items.map((obj) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {obj.question}
            </AccordionSummary>
            <AccordionDetails>{obj.answer}</AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

function FaqPage() {
  return (
    <Layout title={"FAQs"}>
      <div className="faq-wrapper">
        <RenderOneSide items={FAQs} title={"What's covered in this POC"} />
        <RenderOneSide
          items={FUTURE_SCORE}
          title={"What all was in our scope"}
        />
      </div>
    </Layout>
  );
}

export default FaqPage;
