import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ManSvgIcon from '../components/icons/ManSvgIcon/ManSvgIcon';
import BedBigSvgIcon from '../components/icons/BedBigSvgIcon/BedBigSvgIcon';
import BedSvgIcon from '../components/icons/BedSvgIcon/BedSvgIcon';

/* eslint-disable @typescript-eslint/no-var-requires */
const teaTableImg = require('../assets/images/teaTable.png');
const DeluxeTwinRoomImg = require('../assets/images/DeluxeTwinRoom.png');
const TwinRoomImg = require('../assets/images/TwinRoom.png');
const DeluxeDoubbleRoomImg = require('../assets/images/DeluxeDoubbleRoom.png');
const DoubleRoom2460Img = require('../assets/images/DoubleRoom2460.png');
const DoubleRoom1890Img = require('../assets/images/DoubleRoom1890.png');
const DoubleRoom1380Img = require('../assets/images/DoubleRoom1380.png');
/* eslint-enable */

const useStyles = makeStyles((theme): Record<'container' | 'imagePhotoContainer' | 'imagePhotoGrid'
| 'imagePhoto' | 'cardContainer' | 'positionText' | 'imagePhotoAside' | 'subTitleContainer'
| 'roomInfoContainer' | 'roomPriceContainer'
, CSSProperties | (() => CSSProperties)> => createStyles({
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
  cardContainer: {
    padding: theme.spacing(1.5),
    '&:not(:last-child)': {
      borderBottom: '1px solid #DCD8D2',
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
      fontSize: '7rem',
    },
    '& > div:nth-child(2)': {
      textAlign: 'center',
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
    '& > div:nth-child(1)': {
      fontSize: 27,
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
      fontSize: 32,
      textDecoration: 'underline',
    },
    '& > span:nth-of-type(2)': {
      color: '#3D321F',
      fontSize: 20,
      fontStyle: 'italic',
    },
  },
}));

interface RoomItem {
  id: string;
  imageUrl: string;
  normalDayPrice: number;
  holidayPrice: number;
  name: string;
}

export default function Main(): JSX.Element {
  const classes = useStyles();

  const [rooms, setRooms] = useState<RoomItem[]>([]);

  useEffect((): void => {
    Axios({
      method: 'get',
      url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
      headers: {
        Authorization: 'Bearer pj6Zo71utSu7169UgLSqS0qLr3sippW2rkISAy9B9DQ8Sd3nTIkNaBVQ9nNJ',
        Accept: 'application/json',
      },
    })
      .then((response): void => {
        if (response.data.success) {
          setRooms(response.data.item);
        }
      })
      .catch((error): void => {
        console.log(error);
      });
  }, []);

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
                <LocationOnIcon />
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
          <Grid item xs={12} md={6} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.imagePhoto} style={{ backgroundImage: `url(${DeluxeTwinRoomImg})` }} />
              <div className={classes.roomInfoContainer}>
                <div>Deluxe Twin Room</div>
                <div>
                  <div>
                    {Array(3).fill(null).map((): JSX.Element => (
                      <ManSvgIcon key={uuidv4()} />
                    ))}
                    {Array(3).fill(null).map((): JSX.Element => (
                      <BedBigSvgIcon key={uuidv4()} />
                    ))}
                    {Array(3).fill(null).map((): JSX.Element => (
                      <BedSvgIcon key={uuidv4()} />
                    ))}
                  </div>
                  <div className={classes.roomPriceContainer}>
                    <sub>$</sub>
                    <span>3899</span>
                    <span>+</span>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.imagePhoto} style={{ backgroundImage: `url(${TwinRoomImg})` }} />
              <div>asd</div>
            </div>
          </Grid>
        </Grid>

        <Grid container className={classes.imagePhotoContainer}>
          <Grid item xs={12} md={4} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.imagePhoto} style={{ backgroundImage: `url(${DeluxeDoubbleRoomImg})` }} />
              <div>asd</div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.imagePhoto} style={{ backgroundImage: `url(${DoubleRoom2460Img})` }} />
              <div>asd</div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.imagePhoto} style={{ backgroundImage: `url(${DoubleRoom1890Img})` }} />
              <div>asd</div>
            </div>

            <div className={classes.cardContainer}>
              <div className={classes.imagePhoto} style={{ backgroundImage: `url(${DoubleRoom1890Img})` }} />
              <div>asd</div>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} className={classes.container}>
        Sheepy Hotel
      </Container>

      <Container maxWidth={false} className={classes.container}>
        <div>
          <LocationOnIcon />
          © 2019 Sheepy Hotel, Inc. All rights reserved.
        </div>
      </Container>
    </>
  );
}
