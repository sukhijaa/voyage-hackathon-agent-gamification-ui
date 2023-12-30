import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuestionAnswerSharp from '@mui/icons-material/QuestionAnswerSharp';
import PeopleAltSharp from '@mui/icons-material/PeopleAltSharp';
import {Link} from "react-router-dom"
import { Person } from '@mui/icons-material';

export const mainListItems = (
  <React.Fragment>
    <Link to="/">
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    </Link>
    <Link to="/profile">
    <ListItemButton>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    </Link>
    <Link to="/faq">
    <ListItemButton>
      <ListItemIcon>
        <QuestionAnswerSharp />
      </ListItemIcon>
      <ListItemText primary="How it Works?" />
    </ListItemButton>
    </Link>
    <Link to="/team">
    <ListItemButton>
      <ListItemIcon>
        <PeopleAltSharp />
      </ListItemIcon>
      <ListItemText primary="Team Details" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);
