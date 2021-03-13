import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import ResponsiveDrawer from './hoc/ResponsiveDrawer/ResponsiveDrawer'
import Home from './containers/Home/Home'
import Contact from './containers/Contact/Contact'
import Projects from './containers/Projects/Projects'
import Posts from './containers/Posts/Posts'
import AddPost from './containers/AddPost/AddPost'
import { Route, Switch } from 'react-router-dom';
import PageShell from './hoc/PageShell/PageShell'
//transition components
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';

class App extends Component {
  render() {
    return (
      <div>
        <Toolbar>PST</Toolbar>
        <ResponsiveDrawer>
          
            <Switch>
              <Route path="/projects" component={PageShell(Projects, Slide, 'left')} />
              <Route path="/contact" component={PageShell(Contact, Slide, 'left')} />
              <Route path="/Posts" component={PageShell(Posts, Slide, 'left')} />
              <Route path="/AddPost" component={PageShell(AddPost, Slide, 'left')} />
              <Route path="/" exact component={PageShell(Home, Slide, 'left')} />
            </Switch>
          
          
        </ResponsiveDrawer>
      </div>
      
    );
  }
}

export default App;
