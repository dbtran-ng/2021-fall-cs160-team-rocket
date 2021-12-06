import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import About from "./components/layout/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { LOGOUT } from "./actions/types";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/profile-form/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import Profile from "./components/profile/Profile";
import ProfileById from "./components/profile/ProfileById";
import Profiles from "./components/profile/Profiles";
import AddEvent from "./components/event-form/AddEvent";
import EditEvent from "./components/event-form/EditEvent";
import EventManage from "./components/event/EventManage";
import Events from "./components/event/Events";
import EventById from "./components/event/EventById";
import EventByMe from "./components/event/EventByMe";
import Groups from "./components/group/Groups";
import AddGroup from "./components/group-form/AddGroup";
import EditGroup from "./components/group-form/EditGroup";
import GroupById from "./components/group/GroupById";
import GroupManage from "./components/group/GroupManage";
import GroupByMe from "./components/group/GroupByMe";

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
    window.addEventListener("storage", () => {
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
            <PrivateRoute exact path="/edit-event/:id" component={EditEvent} />
            <PrivateRoute exact path='/event/:id' component={EventById} />
            <PrivateRoute exact path='/manage-event' component={EventManage} />
            <PrivateRoute exact path='/manage-event/:id' component={EventByMe} />
            <PrivateRoute exact path="/group" component={Groups} />
            <PrivateRoute exact path="/create-group" component={AddGroup} />
            <PrivateRoute exact path="/edit-group/:id" component={EditGroup} />
            <PrivateRoute exact path="/group/:id" component={GroupById} />
            <PrivateRoute exact path='/manage-group' component={GroupManage} />
            <PrivateRoute exact path='/manage-group/:id' component={GroupByMe} />
          </Switch>
        </section>
      </Fragment>  
    </Router>
  </Provider>
  )
};

export default App;
