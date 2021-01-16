import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './route';

import Notifications from '../pages/Notifications';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Reports from '../pages/Reports';

import PersonList from '../pages/Person/PersonList';
import PersonCreate from '../pages/Person/PersonCreate';
import PersonUpdate from '../pages/Person/PersonUpdate';

import HomeServicesList from '../pages/HomeServices/HomeServicesList';
import CheckInList from '../pages/CheckIn/CheckinList';
import CheckInCreate from '../pages/CheckIn/CheckinCreate';

import ProfessionalServicesList from '../pages/ProfessionalServices/ProfessionalServicesList';
import ProfessionalServicesUpdate from '../pages/ProfessionalServices/ProfessionalServicesUpdate';
import ProfessionalServicesCreate from '../pages/ProfessionalServices/ProfessionalServicesCreate';
import HomeServicesCreate from '../pages/HomeServices/HomeServicesCreate';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route
      path="/create-people"
      exact={true}
      component={PersonCreate}
      isPrivate
    />
    <Route path="/people/:id" exact component={PersonUpdate} isPrivate />
    <Route path="/people" exact component={PersonList} isPrivate />

    <Route path="/create-checkin" exact component={CheckInCreate} isPrivate />
    <Route path="/checkins" exact component={CheckInList} isPrivate />

    <Route
      path="/create-professional-services"
      exact
      component={ProfessionalServicesCreate}
      isPrivate
    />
    <Route
      path="/professional-services/:id"
      exact
      component={ProfessionalServicesUpdate}
      isPrivate
    />
    <Route
      path="/professional-services"
      exact
      component={ProfessionalServicesList}
      isPrivate
    />

    <Route path="/notifications" component={Notifications} isPrivate />

    <Route
      path="/create-home-services"
      exact
      component={HomeServicesCreate}
      isPrivate
    />
    <Route path="/home-services" component={HomeServicesList} isPrivate />

    <Route path="/reports" component={Reports} isPrivate />
  </Switch>
);

export default Routes;
