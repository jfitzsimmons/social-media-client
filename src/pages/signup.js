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
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  //  ...theme
});

function Signup(props) {
  const {
    classes,
    UI: { loading },
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [errors, setErrors] = useState({});
  const [loadingLocal, setLoadingLocal] = useState(loading);

  useEffect(() => {
    setErrors(props.UI.errors);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoadingLocal(true);
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    props.signupUser(newUserData, props.history);
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
          Signup
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={confirmPassword}
            onChange={handleChange}
            helperText={errors.confirmPassword}
            error={!!errors.password}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            value={handle}
            onChange={handleChange}
            helperText={errors.handle}
            error={!!errors.handle}
            fullWidth
          />

          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loadingLocal}>
            signup
            {loading && <CircularProgress size={30} className={classes.progress} />}
          </Button>
          <br />
          <small>
            Already have an account? <Link to="/login">login</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup));
