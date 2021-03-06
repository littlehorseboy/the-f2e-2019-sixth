import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SheepSvgIcon from '../../components/icons/SheepSvgIcon/SheepSvgIcon';
import SheepyHotelSvgIcon from '../../components/icons/SheepyHotelSvgIcon/SheepyHotelSvgIcon';
import SheepWhiteSvgIcon from '../../components/icons/SheepWhiteSvgIcon/SheepWhiteSvgIcon';
import SheepSmallSvgIcon from '../../components/icons/SheepSmallSvgIcon/SheepSmallSvgIcon';
import ManSvgIcon from '../../components/icons/ManSvgIcon/ManSvgIcon';
import BedBigSvgIcon from '../../components/icons/BedBigSvgIcon/BedBigSvgIcon';
import BedSvgIcon from '../../components/icons/BedSvgIcon/BedSvgIcon';
import { storeTypes } from '../../reducers/configureStore';
import { RoomsItemI } from '../../reducers/rooms/rooms';

/* eslint-disable @typescript-eslint/no-var-requires */
const teaTableImg = require('../../assets/images/teaTable.png');
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
  imagePhotoGrid: {
    '&:not(:last-child)': {
      borderRight: '1px solid #DCD8D2',
    },
  },
  imagePhoto: {
    backgroundImage: `url(${teaTableImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 615,
  },
  imgHover: {
    '& > a': {
      width: '100%',
      minHeight: 615,
      cursor: 'pointer',
      backgroundColor: '#3D321F',
      opacity: 0,
      transition: 'opacity 0.5s ease',
      '&:hover': {
        opacity: 0.6,
      },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > div': {
        width: '100%',
        minHeight: 'calc(615px - 200px)',
        margin: 100,
        border: '2px solid #FFFFFF',
        color: '#FFFFFF',
        fontSize: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
  cardContainer: {
    padding: theme.spacing(1.5),
    '&:not(:last-child)': {
      borderBottom: '1px solid #DCD8D2',
    },
  },
  verticalImagePhoto: {
    backgroundImage: `url(${teaTableImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  verticalImgHover: {
    '& > a': {
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      backgroundColor: '#3D321F',
      opacity: 0,
      transition: 'opacity 0.5s ease',
      '&:hover': {
        opacity: 0.6,
      },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > div': {
        width: '100%',
        height: 'calc(100% - 70px)',
        margin: 35,
        border: '2px solid #FFFFFF',
        color: '#FFFFFF',
        fontSize: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
  verticalRoomInfoContainer: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    lineHeight: '40px',
    '& > div:nth-child(2) > div:nth-child(2)': {
      textAlign: 'right',
    },
  },
  positionText: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
    color: '#3D321F',
    '& > svg': {
      color: '#3D321F',
      marginRight: 16,
    },
  },
  imagePhotoAside: {
    height: '100%',
    paddingTop: 100,
    paddingBottom: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > div:nth-child(1) > svg': {
      color: '#3D321F',
      fontSize: '12rem',
    },
    '& > div:nth-child(2)': {
      textAlign: 'center',
      fontFamily: 'Georgia',
      '& > div:nth-child(1)': {
        fontSize: 39,
        color: '#A5A5A5',
      },
      '& > div:nth-child(2), & > div:nth-child(3), & > div:nth-child(4)': {
        fontSize: 39,
        color: '#3D321F',
      },
    },
    '& > div:nth-child(3)': {
      fontFamily: 'Georgia',
      fontSize: 17,
      color: '#3D321F',
    },
  },
  subTitleContainer: {
    fontSize: 27,
    color: '#3D321F',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomInfoContainer: {
    padding: theme.spacing(2),
    '& > a:nth-child(1)': {
      fontSize: 20,
      color: '#3D321F',
    },
    '& > div:nth-child(2)': {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  roomPriceContainer: {
    color: '#3D321F',
    '& > sub': {
      fontSize: 20,
    },
    '& > span:nth-of-type(1)': {
      marginLeft: theme.spacing(0.5),
      color: '#3D321F',
      fontFamily: 'serif',
      fontSize: 36,
      letterSpacing: -2,
      borderBottom: '1px solid #3D321F',
    },
    '& > span:nth-of-type(2)': {
      color: '#3D321F',
      fontSize: 20,
      fontStyle: 'italic',
    },
  },
  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 300,
    paddingBottom: 300,
    '& > div:nth-of-type(1) > svg': {
      color: '#3D321F',
      fontSize: '7rem',
    },
    '& > div:nth-of-type(2)': {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
      fontSize: 36,
      fontWeight: 'bold',
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
}));

export default function Main(): JSX.Element {
  const classes = useStyles();

  const rooms = useSelector((
    state: storeTypes,
  ): RoomsItemI[] => state.roomsReducer.rooms);

  return (
    <>
      <Container maxWidth={false} className={classes.container}>
        <Grid container className={classes.imagePhotoContainer}>
          <Grid item xs={12} md={8} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.imagePhoto} />
            </div>
            <div className={classes.cardContainer}>
              <div className={classes.positionText}>
                <LocationOnIcon />
                151 3rd St, San Francisco
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.imagePhotoGrid}>
            <div className={classes.imagePhotoAside}>
              <div>
                <SheepWhiteSvgIcon />
              </div>
              <div>
                <div>Occasionally</div>
                <div>Do go gentle</div>
                <div>Into that</div>
                <div>Good night</div>
              </div>
              <div>- only in the Sheepy Hotel</div>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth={false}
        className={classNames(classes.container, classes.subTitleContainer)}
      >
        The Rooms
      </Container>

      <Container maxWidth={false} className={classes.container}>
        {/* "Single Room", "Deluxe Single Room",
          "Double Room", "Deluxe Double Room",
          "Twin Room", "Deluxe Twin Room" */}
        <Grid container className={classes.imagePhotoContainer}>
          {rooms.slice(4, 6).map((room): JSX.Element => (
            <Grid key={room.id} item xs={12} md={6} className={classes.imagePhotoGrid}>
              <div className={classes.cardContainer}>
                <div
                  className={classNames(classes.imagePhoto, classes.imgHover)}
                  style={{ backgroundImage: `url(${room.imageUrl})` }}
                >
                  <Link component={RouterLink} to={`/rooms/${room.id}`}>
                    <div>See more</div>
                  </Link>
                </div>
                <div className={classes.roomInfoContainer}>
                  <Link component={RouterLink} to={`/rooms/${room.id}`}>
                    {room.name}
                  </Link>
                  <div>
                    <div>
                      {Array(room.name.includes('Single') ? 1 : 2).fill(null).map((): JSX.Element => (
                        <ManSvgIcon key={uuidv4()} />
                      ))}
                      {Array(room.name.includes('Double') ? 1 : 0).fill(null).map((): JSX.Element => (
                        <BedBigSvgIcon key={uuidv4()} />
                      ))}
                      {Array(room.name.includes('Twin') ? 2 : 0).fill(null).map((): JSX.Element => (
                        <BedSvgIcon key={uuidv4()} />
                      ))}
                      {Array(room.name.includes('Single') ? 1 : 0).fill(null).map((): JSX.Element => (
                        <BedSvgIcon key={uuidv4()} />
                      ))}
                    </div>
                    <div className={classes.roomPriceContainer}>
                      <sub>$</sub>
                      <span>{room.normalDayPrice}</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        <Grid container className={classes.imagePhotoContainer}>
          {rooms.slice(2, 4).map((room): JSX.Element => (
            <Grid key={room.id} item xs={12} md={4} className={classes.imagePhotoGrid}>
              <div className={classes.cardContainer}>
                <div
                  className={classNames(classes.imagePhoto, classes.imgHover)}
                  style={{ backgroundImage: `url(${room.imageUrl})` }}
                >
                  <Link component={RouterLink} to={`/rooms/${room.id}`}>
                    <div>See more</div>
                  </Link>
                </div>
                <div className={classes.roomInfoContainer}>
                  <Link component={RouterLink} to={`/rooms/${room.id}`}>{room.name}</Link>
                  <div>
                    <div>
                      {Array(room.name.includes('Single') ? 1 : 2).fill(null).map((): JSX.Element => (
                        <ManSvgIcon key={uuidv4()} />
                      ))}
                      {Array(room.name.includes('Double') ? 1 : 0).fill(null).map((): JSX.Element => (
                        <BedBigSvgIcon key={uuidv4()} />
                      ))}
                      {Array(room.name.includes('Twin') ? 2 : 0).fill(null).map((): JSX.Element => (
                        <BedSvgIcon key={uuidv4()} />
                      ))}
                      {Array(room.name.includes('Single') ? 1 : 0).fill(null).map((): JSX.Element => (
                        <BedSvgIcon key={uuidv4()} />
                      ))}
                    </div>
                    <div className={classes.roomPriceContainer}>
                      <sub>$</sub>
                      <span>{room.normalDayPrice}</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}

          <Grid item xs={12} md={4} className={classes.imagePhotoGrid}>
            <div style={{ height: '100%' }}>
              {rooms.slice(0, 2).map((room): JSX.Element => (
                <div key={room.id} className={classes.cardContainer} style={{ height: '50%', display: 'flex' }}>
                  <div
                    className={classNames(classes.verticalImagePhoto, classes.verticalImgHover)}
                    style={{ backgroundImage: `url(${room.imageUrl})`, flexGrow: 1 }}
                  >
                    <Link component={RouterLink} to={`/rooms/${room.id}`}>
                      <div>See more</div>
                    </Link>
                  </div>
                  <div className={classes.verticalRoomInfoContainer}>
                    <Link component={RouterLink} to={`/rooms/${room.id}`}>{room.name}</Link>
                    <div>
                      <div>
                        {Array(room.name.includes('Single') ? 1 : 2).fill(null).map((): JSX.Element => (
                          <ManSvgIcon key={uuidv4()} />
                        ))}
                        {Array(room.name.includes('Double') ? 1 : 0).fill(null).map((): JSX.Element => (
                          <BedBigSvgIcon key={uuidv4()} />
                        ))}
                        {Array(room.name.includes('Twin') ? 2 : 0).fill(null).map((): JSX.Element => (
                          <BedSvgIcon key={uuidv4()} />
                        ))}
                        {Array(room.name.includes('Single') ? 1 : 0).fill(null).map((): JSX.Element => (
                          <BedSvgIcon key={uuidv4()} />
                        ))}
                      </div>
                      <div className={classes.roomPriceContainer}>
                        <sub>$</sub>
                        <span>{room.normalDayPrice}</span>
                        <span>+</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} className={classes.container}>
        <div className={classes.brandContainer}>
          <div>
            <SheepSvgIcon />
          </div>
          <div>
            <SheepyHotelSvgIcon />
          </div>
        </div>
      </Container>

      <Container maxWidth={false} className={classes.container}>
        <div className={classes.footerContainer}>
          <SheepSmallSvgIcon />
          © 2019 Sheepy Hotel, Inc. All rights reserved.
        </div>
      </Container>
    </>
  );
}
