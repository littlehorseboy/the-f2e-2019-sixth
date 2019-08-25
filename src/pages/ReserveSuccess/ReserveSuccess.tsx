import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SheepSmallSvgIcon from '../../components/icons/SheepSmallSvgIcon/SheepSmallSvgIcon';
import SheepWhiteSvgIcon from '../../components/icons/SheepWhiteSvgIcon/SheepWhiteSvgIcon';
import { storeTypes } from '../../reducers/configureStore';
import { ReserveSuccessI } from '../../reducers/reserveSuccess/reserveSuccess';

/* eslint-disable @typescript-eslint/no-var-requires */
const manSvg = require('../../assets/images/svg/standing-up-man-.svg');
const bedSvg = require('../../assets/images/svg/bed.svg');
/* eslint-enable */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme) => createStyles({
  container: {
    '&:not(:last-child)': {
      borderBottom: '1px solid #DCD8D2',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(9),
      paddingRight: theme.spacing(9),
    },
  },
  imagePhotoContainer: {
    borderLeft: '1px solid #DCD8D2',
    borderRight: '1px solid #DCD8D2',
    '&:not(:last-child)': {
      borderBottom: '1px solid #DCD8D2',
    },
  },
  borderRightGrid: {
    '&:not(:last-child)': {
      borderRight: '1px solid #DCD8D2',
    },
  },
  cardContainer: {
    padding: theme.spacing(1.5),
    '&:not(:last-child)': {
      borderBottom: '1px solid #DCD8D2',
    },
  },
  leftPane: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div:nth-child(1) > svg': {
      fontSize: '12rem',
    },
    '& > div:nth-child(2)': {
      fontFamily: 'Regular',
      fontSize: 40,
    },
  },
  rightPane: {
    padding: theme.spacing(10),
    '& > div': {
      borderTop: '1px solid #FFFFFF',
      borderBottom: '1px solid #FFFFFF',
      '& > div': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:nth-child(2)': {
          lineHeight: '48px',
        },
        '&:nth-child(3)': {
          lineHeight: '36px',
          '& > div': {
            textAlign: 'center',
            padding: theme.spacing(3),
          },
        },
        '&:not(:last-child)': {
          borderRight: '1px solid #FFFFFF',
        },
      },
    },
  },
  brandContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 200,
    paddingBottom: 200,
    color: '#3D321F',
    '& svg': {
      color: '#3D321F',
      marginRight: 8,
    },
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 90,
    paddingBottom: 90,
    color: '#3D321F',
    '& svg': {
      color: '#3D321F',
      marginRight: 8,
    },
  },
  roomRight: {
    padding: 48,
    '&:not(:last-child)': {
      [theme.breakpoints.up('md')]: {
        borderRight: '1px solid #DCD8D2',
      },
    },
  },
  priceContainer: {
    padding: theme.spacing(5, 1),
    color: '#3D321F',
    textAlign: 'center',
    '& > sub': {
      fontSize: 20,
    },
    '& > span:nth-of-type(1)': {
      marginLeft: theme.spacing(0.5),
      color: '#3D321F',
      fontFamily: 'serif',
      fontSize: 36,
      letterSpacing: -2,
      borderBottom: '1px solid #707070',
      fontStyle: 'italic',
    },
  },
  backButton: {
    fontSize: '1.2rem',
    borderRadius: 40,
    padding: theme.spacing(1.5, 8),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
}));

function ReserveSuccess(props: RouteComponentProps): JSX.Element {
  const classes = useStyles();

  const { history } = props;

  const reserveReceipt = useSelector((
    state: storeTypes,
  ): ReserveSuccessI => state.reserveSuccessReducer);

  return (
    <>
      <Container maxWidth={false} className={classes.container}>
        <Grid container className={classes.imagePhotoContainer}>
          <Grid item xs={12} sm={3} md={3} className={classes.borderRightGrid}>
            <div className={classNames(classes.cardContainer, classes.leftPane)}>
              <div>
                <SheepWhiteSvgIcon />
              </div>
              <div>
                See You Soon!
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <div className={classes.cardContainer}>
              <div className={classes.rightPane}>
                <Grid container spacing={10}>
                  <Grid item xs={12} md={4}>
                    {`Ref No. ${reserveReceipt.refNo}`}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ul>
                      <li>{reserveReceipt.reserveDate}</li>
                      <li>{`${reserveReceipt.guestCount} adult`}</li>
                      <li>{`${reserveReceipt.nightCount} nights`}</li>
                      <li>Free wifi</li>
                      <li>Breakfast include</li>
                    </ul>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div>
                      <div>
                        {Array(reserveReceipt.guestCount).fill(null).map((): JSX.Element => (
                          <img key={uuidv4()} src={manSvg} alt="man" />
                        ))}
                      </div>
                      <div>
                        {`${reserveReceipt.guestCount} person`}
                      </div>
                    </div>
                    <div>
                      <div>
                        <img src={bedSvg} alt="bed" />
                      </div>
                      <div>
                        {reserveReceipt.bed}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div className={classes.priceContainer}>
                <sub>$</sub>
                <span>{reserveReceipt.price}</span>
              </div>
            </div>

            <div className={classNames(classes.cardContainer, classes.roomRight)}>
              <Grid container justify="center">
                <Button
                  className={classes.backButton}
                  variant="outlined"
                  color="primary"
                  onClick={(): void => history.goBack()}
                >
                  Back
                </Button>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} className={classes.container}>
        <div className={classes.brandContainer}>
          <SheepSmallSvgIcon />
          © 2019 Sheepy Hotel, Inc. All rights reserved.
        </div>
      </Container>

      <Container maxWidth={false} className={classes.container}>
        <div className={classes.footerContainer} />
      </Container>
    </>
  );
}

export default withRouter(ReserveSuccess);
