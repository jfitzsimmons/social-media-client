import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Route {...rest} render={(props) => (authenticated === true ? <Redirect to="/" /> : <Component {...props} />)} />
);
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

AuthRoute.propTypes = {
  user: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AuthRoute);
