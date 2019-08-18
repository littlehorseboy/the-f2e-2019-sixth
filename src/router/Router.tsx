import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Main from '../pages/Main';
import Test2 from '../components/Test2';

const routes = [
  { path: '/', name: 'home', Component: Main },
  { path: '/rooms', name: 'home2', Component: Test2 },
];

const useStyles = makeStyles((theme): Record<'root' | 'appBar' | 'routeContainer' | 'fade'
, CSSProperties | (() => CSSProperties)> => createStyles({
  root: {
    fontFamily: 'system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
    backgroundColor: '#F8F4F1',
    minHeight: '100vh',
  },
  appBar: {
    borderBottom: '3px solid #3D321F',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(9),
      paddingRight: theme.spacing(9),
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
  routeContainer: {
    position: 'relative',
  },
  fade: {
    position: 'absolute',
    backgroundColor: '#F8F4F1',
    width: '100%',
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
}));

export default function Router(): JSX.Element {
  const classes = useStyles();
  return (
    <HashRouter>
      <div className={classes.root}>
        <Container maxWidth={false} className={classes.appBar}>
          <div>
            Sheepy Hotel
            <Link to="/">Sheepy Hotel</Link>
          </div>
          <div>
            <button type="button">中文</button>
            <button type="button">漢堡</button>
          </div>
        </Container>

        <div className={classes.routeContainer}>
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
        </div>

      </div>
    </HashRouter>
  );
}
