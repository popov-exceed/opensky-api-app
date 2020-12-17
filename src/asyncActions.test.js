import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { initialState } from './reducer';
import { api, fetchFlights } from './api';
import {
  fetchFlightsAction,
  fetchFlightsFailure,
  fetchFlightsSuccess,
  fetchFlightsPending,
  authorizeAction,
  authorizePending,
  authorizeFailure,
  authorizeSuccess,
} from './actions';

const mockApi = new MockAdapter(api);
const mockStore = configureStore([thunk]);

const mockUser = {
  username: 'test',
  password: 'test',
}

const mockApiFlights = [
  {
    icao24: '84630c',
    firstSeen: 1517229441,
    estDepartureAirport: null,
    lastSeen: 1517230681,
    estArrivalAirport: null,
    callsign: 'JJP120  ',
    estDepartureAirportHorizDistance: null,
    estDepartureAirportVertDistance: null,
    estArrivalAirportHorizDistance: null,
    estArrivalAirportVertDistance: null,
    departureAirportCandidatesCount: 0,
    arrivalAirportCandidatesCount: 0,
  },
  {
    icao24: '800547',
    firstSeen: 1517227477,
    estDepartureAirport: 'VGTJ',
    lastSeen: 1517228618,
    estArrivalAirport: null,
    callsign: 'JAI273  ',
    estDepartureAirportHorizDistance: 6958,
    estDepartureAirportVertDistance: 655,
    estArrivalAirportHorizDistance: null,
    estArrivalAirportVertDistance: null,
    departureAirportCandidatesCount: 1,
    arrivalAirportCandidatesCount: 0,
  },
  {
    icao24: 'a403ca',
    firstSeen: 1517228212,
    estDepartureAirport: null,
    lastSeen: 1517229651,
    estArrivalAirport: null,
    callsign: null,
    estDepartureAirportHorizDistance: null,
    estDepartureAirportVertDistance: null,
    estArrivalAirportHorizDistance: null,
    estArrivalAirportVertDistance: null,
    departureAirportCandidatesCount: 0,
    arrivalAirportCandidatesCount: 0,
  },
];

const mockTransformedFlights = mockApiFlights.map((flight, index) => {
  return {
    id: index + 1,
    airport: flight.estDepartureAirport || 'Unknown',
    time: flight.lastSeen,
    departing: flight.departureAirportCandidatesCount || 0,
    arriving: flight.arrivalAirportCandidatesCount || 0,
  };
});

afterEach(() => {
  mockApi.reset();
});

describe('Axios api tests', () => {
  it('Should transform received data', async () => {
    mockApi.onGet('/flights/all').reply(200, mockApiFlights);
    const flights = await fetchFlights('test', 'test');
    expect(flights).toEqual(mockTransformedFlights);
  });
});

describe('FETCH_FLIGHTS action tests', () => {
  it('Should dispatch pending and success actions on success', async () => {
    mockApi.onGet('/flights/all').reply(200, []);
    const store = mockStore(initialState);
    await store.dispatch(fetchFlightsAction());
    const expectedActions = [fetchFlightsPending(), fetchFlightsSuccess([])];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should dispatch pending and failure actions on failure', async () => {
    mockApi.onGet('/flights/all').networkError();
    const store = mockStore(initialState);
    await store.dispatch(fetchFlightsAction());
    const expectedActions = [fetchFlightsPending(), fetchFlightsFailure(new Error('Network Error'))];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should dispatch success action with valid payload', async () => {
    mockApi.onGet('/flights/all').reply(200, mockApiFlights);
    const store = mockStore(initialState);
    await store.dispatch(fetchFlightsAction());
    const expectedActions = [fetchFlightsPending(), fetchFlightsSuccess(mockTransformedFlights)];
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('AUTHORIZE action tests', () => {
  it('Should dispatch pending and success actions on success', async () => {
    mockApi.onGet('/flights/all').reply(200, []);
    const store = mockStore(initialState);
    await store.dispatch(authorizeAction(mockUser.username, mockUser.password));
    const expectedActions = [authorizePending(), authorizeSuccess(mockUser)];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should dispatch pending and failure actions on failure', async () => {
    mockApi.onGet('/flights/all').networkError();
    const store = mockStore(initialState);
    await store.dispatch(authorizeAction('test', 'test'));
    const expectedActions = [authorizePending(), authorizeFailure(new Error('Network Error'))];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should dispatch success action on 404 error code', async () => {
    mockApi.onGet('/flights/all').reply(404);
    const store = mockStore(initialState);
    await store.dispatch(authorizeAction(mockUser.username, mockUser.password));
    const expectedActions = [authorizePending(), authorizeSuccess(mockUser)];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
