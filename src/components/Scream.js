import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import AppBar from '@material-ui/core/AppBar';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    width: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.image} image={userImage} title="Profile Image" />
        <CardContent className={classes.content}>
          <Typography color="primary" variant="h5" component={Link} to={`/users/${userHandle}`}>
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {body}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Scream);
