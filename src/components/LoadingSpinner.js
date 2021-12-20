import React from 'react';
import makeStyles from '@mui/styles/makeStyles'
import CircularProgress from '@mui/material/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color='inherit' size='8rem' />
    </div>
  );
}