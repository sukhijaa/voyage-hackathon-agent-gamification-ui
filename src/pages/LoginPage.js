import "./LoginPage.css";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgentList, setSelectedAgent } from "../store/thunks";
import { Button, Card } from "@mui/material";
import moment from "moment"
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigat = useNavigate()
  useEffect(() => {
    dispatch(fetchAgentList());
  }, []);
  const agentList = useSelector((state) => state.agentReducer.agentList || []);
  const handleLogin = (agent) => {
    dispatch(setSelectedAgent(agent, true)).then(() => {
      navigat("/profile")
    })
  }
  return (
    <Layout title={"Login"}>
      <div className="login-page-wrapper">
        <h3>Login Using Any Agent To Unveil Login Reward</h3>
        {agentList.map((agent) => {
          return (
            <Card elevation={3} className="login-page-agent-item-wrapper">
              <>
                <div className="login-page-agent-item-name">
                  {agent.agentName}
                </div>
                <div className="login-page-agent-item-last-login">
                  <b>Last Login</b> {moment(agent.lastLoginTime, "YYYY-MM-DDThh:mm:ssZ").fromNow()}
                </div>
                <Button onClick={() => handleLogin(agent)}>Login</Button>
              </>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
}

export default LoginPage;
