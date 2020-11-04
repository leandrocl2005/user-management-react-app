import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import People from '../pages/People';
import Profile from '../pages/Profile';
import Route from './route';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Reception from '../pages/Reception';
import HomeServices from '../pages/HomeServices';
import ProfessionalServices from '../pages/ProfessionalServices';
import Reports from '../pages/Reports';
import PeopleUpdate from '../pages/PeopleUpdate';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/people" exact component={People} isPrivate />
    <Route path="/reception" component={Reception} isPrivate />
    <Route path="/people/:id" component={PeopleUpdate} isPrivate />
    <Route path="/home-services" component={HomeServices} isPrivate />
    <Route
      path="/professional-services"
      component={ProfessionalServices}
      isPrivate
    />
    <Route path="/reports" component={Reports} isPrivate />
  </Switch>
);

export default Routes;
