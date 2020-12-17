import React, { useEffect } from 'react';
import { fetchFlightsAction } from '../../actions';
import ItemsList from '../../Components/ItemsList';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../Components/Login';

const Dashboard = () => {
  const { isAuthorized, appState, flights } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthorized && appState === 'idle') {
      dispatch(fetchFlightsAction());
    }
  }, [dispatch, isAuthorized, appState]);

  return isAuthorized ? <ItemsList flights={flights} /> : <Login />;
};

export default Dashboard;
