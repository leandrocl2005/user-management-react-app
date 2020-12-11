import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './route';

import Notifications from '../pages/Notifications';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import CheckInList from '../pages/CheckIn/CheckinList';
import HomeServices from '../pages/HomeServices';
import Reports from '../pages/Reports';

import PersonList from '../pages/Person/PersonList';
import PersonCreate from '../pages/Person/PersonCreate';
import PersonUpdate from '../pages/Person/PersonUpdate';
import ProfessionalServicesList from '../pages/ProfessionalServices/ProfessionalServicesList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/create-people" exact component={PersonCreate} isPrivate />
    <Route path="/people/:id" component={PersonUpdate} isPrivate />
    <Route path="/people" component={PersonList} isPrivate />

    <Route path="/checkins" exact component={CheckInList} isPrivate />

    <Route
      path="/professional-services"
      exact
      component={ProfessionalServicesList}
      isPrivate
    />

    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/notifications" component={Notifications} isPrivate />

    <Route path="/home-services" component={HomeServices} isPrivate />

    <Route path="/reports" component={Reports} isPrivate />
  </Switch>
);

export default Routes;
