import './TeamDetails.css';
import Layout from '../components/layout/Layout.js'
import { Button, Card } from '@mui/material';
import { Person } from '@mui/icons-material';

const TEAM_DETAILS = {
  name: "Tech Invaders",
  members: [
    {
      name: "Ashok Sharma",
      email: "ashok8670@gmail.com"
    },
    {
      name: "Abhishek Sukhija",
      email: "abhisukhija@ymail.com"
    },
    {
      name: "Ajay Singh",
      email: "ajayroperia@gmail.com"
    },
    {
      name: "Yatin Mahajan",
      email: "yatin428.ym@gmail.com"
    },
    {
      name: "Vinay Kumar",
      email: "vinayku683@gmail.com"
    }
  ]
}

function TeamDetails() {
  return (
    <Layout title={"Team Details"}>
      <div className='team-details-wrapper'>
        <h1>{TEAM_DETAILS.name}</h1>
        {
          TEAM_DETAILS.members.map(member => {
            return (
            <Card elevation={3} className='team-member-wrapper'>
              <Person className='member-icon'/>
                <p className='member-name'>
                  {member.name}
                </p>
                <p className='member-email'>
                  {member.email}
                </p>
            </Card>
            )
          })
        }
      </div>
    </Layout>
  );
}

export default TeamDetails;
