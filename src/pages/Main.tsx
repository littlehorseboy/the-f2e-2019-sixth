import React from 'react';
import {
  HashRouter,
  Route,
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { CSSTransition } from 'react-transition-group';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Test from '../components/Test';
import Test2 from '../components/Test2';

const routes = [
  { path: '/', name: 'home', Component: Test },
  { path: '/h', name: 'home2', Component: Test2 },
];

const useStyles = makeStyles({
  fade: {
    transition: 'opacity 0.5s ease-in',
    '&-enter': {
      opacity: 0,
    },
    '&-enter-done': {
      opacity: 1,
    },
    '&-exit': {
      opacity: 1,
    },
    '&-exit-done': {
      opacity: 0,
    },
  },
  root: {

  },
});

export default function Router(props: RouteComponentProps): JSX.Element {
  const classes = useStyles();
  const { location } = props;

  return (
    <HashRouter>
      <div className={classes.root}>
        <Container>
          <Grid container>
            <Grid item xs={12} lg={5}>
              123
            </Grid>

            <Grid item xs={12} lg={7}>
              {routes.map(({ path, Component }): JSX.Element => (
                <Route key={path} exact path={path}>
                  {({ match }): JSX.Element => (
                    <CSSTransition
                      in={match !== null}
                      timeout={{
                        enter: 300,
                        exit: 100,
                      }}
                      classNames={classes.fade}
                      unmountOnExit
                    >
                      <div className={classes.fade}>
                        <Component />
                      </div>
                    </CSSTransition>
                  )}
                </Route>
              ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    </HashRouter>
  );
}
