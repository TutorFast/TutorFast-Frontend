import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { RouteTransition } from 'react-router-transition';

import HomeView from '~/components/HomeView';
import Menubar from '~/components/Menubar';
import SignUp from '~/components/SignUp';
import SignIn from '~/components/SignIn';
import UserView from '~/components/UserView';
import NoMatch from '~/components/NoMatch';
import TutorSearchView from '~/components/TutorSearchView';
import CreateAppointmentView from '~/components/CreateAppointmentView';

import PrivateRoute from './PrivateRoute';

export default () =>
  <div>
    <Menubar />
    <Route render={({ location }) =>
      <RouteTransition
        pathname={location.pathname.split('/').slice(0, 2).join('/')}
        style={{ position: 'absolute', left: 0, right: 0 }}
        atEnter={{ translateX: 100 }}
        atLeave={{ translateX: -100 }}
        atActive={{ translateX: 0 }}
        mapStyles={styles => ({
          position: 'absolute',
          top: '0',
          width: '100%',
          transform: `translateX(${styles.translateX}%)`,
        })} >
        <Switch key={location.key} location={location}>
          <Route exact path='/' component={HomeView} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/sign-in' component={SignIn} />
          <Route path="/create-appointment/:tutor" component={CreateAppointmentView} />
          <Route path='/search' render={
            () => <TutorSearchView maxSliderWage={50} minSliderWage={0} />
          } />
          <PrivateRoute path='/user' component={UserView} />
          <Route component={NoMatch}/>
        </Switch>
      </RouteTransition>} />
  </div>
;
