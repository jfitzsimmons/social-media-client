import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

function Home(props) {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    axios
      .get('/screams')
      .then((res) => {
        setScreams(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const recentScreamsMarkup = screams ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={3}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}

export default Home;
