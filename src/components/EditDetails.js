/* eslint-disable no-console */
import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import { editUserDetails } from '../redux/actions/userActions';

const styles = {};

function EditDetails(props) {
  const { classes, credentials } = props;
  const [open, setOpen] = useState(false);
  const [localCredentials, setLocalCredentials] = useState({
    bio: '',
    website: '',
    location: '',
  });
  const [inputs, setInputs] = useState({
    ...credentials,
  });

  const mapUserDetailsToState = (c) => {
    setLocalCredentials({
      bio: c.bio ? c.bio : '',
      website: c.website ? c.website : '',
      location: c.location ? c.location : '',
    });
  };
  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(props.credentials);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, []);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    const userDetails = {
      bio: inputs.bio,
      website: inputs.website,
      location: inputs.location,
    };
    props.editUserDetails(userDetails);
    handleClose();
  };

  return (
    <>
      <Button tip="Edit Details" onClick={handleOpen} className={classes.button}>
        <EditIcon color="primary" />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={inputs.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={inputs.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={inputs.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
