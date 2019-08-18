import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  page: {
    fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function Router(): JSX.Element {
  const classes = useStyles();
  const a = [1, 2, 4, 5, 6];
  return (
    <HashRouter>
      <div className={classes.page}>
        <span />
        {[1, 2, 3].map((n): JSX.Element => (
          <div>
            <div>123</div>
          </div>
        ))}
      </div>
    </HashRouter>
  );
}
