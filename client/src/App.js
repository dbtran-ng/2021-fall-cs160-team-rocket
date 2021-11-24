import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import About from "./components/layout/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { LOGOUT } from './actions/types';
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/profile-form/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import Profile from "./components/profile/Profile";
import ProfileById from "./components/profile/ProfileById";
import Profiles from './components/profile/Profiles';
import AddEvent from "./components/event-form/AddEvent";
import Events from "./components/event/Events";
import EventById from "./components/event/EventById";
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path = "/" component ={Landing} />
        <section>
          <Alert/>
          <Switch>
            <Route exect path="/about-us" component={About} />
            <Route exact path ='/register' component={Register}/>
            <Route exact path ='/login' component={Login}/>
            <PrivateRoute exact path ='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path ='/create-profile' component={CreateProfile}/>
            <PrivateRoute exact path ='/edit-profile' component={EditProfile}/>
            <PrivateRoute exact path='/profile/:id' component={ProfileById} />
            <PrivateRoute exact path ='/profile' component={Profile}/>
            <PrivateRoute exact path ='/profiles' component={Profiles}/>
            <PrivateRoute exact path ='/event' component={Events}/>
            <PrivateRoute exact path ='/add-event' component={AddEvent}/>
            <PrivateRoute exact path='/event/:id' component={EventById} />
          </Switch>
        </section>
      </Fragment>  
    </Router>
  </Provider>
  )
};

export default App;
