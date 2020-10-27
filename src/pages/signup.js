import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../images/joe.jpg'
import { Link } from 'react-router-dom';

// Mui
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions'

const styles = (theme) => ({
//  ...theme
});

class signup extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {}
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({errors: nextProps.UI.errors});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const { classes, UI: {loading} } = this.props;
    const {errors} = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt='scream icon' className={classes.image}/>
          <Typography className={classes.pageTitle} variant="h2">Signup</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id="email" name="email" type="email" label="email" className={classes.textField}
              value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true : false} fullWidth />
            <TextField id="password" name="password" type="password" label="password" className={classes.textField}
                value={this.state.password} onChange={this.handleChange} helperText={errors.password} error={errors.password ? true : false} fullWidth />
            <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField}
              value={this.state.confirmPassword} onChange={this.handleChange} helperText={errors.confirmPassword} error={errors.password ? true : false} fullWidth />
            <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField}
              value={this.state.handle} onChange={this.handleChange} helperText={errors.handle} error={errors.handle ? true : false} fullWidth />

              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
              signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>Already have an account? <Link to="/login">login</Link></small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
