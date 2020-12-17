import React from 'react';
import {useSelector} from "react-redux";
import {Row} from "react-bootstrap";

const ErrorBoundary = (props) => {

  const { appState, error } = useSelector(state => state);
  const isError = appState === 'failure';

  const errorComponent =
    <Row className='justify-content-center'>
      <h1>{error}</h1>
    </Row>

  return isError ? errorComponent : props.children;
}

export default ErrorBoundary;
