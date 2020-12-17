import { createReducer } from '@reduxjs/toolkit';
import {
  authorizeSuccess,
  changePage,
  fetchFlightsSuccess, logout,
  update
} from './actions';

export const initialState = {
  isAuthorized: false,
  username: '',
  password: '',
  appState: 'idle',
  flights: [],
  page: 0,
  error: null,
};

const isPendingAction = (action) => {
  return action.type.endsWith('/PENDING');
};

const isFailureAction = (action) => {
  return action.type.endsWith('/FAILURE');
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state) => {
      state.appState = 'idle';
    })
    .addCase(logout, state => {
      state.isAuthorized = false;
      state.username = '';
      state.password = '';
    })
    .addCase(authorizeSuccess, (state, action) => {
      state.isAuthorized = true;
      state.appState = 'idle';
      state.username = action.payload.username;
      state.password = action.payload.password;
    })
    .addCase(fetchFlightsSuccess, (state, action) => {
      state.appState = 'success';
      state.flights = action.payload;
    })
    .addCase(changePage, (state, action) => {
      state.page = action.payload;
    })
    .addMatcher(isPendingAction, (state => {
      state.appState = 'loading';
      state.error = null;
    }))
    .addMatcher(isFailureAction, ((state, action) => {
      if (action.payload.message.includes('401')) {
        state.appState = 'authFailure';
        state.isAuthorized = false;
        state.error = 'Username or password are not valid';
      } else {
        state.appState = 'failure';
        state.error = action.payload.message;
      }
    }));
});
