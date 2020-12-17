import { createAction } from '@reduxjs/toolkit';
import { authorize, fetchFlights } from './api';

export const fetchFlightsPending = createAction('FETCH_FLIGHTS/PENDING');
export const fetchFlightsSuccess = createAction('FETCH_FLIGHTS/SUCCESS');
export const fetchFlightsFailure = createAction('FETCH_FLIGHTS/FAILURE');

export const authorizePending = createAction('AUTHORIZE/PENDING');
export const authorizeFailure = createAction('AUTHORIZE/FAILURE');
export const authorizeSuccess = createAction('AUTHORIZE/SUCCESS');

export const changePage = createAction('CHANGE_PAGE');
export const update = createAction('UPDATE');

export const logout = createAction('LOGOUT')

export const authorizeAction = (username, password) => async (dispatch) => {
  try {
    dispatch(authorizePending());
    await authorize(username, password);
    dispatch(authorizeSuccess({username, password}));
  } catch (e) {
    if (e.message.endsWith('404')) {
      dispatch(authorizeSuccess({username, password}));
    } else {
      dispatch(authorizeFailure(e));
    }
  }
};

export const fetchFlightsAction = () => async (dispatch, getState) => {
  try {
    dispatch(fetchFlightsPending());
    const { username, password } = getState();
    const flights = await fetchFlights(username, password);
    dispatch(fetchFlightsSuccess(flights));
  } catch (e) {
    dispatch(fetchFlightsFailure(e));
  }
};
