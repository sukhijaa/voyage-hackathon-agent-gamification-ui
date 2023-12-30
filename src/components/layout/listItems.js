import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import PeopleIcon from '@mui/icons-material/QuestionAnswerSharp';
import BarChartIcon from '@mui/icons-material/PeopleAltSharp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Link} from "react-router-dom"

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
    <Link to="/faq">
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="How it Works?" />
    </ListItemButton>
    </Link>
    <Link to="/team">
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Team Details" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);
