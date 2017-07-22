import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { StripeProvider } from 'react-stripe-elements';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import * as _reducers from '~/reducers';
import { STRIPE_PUBLISHABLE_KEY } from '~/config';


// Creates an object that is spreak into the Context component.
// defaults to empty HashHistory and using this projects reducers.
export const createContextConfig = (
  { history = createHistory(), reducers = _reducers, initialState = {} } :
  { history: {}, reducers: {}, initialState: {} } = {}
) => (
  {
    store: createStore(
      combineReducers({
        ...reducers,
        router: routerReducer,
      }),
      initialState,
      applyMiddleware(routerMiddleware(history)),
    ),
    history,
  }
);

// A component that captures all the context providing
// HOCs.  This can be used in testing to provide simulated
// context in one convenient place.
export default (
  { children, store, history } :
  { children: {}, store: {}, history: {} }
) =>
  <Provider store={store} >
    <StripeProvider apiKey={STRIPE_PUBLISHABLE_KEY}>
      <ConnectedRouter history={history}>
        {children}
      </ConnectedRouter>
    </StripeProvider>
  </Provider>
;
