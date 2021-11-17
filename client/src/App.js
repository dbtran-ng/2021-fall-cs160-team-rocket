import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import About from "./components/layout/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/profile-form/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import Profile from "./components/profile/Profile";
import Profiles from './components/profile/Profiles';
import AddEvent from "./components/event-form/AddEvent";
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
            <PrivateRoute exact path ='/profile' component={Profile}/>
            <PrivateRoute exact path ='/profiles' component={Profiles}/>
            <PrivateRoute exact path ='/add-event' component={AddEvent}/>
          </Switch>
        </section>
      </Fragment>  
    </Router>
  </Provider>
  )
};

export default App;
