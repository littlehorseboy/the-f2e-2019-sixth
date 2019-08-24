import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import Axios from 'axios';
import range from 'lodash/range';
import {
  format, addDays, addMonths, isSameDay,
} from 'date-fns';
import Calendar from 'react-calendar';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SheepSmallSvgIcon from '../../components/icons/SheepSmallSvgIcon/SheepSmallSvgIcon';
import SheepWhiteSvgIcon from '../../components/icons/SheepWhiteSvgIcon/SheepWhiteSvgIcon';
import { storeTypes } from '../../reducers/configureStore';
import { RoomsItemI } from '../../reducers/rooms/rooms';
import { loading, loaded } from '../../actions/isLoading/isLoading';
import ManSvgIcon from '../../components/icons/ManSvgIcon/ManSvgIcon';
import BedSvgIcon from '../../components/icons/BedSvgIcon/BedSvgIcon';

/* eslint-disable @typescript-eslint/no-var-requires */
const manSvg = require('../../assets/images/svg/standing-up-man-.svg');
const bedSvg = require('../../assets/images/svg/bed.svg');
const showerSvg = require('../../assets/images/svg/shower.svg');
const wifiSvg = require('../../assets/images/svg/wifi.svg');
const coffeeSvg = require('../../assets/images/svg/coffee-cup-of-hot-drink-black-silhouette.svg');
const calendarSvg = require('../../assets/images/svg/calendar.svg');
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
  gridButton: {
    fontFamily: 'Regular',
    fontSize: 20,
    border: '1px solid #DCD8D2',
    display: 'flex',
    color: '#3D321F',
    '&.active': {
      color: '#FFFFFF',
      backgroundColor: '#3D321F',
    },
    '& > a': {
      textAlign: 'center',
      width: '100%',
      height: '100%',
      paddingTop: 48,
      paddingBottom: 48,
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
  imagePhoto: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 615,
    [theme.breakpoints.up('md')]: {
      minHeight: 1000,
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
  roomLeftFirst: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > div': {
      paddingTop: 16,
      paddingBottom: 16,
      textAlign: 'center',
      flexBasis: '50%',
      '&:first-child': {
        flexBasis: '100%',
        fontSize: 26,
      },
      '&:last-child > div:first-child': {
        fontSize: 32,
        fontWeight: 'bold',
      },
      '& > div:nth-child(2)': {
        color: '#888888',
      },
    },
  },
  roomLeftSecond: {
    paddingTop: 32,
    paddingBottom: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div > div': {
      paddingTop: 16,
      paddingBottom: 16,
      '& > img': {
        marginRight: 24,
      },
    },
  },
  roomLeftThird: {
    paddingTop: 40,
    paddingBottom: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      minWidth: 250,
      paddingTop: 16,
      paddingBottom: 16,
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        minWidth: 160,
      },
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
  roomRightArticle: {
    fontSize: 18,
    lineHeight: '32px',
    '&::first-letter': {
      fontSize: '200%',
    },
  },
  calendarContainer: {
    display: 'flex',
  },
  calendar: {
    backgroundColor: 'transparent',
    border: 'none',
    '& > .react-calendar__navigation': {
      '& > button.react-calendar__navigation__arrow': {
        border: '1px solid #707070',
        borderRadius: 1,
      },
    },
  },
  tileClassNameNormal: {
    backgroundColor: '#FFFFFF',
  },
  tileClassNameActive: {
    color: '#FFFFFF',
    backgroundColor: '#3D321F',
    '&.react-calendar__tile--active': {
      '&:hover, &:focus': {
        backgroundColor: '#3D321F',
      },
    },
  },
  tileClassNameReserved: {
    backgroundColor: '#D0D0D0',
  },
  receiptContainer: {
    '& > ul': {
      lineHeight: '48px',
      paddingTop: 32,
      paddingBottom: 32,
      borderBottom: '1px solid #DCD8D2',
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

interface RoomI {
  amenities: {
    'Air-Conditioner': boolean;
    Breakfast: boolean;
    'Child-Friendly': boolean;
    'Great-View': boolean;
    'Mini-Bar': boolean;
    'Pet-Friendly': boolean;
    Refrigerator: boolean;
    'Room-Service': boolean;
    'Smoke-Free': boolean;
    Sofa: boolean;
    Television: boolean;
    'Wi-Fi': boolean;
  };
  checkInAndOut: {
    checkInEarly: string;
    checkInLate: string;
    checkOut: string;
  };
  description: string;
  descriptionShort: {
    Bed: 'Double'[];
    Footage: number;
    GuestMax: number;
    GuestMin: number;
    'Private-Bath': number;
  };
  id: string;
  imageUrl: string[];
  name: string;
  normalDayPrice: number;
  holidayPrice: number;
}

export default function ReserveSuccess(): JSX.Element {
  const classes = useStyles();

  const [room, setRoom] = useState<RoomI>({
    amenities: {
      'Air-Conditioner': false,
      Breakfast: false,
      'Child-Friendly': false,
      'Great-View': false,
      'Mini-Bar': false,
      'Pet-Friendly': false,
      Refrigerator: false,
      'Room-Service': false,
      'Smoke-Free': false,
      Sofa: false,
      Television: false,
      'Wi-Fi': false,
    },
    checkInAndOut: {
      checkInEarly: '',
      checkInLate: '',
      checkOut: '',
    },
    description: '',
    descriptionShort: {
      Bed: [],
      Footage: 0,
      GuestMax: 0,
      GuestMin: 0,
      'Private-Bath': 0,
    },
    id: '',
    imageUrl: [],
    name: '',
    normalDayPrice: 0,
    holidayPrice: 0,
  });

  const rooms = useSelector((
    state: storeTypes,
  ): RoomsItemI[] => state.roomsReducer.rooms);

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
                    Ref No. 20190825001
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ul>
                      <li>123</li>
                      <li>223</li>
                      <li>1 night</li>
                    </ul>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div>
                      <div>
                        <img src={manSvg} alt="man" />
                      </div>
                      <div>
                        1 person
                      </div>
                    </div>
                    <div>
                      <div>
                        <img src={bedSvg} alt="bed" />
                      </div>
                      <div>
                        1 single bed
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div className={classes.priceContainer}>
                <sub>$</sub>
                <span>2780</span>
              </div>
            </div>

            <div className={classNames(classes.cardContainer, classes.roomRight)}>
              <Grid container justify="center">
                <Link component={RouterLink} to="/">
                  <Button
                    className={classes.backButton}
                    variant="outlined"
                    color="primary"
                  >
                    Back
                  </Button>
                </Link>
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
