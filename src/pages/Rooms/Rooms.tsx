import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
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
import { storeTypes } from '../../reducers/configureStore';
import { RoomsItemI } from '../../reducers/rooms/rooms';
import { loading, loaded } from '../../actions/isLoading/isLoading';
import { reserveSuccess } from '../../actions/reserveSuccess/reserveSuccess';

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
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
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
  imagePhotoGrid: {
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
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 22,
    },
    lineHeight: '48px',
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
  roomPriceContainer: {
    color: '#3D321F',
    textAlign: 'right',
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
  reserveButton: {
    fontSize: '1.2rem',
    borderRadius: 40,
    padding: theme.spacing(1.5, 8),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
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
    Bed: string[];
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

interface BookingI {
  date: string;
  name: string;
  tel: string;
}

interface PropsI {
  routeComponentProps: RouteComponentProps<{ id: string }>;
}

export default function Rooms(props: PropsI): JSX.Element {
  const classes = useStyles();

  const { routeComponentProps } = props;

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

  const [booking, setBooking] = useState<BookingI[]>([]);

  const dispatch = useDispatch();

  useEffect((): void => {
    if (routeComponentProps.match) {
      dispatch(loading());

      Axios({
        method: 'get',
        url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${routeComponentProps.match.params.id}`,
        headers: {
          Authorization: 'Bearer pj6Zo71utSu7169UgLSqS0qLr3sippW2rkISAy9B9DQ8Sd3nTIkNaBVQ9nNJ',
          Accept: 'application/json',
        },
      })
        .then((response): void => {
          if (response.data.success) {
            const findRoom = (response.data.room as RoomI[])
              .find((r): boolean => r.id === routeComponentProps.match.params.id);

            if (findRoom) {
              setRoom(findRoom);
            }

            setBooking(response.data.booking);
          }
        })
        .catch((error): void => {
          console.log(error);
        })
        .then((): void => {
          dispatch(loaded());
        });
    }
  }, [routeComponentProps.match && routeComponentProps.match.params.id]);

  const rooms = useSelector((
    state: storeTypes,
  ): RoomsItemI[] => state.roomsReducer.rooms);

  const [numberOfAdults, setNumberOfAdults] = useState(room.descriptionShort.GuestMin);

  useEffect((): void => {
    setNumberOfAdults(room.descriptionShort.GuestMin);
  }, [room.id]);

  const [calendarDate, setCalendarDate] = useState(new Date());

  const [name, setName] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNumberOfAdultsChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): void => {
    setNumberOfAdults(Number(event.target.value));
  };

  const handleCalendarChange = (date: Date | Date[]): void => {
    setCalendarDate(date as Date);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(event.target.value);
  };

  const handleClickSubmit = (): void => {
    if (!calendarDate) {
      alert('calendarDate');
    } else if (isSameDay(calendarDate, new Date())) {
      alert('isSameDay(calendarDate, new Date())');
    } else if (
      booking.find((book): boolean => isSameDay(calendarDate, new Date(book.date)))
    ) {
      alert('booking.find((book): boolean => isSameDay(calendarDate, new Date(book.date)))');
    } else if (!name) {
      alert('name');
    } else if (!phoneNumber) {
      alert('phoneNumber');
    } else {
      dispatch(loading());

      Axios({
        method: 'post',
        url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${room.id}`,
        headers: {
          Authorization: 'Bearer pj6Zo71utSu7169UgLSqS0qLr3sippW2rkISAy9B9DQ8Sd3nTIkNaBVQ9nNJ',
          Accept: 'application/json',
        },
        data: {
          name,
          tel: phoneNumber,
          date: [format(calendarDate, 'yyyy-MM-dd')],
        },
      })
        .then((response): void => {
          dispatch(reserveSuccess({
            refNo: format(new Date(), 'yyyyMMdd') + uuidv4(),
            reserveDate: `${format(calendarDate, 'yyyy/MM/dd')} ~ ${format(addDays(calendarDate, 1), 'yyyy/MM/dd')}`,
            guestCount: numberOfAdults,
            nightCount: 1,
            bed: room.descriptionShort.Bed.join(','),
            price: [6, 0].includes(calendarDate.getDay())
              ? room.holidayPrice
              : room.normalDayPrice,
          }));
          routeComponentProps.history.push('/reserveSuccess');
        })
        .catch((error): void => {
          console.log(error);
        })
        .then((): void => {
          dispatch(loaded());
        });
    }
  };

  const handleClickDelete = (): void => {
    dispatch(loading());

    Axios({
      method: 'delete',
      url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
      headers: {
        Authorization: 'Bearer pj6Zo71utSu7169UgLSqS0qLr3sippW2rkISAy9B9DQ8Sd3nTIkNaBVQ9nNJ',
        Accept: 'application/json',
      },
    })
      .then((response): void => {
        if (response.data.success) {
          alert('clear');
        }
      })
      .catch((error): void => {
        console.log(error);
      })
      .then((): void => {
        dispatch(loaded());
      });
  };

  return (
    <>
      <Container maxWidth={false} className={classes.container}>
        <Grid container>
          {rooms.map((roomItem): JSX.Element => (
            <Grid
              key={roomItem.id}
              item
              xs={6}
              sm={4}
              md={2}
              className={classNames(
                classes.gridButton,
                {
                  active: routeComponentProps.match
                    && roomItem.id === routeComponentProps.match.params.id,
                },
              )}
            >
              <Link color="inherit" component={RouterLink} to={`/rooms/${roomItem.id}`}>
                {roomItem.name}
              </Link>
            </Grid>
          ))}
        </Grid>

        <Grid container className={classes.imagePhotoContainer}>
          <Grid item xs={12} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div
                className={classes.imagePhoto}
                style={{
                  backgroundImage: `url(${room.imageUrl[0]})`,
                }}
              />
            </div>
          </Grid>
        </Grid>

        <Grid container className={classes.imagePhotoContainer}>
          <Grid item xs={12} sm={3} md={4} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.roomLeftFirst}>
                <div>Room type</div>
                <div>
                  <img src={manSvg} alt="man" style={{ width: 18 }} />
                  <div>
                    {`${room.descriptionShort.GuestMax} person`}
                  </div>
                </div>
                <div>
                  <img src={bedSvg} alt="bed" style={{ width: 40 }} />
                  <div>{room.descriptionShort.Bed.join(',')}</div>
                </div>
                <div>
                  <img src={showerSvg} alt="shower" style={{ width: 40 }} />
                  <div>
                    {`${room.descriptionShort['Private-Bath']} bathroom`}
                  </div>
                </div>
                <div>
                  <div>{room.descriptionShort.Footage}</div>
                  <div>m2</div>
                </div>
              </div>
            </div>
            <div className={classes.cardContainer}>
              <div className={classes.roomLeftSecond}>
                <div>
                  {room.amenities['Wi-Fi'] && (
                    <div>
                      <img src={wifiSvg} alt="wifi" />
                      Free wifi
                    </div>
                  )}
                  {room.amenities.Breakfast && (
                    <div>
                      <img src={coffeeSvg} alt="coffee" />
                      Breakfast include
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={classes.cardContainer}>
              <div className={classes.roomLeftThird}>
                <div>
                  <div>Mini Bar</div>
                  <div>
                    {room.amenities['Mini-Bar']
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
                <div>
                  <div>Room Service</div>
                  <div>
                    {room.amenities['Room-Service']
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
                <div>
                  <div>Television</div>
                  <div>
                    {room.amenities.Television
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
                <div>
                  <div>A/C</div>
                  <div>
                    {room.amenities['Air-Conditioner']
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
                <div>
                  <div>Fridge</div>
                  <div>
                    {room.amenities.Refrigerator
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
                <div>
                  <div>Sofa</div>
                  <div>
                    {room.amenities.Sofa
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
                <div>
                  <div>View</div>
                  <div>
                    {room.amenities['Great-View']
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
                <div>
                  <div>Smoke</div>
                  <div>
                    {room.amenities['Smoke-Free']
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
                <div>
                  <div>Kids</div>
                  <div>
                    {room.amenities['Child-Friendly']
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
                <div>
                  <div>Pets</div>
                  <div>
                    {room.amenities['Pet-Friendly']
                      ? <RadioButtonUncheckedIcon />
                      : <CloseIcon />}
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} md={8} className={classes.imagePhotoGrid}>
            <div
              className={
                classNames(classes.cardContainer, classes.roomRight, classes.roomRightArticle)
              }
            >
              {room.description}
            </div>

            <div className={classes.cardContainer}>
              <div className={classes.roomRight}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={format(calendarDate, 'yyyy/MM/dd')}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={calendarSvg} alt="calendar" />
                          </InputAdornment>
                        ),
                      }}
                      helperText={`${room.checkInAndOut.checkInEarly}~${room.checkInAndOut.checkInLate}`}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={format(addDays(calendarDate, 1), 'yyyy/MM/dd')}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={calendarSvg} alt="calendar" />
                          </InputAdornment>
                        ),
                      }}
                      helperText={room.checkInAndOut.checkOut}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" style={{ width: '100%' }}>
                      <Select
                        native
                        value={numberOfAdults}
                        onChange={handleNumberOfAdultsChange}
                        input={<OutlinedInput labelWidth={0} />}
                      >
                        {range(room.descriptionShort.GuestMin, room.descriptionShort.GuestMax + 1)
                          .map((n): JSX.Element => (
                            <option key={n} value={n}>{`${n} adult`}</option>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className={classes.cardContainer}>
              <Grid container>
                <Grid item xs={12} sm={12} md={7} className={classes.roomRight}>
                  <div className={classes.calendarContainer}>
                    <Calendar
                      onChange={handleCalendarChange}
                      value={calendarDate}
                      className={classes.calendar}
                      locale="en-US"
                      prevLabel={<KeyboardArrowLeftIcon />}
                      nextLabel={<KeyboardArrowRightIcon />}
                      minDate={new Date()}
                      maxDate={addMonths(new Date(), 2)}
                      tileClassName={({ date }): string | null => {
                        if (isSameDay(calendarDate, date)) {
                          return classes.tileClassNameActive;
                        }
                        if (
                          booking.find((book): boolean => isSameDay(new Date(book.date), date))
                        ) {
                          return classes.tileClassNameReserved;
                        }
                        return classes.tileClassNameNormal;
                      }}
                      prev2Label={null}
                      next2Label={null}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={5} className={classes.roomRight}>
                  <div className={classes.receiptContainer}>
                    <ul>
                      <li>{`${format(calendarDate, 'yyyy/MM/dd')} ~ ${format(addDays(calendarDate, 1), 'yyyy/MM/dd')}`}</li>
                      <li>{`${numberOfAdults} adult`}</li>
                      <li>1 night</li>
                    </ul>
                    <div className={classes.roomPriceContainer}>
                      <sub>$</sub>
                      {/* 星期六星期日 */}
                      <span>
                        {[6, 0].includes(calendarDate.getDay())
                          ? room.holidayPrice
                          : room.normalDayPrice}
                      </span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className={classNames(classes.cardContainer, classes.roomRight)}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <TextField
                    value={name}
                    onChange={handleNameChange}
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    label="Phone number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Button
                  className={classes.reserveButton}
                  variant="contained"
                  color="primary"
                  onClick={handleClickSubmit}
                >
                  Reserve
                </Button>

                <Button
                  style={{ display: 'none' }}
                  className={classes.reserveButton}
                  variant="contained"
                  color="primary"
                  onClick={handleClickDelete}
                >
                  Delete
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
