import React from 'react';
import { Switch, Route } from 'react-router';
import { RouteTransition } from 'react-router-transition';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Menubar from '~/components/Menubar';
import SignUp from '~/components/SignUp';
import SignIn from '~/components/SignIn';
import UserView from '~/components/UserView';
import NoMatch from '~/components/NoMatch';
import TutorSearchView from '~/components/TutorSearchView';
import TutorAppointmentListView from '~/components/TutorAppointmentListView';
import HomeView from '~/components/HomeView';
import AppointmentView from '~/components/AppointmentView';

import PrivateRoute from './PrivateRoute';


export default () =>
  <div>
    <Menubar />
    <ToastContainer
      position='top-right'
      type='default'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover />

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
          <Route exact path='/appointment/tutor' component={TutorAppointmentListView} /> 
          <PrivateRoute path='/appointment/:appointmentId' component={AppointmentView} />
          <Route path='/search' render={
            () => <TutorSearchView maxSliderWage={50} minSliderWage={0} />
          } />
          <PrivateRoute path='/user' component={UserView} />
          <Route component={NoMatch}/>
        </Switch>
      </RouteTransition>} />
  </div>
;
