import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Cookies from "js-cookie";
import "./MenuAppBar.css";
import { gapi } from "gapi-script";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function onLogout() {
    Cookies.remove("email");
    Cookies.remove("user");
    googleSignOut();
    setAnchorEl(null);
    props.setRefresh(prev => prev + 1);
  }

  function googleSignOut() {
    if (gapi.auth2) {
      var GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.signOut().then(() => {
        console.log("User signed out.");
      });
    }
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          {props.auth.user && (
            <Typography variant="h6" className={classes.title}>
              Welcome, {props.auth.user}!
            </Typography>
          )}
          {!props.auth.email && (
            <Typography
              style={{ textAlign: "right" }}
              variant="h6"
              className={classes.title}
            >
              Please Sign In
            </Typography>
          )}
          {props.auth.email && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography variant="h6" className={classes.title}>
                  {props.auth.email}
                </Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
