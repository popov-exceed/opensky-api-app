import React, { memo } from 'react';
// import b from 'b_';
// import InputField from './InputField';
import { useDispatch, useSelector } from 'react-redux';
import { authorizeAction } from '../../actions';
import { Alert, Button, Form, FormGroup } from 'react-bootstrap';
import './Login.sass';

const Login = () => {
  const container = 'login-container';

  const dispatch = useDispatch();

  const { appState, error } = useSelector((state) => state);

  const isAuthError = appState === 'authFailure';
  const isDisabled = appState === 'loading'

  const onSubmit = (event) => {
    dispatch(authorizeAction(event.target[1].value, event.target[2].value));
    event.preventDefault();
  };

  return (
    <div className={container}>
      <Alert variant={'danger'} show={isAuthError}>
        {error}
      </Alert>
      <Form onSubmit={onSubmit}>
        <fieldset disabled={isDisabled}>
          <FormGroup controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </FormGroup>
          <FormGroup controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </FormGroup>
          <div className="mt-4">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <a
              href="https://opensky-network.org/index.php?option=com_users&view=registration"
              rel="noreferrer"
              target="_blank"
            >
              <Button className="ml-3" variant="primary">
                Sign Up
              </Button>
            </a>
          </div>
        </fieldset>
      </Form>
    </div>
  );
};

export default memo(Login);
