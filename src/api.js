import axios from 'axios';
import { HOUR, TEST_TIMESTAMP } from './constants';

export const api = axios.create({
  responseType: 'json',
  baseURL: 'https://opensky-network.org/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authorize = async (username, password) => {
  await getAllflights(
    username,
    password,
    TEST_TIMESTAMP,
    TEST_TIMESTAMP
  );
};

const getAllflights = async (username, password, begin, end) => {
  return api.get(`/flights/all`, {
    params: {
      begin,
      end,
    },
    auth: {
      username,
      password,
    },
  });
};

export const fetchFlights = async (username, password) => {
  const timeNow = Date.now() / 1000;
  // const flightResponse = await api.get(
  //   `/flights/all`, {
  //     header: {
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     params: {
  //       begin: Math.round(timeNow - 14*HOUR),
  //       end: Math.round(timeNow - 12*HOUR)
  //     },
  //     auth: {
  //       username,
  //       password
  //     }
  //   }
  // );
  const flightResponse = await getAllflights(
    username,
    password,
    Math.round(timeNow - 27 * HOUR),
    Math.round(timeNow - 25 * HOUR)
  );
  return flightResponse.data.map((flight, index) => {
    return {
      id: index + 1,
      airport: flight.estDepartureAirport || 'Unknown',
      time: flight.lastSeen,
      departing: flight.departureAirportCandidatesCount || 0,
      arriving: flight.arrivalAirportCandidatesCount || 0,
    };
  });
};
