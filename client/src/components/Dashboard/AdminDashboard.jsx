import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExamImage from "../../images/exam_console.svg";
import {
    AddToQueue,
    CardMembership,
    Dashboard,
    Equalizer,
    ExitToApp,
    History,
    InsertChart,
    LiveTv,
    Visibility,
    VpnKey,
} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    menuImage: {
        width: 200,
        margin: theme.spacing(3, 2, 1, 2),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    brand: {
        marginBottom: theme.spacing(2),
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function AdminDashboard(props) {
    const { window } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <img
                    src={ExamImage}
                    alt="exam-console"
                    className={classes.menuImage}
                />
                <Typography
                    variant="h5"
                    align="center"
                    color="primary"
                    className={classes.brand}
                >
                    EXAMINATOR
                </Typography>
            </div>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <Dashboard color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AddToQueue color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Create an Exam" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Visibility color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="View Questions" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <History color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LiveTv color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Live Monitoring" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InsertChart color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Insert Marks" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Equalizer color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Results" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <CardMembership color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Publish Results" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <VpnKey color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Change Password" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ExitToApp color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
        </div>
    );
}

export default AdminDashboard;
