import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import classes from './Toolbar.css';


const toolbar = (props) => (
    <div>
    <header className={classes.Toolbar}>
        Heyo
    </header>
    <Drawer> HELLO </Drawer>
  </div>
);

export default toolbar;