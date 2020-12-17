import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Loading = (props) => {
  const isLoading = useSelector((state) => state.appState) === 'loading';

  return (
    <>
      {isLoading ? <ProgressBar srOnly={!isLoading} animated now={100} /> : null}
      {props.children}
    </>
  );
};

export default Loading;
