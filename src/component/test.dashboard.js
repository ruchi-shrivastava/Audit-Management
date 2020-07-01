import React, { useState } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
// import { useAuthState } from '../contexts/AuthContext';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import UserView from './UserView'
import Add from './Add'

import {MenuItem, MenuList, ListItemIcon, ListItemText
        , Drawer, ListItem, List, Divider, CssBaseline
        , Paper, IconButton, Typography, AppBar, Toolbar
        , Button, Input } from '@material-ui/core';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      fontSize: "16px",
      color: "#fff",
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },

    title: {
        flexGrow: 1,
        fontSize: "18px",
    },
    LinkBar: {

    },
    SideBarFont: {
        fontSize: "14px",
    },
}));


export default function Dashboard(props) {
    const classes = useStyles();
    const theme = useTheme();
    // const { setUser } = useAuthState();
    const [open, setOpen] = React.useState(false);
    const [component,setComponent] = React.useState('user')

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar 
                className={classes.appBar}
                position="fixed"
            >
                <Toolbar>
                    <Typography variant="h6" className={classes.title} noWrap>
                        Dashboard
                    </Typography>

                    <Button color="inherit">Logout</Button>

                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
                >
                <div className={classes.toolbar} />
                <Divider />

                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>

                        <ListItemText disableTypography className={classes.SideBarFont} primary="User" />
                    </ListItem>
                    <ListItem button onClick={()=>setComponent('acount')}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>

                        <ListItemText disableTypography className={classes.SideBarFont}  primary="Account" />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>

                        <ListItemText disableTypography className={classes.SideBarFont}  primary="Customer Support" />
                    </ListItem>

                    <ListItem component={Link} to="/inventory" button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>

                        <ListItemText disableTypography className={classes.SideBarFont}  primary="Inventory" />
                    </ListItem>
                </List>

            </Drawer>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    component === 'user' ? <UserView /> : component === 'add'
                }
                <h1>Hello</h1>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                </Typography>

            </main>           

        </div>
    );
}