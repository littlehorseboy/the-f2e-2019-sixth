import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Route, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SheepSvgIcon from '../components/icons/SheepSvgIcon/SheepSvgIcon';
import SheepyHotelSvgIcon from '../components/icons/SheepyHotelSvgIcon/SheepyHotelSvgIcon';
import Main from '../pages/Main/Main';
import Rooms from '../pages/Rooms/Rooms';
import IsLoading from '../components/IsLoading/IsLoading';
import { loading } from '../actions/isLoading/isLoading';
import { fetchRooms } from '../actions/rooms/rooms';

const routes = [
  { path: '/', name: 'home', Component: Main },
  { path: '/rooms', name: 'rooms', Component: Rooms },
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
    alignItems: 'center',
    '& > div:nth-of-type(1)': {
      display: 'flex',
      alignItems: 'center',
      color: '#3D321F',
    },
    '& > div:nth-of-type(1) > svg': {
      color: '#3D321F',
      fontSize: 80,
    },
    '& > div:nth-of-type(1) > a': {
      marginLeft: 8,
      color: '#3D321F',
      fontFamily: 'Georgia',
      fontStyle: 'italic',
      fontSize: 36,
      fontWeight: 'bold',
      textDecoration: 'none',
    },
    '& > div:nth-of-type(2) > button:nth-of-type(2)': {
      marginLeft: 24,
    },
    '& > div:nth-of-type(2) > button:nth-of-type(2) svg': {
      fontSize: '2rem',
    },
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

  const dispatch = useDispatch();

  useEffect((): void => {
    // dispatch(loading());
    dispatch(fetchRooms());
  }, []);

  return (
    <HashRouter>
      <div className={classes.root}>
        <Container maxWidth={false} className={classes.appBar}>
          <div>
            <SheepSvgIcon />
            <Link to="/">
              <SheepyHotelSvgIcon />
            </Link>
          </div>
          <div>
            <Button variant="outlined" color="primary">中文</Button>
            <IconButton aria-label="menu">
              <MenuIcon />
            </IconButton>
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

        <IsLoading />
      </div>
    </HashRouter>
  );
}
