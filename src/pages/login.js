import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Mui
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// redux
import { connect } from 'react-redux';
import AppIcon from '../images/joe.jpg';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  // ...theme
});

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const {
    classes,
    UI: { loading },
  } = props;
  // const { errors } = state;

  useEffect(() => {
    // const {UI} = props;
    setErrors(props.UI.errors);
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };
    props.loginUser(userData, props.history);
  };

  const handleChange = (event) => {
    [event.target.name](event.target.value);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="scream icon" className={classes.image} />
        <Typography className={classes.pageTitle} variant="h2">
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="email"
            className={classes.textField}
            value={email}
            onChange={handleChange}
            helperText={errors.email}
            error={!!errors.email}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            className={classes.textField}
            value={password}
            onChange={handleChange}
            helperText={errors.password}
            error={!!errors.password}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
            login
            {loading && <CircularProgress size={30} className={classes.progress} />}
          </Button>
          <br />
          <small>
            don't have an account? <Link to="/signup">sign up</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = { loginUser };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
