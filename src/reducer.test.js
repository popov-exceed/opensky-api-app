import * as actions from './actions';
import { reducer, initialState } from './reducer';

describe('Reducer /UPDATE action', () => {
  it('Should handle UPDATE', () => {
    expect(reducer({ ...initialState, appState: 'test' }, actions.update())).toEqual({
      ...initialState,
      appState: 'idle',
    });
  });

  it('App State should be idle', () => {
    expect(reducer({ ...initialState, appState: 'test' }, actions.update()).appState).toEqual('idle');
  });

});

describe('Reducer /FETCH_FLIGHTS actions', () => {
  describe('/FETCH_FLIGHTS/PENDING', () => {
    it('Should handle /FETCH_FLIGHTS/PENDING action', () => {
      expect(
        reducer(
          {
            ...initialState,
            appState: 'test',
            error: 'test',
          },
          actions.fetchFlightsPending()
        )
      ).toEqual({
        ...initialState,
        appState: 'loading',
        error: null,
      });
    });

    it('Should change App State to loading', () => {
      expect(reducer(initialState, actions.fetchFlightsPending()).appState).toEqual('loading');
    });

    it('Should change error to null', () => {
      expect(reducer({ ...initialState, error: 'test' }, actions.fetchFlightsPending()).error).toBeNull();
    });
  });

  describe('/FETCH_FLIGHTS/SUCCESS', () => {
    it('Should handle /FETCH_FLIGHTS/SUCCESS action', () => {
      expect(reducer({ ...initialState }, actions.fetchFlightsSuccess(['test']))).toEqual({
        ...initialState,
        appState: 'success',
        flights: ['test'],
      });
    });

    it('Should change App state to success', () => {
      expect(reducer({ ...initialState }, actions.fetchFlightsSuccess(['test'])).appState).toEqual('success');
    });

    it('Should change flights to payload', () => {
      expect(
        reducer({ ...initialState, flights: ['shouldChange'] }, actions.fetchFlightsSuccess(['test'])).flights
      ).toEqual(['test']);
    });
  });

  describe('/FETCH_FLIGHTS/FAILURE', () => {
    it('Should handle /FETCH_FLIGHTS/FAILURE action', () => {
      expect(reducer(initialState, actions.fetchFlightsFailure({ message: 'test' }))).toEqual({
        ...initialState,
        error: 'test',
        appState: 'failure',
      });
    });

    it('Should change error to payload', () => {
      expect(reducer(initialState, actions.fetchFlightsFailure({ message: 'test' })).error).toEqual('test');
    });

    it('Should change app state to authFailure, if payload has 401 in message', () => {
      expect(reducer(initialState, actions.fetchFlightsFailure({ message: 'test401' })).appState).toEqual(
        'authFailure'
      );
    });

    it('Should change isAuthorized to false, if payload has 401 in message', () => {
      expect(
        reducer({ ...initialState, isAuthorized: true }, actions.fetchFlightsFailure({ message: 'test401' }))
          .isAuthorized
      ).toBeFalsy();
    });

    it("Should change app state to failure, if payload haven't 401 in message", () => {
      expect(reducer(initialState, actions.fetchFlightsFailure({ message: 'test' })).appState).toEqual('failure');
    });
  });
});

describe('Reducer /CHANGE_PAGE action', () => {
  it('Should handle /CHANGE_PAGE action', () => {
    expect(reducer(initialState, actions.changePage(123))).toEqual({
      ...initialState,
      page: 123,
    });
  });

  it('Should change page to payload', () => {
    expect(reducer(initialState, actions.changePage(123)).page).toEqual(123);
  });
});

describe('Reducer /LOGOUT action', () => {
  it('Should handle /LOGOUT', () => {
    expect(
      reducer({ ...initialState, isAuthorized: true, username: 'test', password: 'test' }, actions.logout())
    ).toEqual({
      ...initialState,
      isAuthorized: false,
      username: '',
      password: '',
    });
  });

  it('Should change isAuthorized to false', () => {
    expect(reducer({ ...initialState, isAuthorized: true }, actions.logout())).toEqual({
      ...initialState,
      isAuthorized: false,
    });
  });

  it('Should change username to empty string', () => {
    expect(reducer({ ...initialState, username: 'test' }, actions.logout()).username).toEqual('');
  });

  it('Should change password to empty string', () => {
    expect(reducer({ ...initialState, password: 'test' }, actions.logout()).password).toEqual('');
  });
});

describe('Reducer /AUTHORIZE actions', () => {

  describe('/AUTHORIZE/PENDING action', () => {
    it('Should change App State to loading', () => {
      expect(reducer(initialState, actions.authorizePending()).appState).toEqual('loading');
    });

    it('Should change error to null', () => {
      expect(reducer({ ...initialState, error: 'test' }, actions.authorizePending()).error).toBeNull();
    });

    it('Should handle /AUTHORIZE/PENDING action', () => {
      expect(
        reducer(
          {
            ...initialState,
            appState: 'test',
            error: 'test',
          },
          actions.authorizePending()
        )
      ).toEqual({
        ...initialState,
        appState: 'loading',
        error: null,
      });
    });

  });

  describe('/AUTHORIZE/SUCCESS action', () => {
    it('Should handle success action', () => {
      expect(
        reducer({ ...initialState, appState: 'test' }, actions.authorizeSuccess({ username: 'test', password: 'test' }))
      ).toEqual({ ...initialState, appState: 'idle', isAuthorized: true, username: 'test', password: 'test' });
    });
    it('Should change isAuthorized to true', () => {
      expect(reducer({ ...initialState }, actions.authorizeSuccess({})).isAuthorized).toBeTruthy();
    });
    it('Should change appState to idle', () => {
      expect(reducer({ ...initialState, appState: 'test' }, actions.authorizeSuccess({})).appState).toEqual('idle');
    });
    it('Should change username field to username in payload', () => {
      expect(
        reducer(initialState, actions.authorizeSuccess({ username: 'test' })).username
      ).toEqual('test');
    });
    it('Should change password field to password in payload', () => {
      expect(
        reducer(initialState, actions.authorizeSuccess({ password: 'test' })).password
      ).toEqual('test');
    })
  });
  describe('/AUTHORIZE/FAILURE', () => {
    it('Should handle /AUTHORIZE/FAILURE action', () => {
      expect(reducer(initialState, actions.authorizeFailure({ message: 'test' }))).toEqual({
        ...initialState,
        error: 'test',
        appState: 'failure',
      });
    });
    it('Should change error to payload', () => {
      expect(reducer(initialState, actions.authorizeFailure({ message: 'test' })).error).toEqual('test');
    });
    it('Should change app state to authFailure, if payload has 401 in message', () => {
      expect(reducer(initialState, actions.authorizeFailure({ message: 'test401' })).appState).toEqual(
        'authFailure'
      );
    });
    it('Should change isAuthorized to false, if payload has 401 in message', () => {
      expect(
        reducer({ ...initialState, isAuthorized: true }, actions.authorizeFailure({ message: 'test401' }))
          .isAuthorized
      ).toBeFalsy();
    });
    it("Should change app state to failure, if payload haven't 401 in message", () => {
      expect(reducer(initialState, actions.authorizeFailure({ message: 'test' })).appState).toEqual('failure');
    });
  });
});
