import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "./listItems";
import Header from "./Header";
import "./Layout.css";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import TierBenefitsImg from "../profileTabs/TierBenefits.png"

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

var WIDTH = 500;
var HEIGHT = 500;
export default function Layout(props) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const ref = React.useRef();
  const showConfetti = useSelector((state) => state.global.showConfetti);
  const pageContentBox = ref.current
    ? ref.current.getBoundingClientRect()
    : null;
  if (pageContentBox && pageContentBox.width > WIDTH) {
    WIDTH = pageContentBox.width;
    HEIGHT = pageContentBox.HEIGHT;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header {...props} open={open} toggleDrawer={toggleDrawer} />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <div className="page-conents" ref={ref}>
          {showConfetti ? (
            <div className="confetti-wrapper" style={{height: HEIGHT, width: WIDTH}}>
              <Confetti width={WIDTH} height={HEIGHT} recycle={true} />
              <div className="confetti-message">{showConfetti}</div>
              <div className="confetti-image">
                <img src={TierBenefitsImg} style={{ width: "80%" }} />
              </div>
            </div>
          ) : null}
          {props.children}
        </div>
      </Box>
    </ThemeProvider>
  );
}
