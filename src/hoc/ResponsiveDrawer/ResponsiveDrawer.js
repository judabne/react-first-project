import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
//end icons
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HidingLogic from '../HidingLogic/HidingLogic'
import {NavLink} from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const links = [
    {
        to: '/',
        name: 'Home',
        icon: HomeIcon
    },
    {
        to: '/projects',
        name: 'Projects',
        icon: AccountTreeIcon
    },
    {
      to: '/addpost',
      name: 'Add Post',
      icon: CreateIcon
    },
    {
        to: '/posts',
        name: 'Posts',
        icon: AllInboxIcon
    },
    {
        to: '/contact',
        name: 'Contact Us',
        icon: ContactMailIcon
    }
]

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  var Ico = ""
  console.log(links);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          {links.map((link, index) =>(
            <ListItem button key={index} component={NavLink} to={link.to} activeClassName="Mui-selected" exact>
                <HidingLogic>{Ico = link.icon}</HidingLogic>
                {console.log("Ico: " + Ico)}
                <ListItemIcon><Ico /></ListItemIcon>
                <ListItemText primary={link.name} />
            </ListItem>           
          ))}
      </List>
      <Divider />
      {/* trying to open in a new tab - rel="noopener noreferrer" is to solve security risk of _blank*/}
      <ListItem button component="a" href = "http://www.cadillac.com" target = "_blank" rel = "noopener noreferrer" activeClassName="Mui-selected" exact>
          <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
          <ListItemText primary="Cadillac" />
      </ListItem>   
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
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
            Hello World
          </Typography>
        </Toolbar>
        
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
          {props.children}
      </main>
    </div>
  );
}


export default ResponsiveDrawer;