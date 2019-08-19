import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';
import ManSvgIcon from '../../components/icons/ManSvgIcon/ManSvgIcon';
import BedBigSvgIcon from '../../components/icons/BedBigSvgIcon/BedBigSvgIcon';
import BedSvgIcon from '../../components/icons/BedSvgIcon/BedSvgIcon';

/* eslint-disable @typescript-eslint/no-var-requires */
const teaTableImg = require('../../assets/images/teaTable.png');
/* eslint-enable */

const useStyles = makeStyles((theme): Record<'container' | 'imagePhotoContainer' | 'imagePhotoGrid'
| 'imagePhoto' | 'imagePhoto100' | 'cardContainer' | 'verticalCardContainer' | 'verticalImagePhoto'
| 'verticalRoomInfoContainer' | 'positionText' | 'imagePhotoAside' | 'subTitleContainer'
| 'roomInfoContainer' | 'roomPriceContainer' | 'brandContainer' | 'footerContainer'
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
  imagePhoto100: {
    backgroundImage: `url(${teaTableImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  },
  cardContainer: {
    padding: theme.spacing(1.5),
    '&:not(:last-child)': {
      borderBottom: '1px solid #DCD8D2',
    },
  },
  verticalCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      flexGrow: 1,
    },
  },
  verticalImagePhoto: {
    backgroundImage: `url(${teaTableImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  verticalRoomInfoContainer: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
      fontSize: '7rem',
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
          setRooms(response.data.items);
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
                <AirlineSeatFlatIcon />
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

      <Container maxWidth={false} className={classes.container}>
        <div className={classes.brandContainer}>
          <div>
            <AirlineSeatFlatIcon />
          </div>
          <div>
            Sheepy Hotel
          </div>
        </div>
      </Container>

      <Container maxWidth={false} className={classes.container}>
        <div className={classes.footerContainer}>
          <AirlineSeatFlatIcon />
          © 2019 Sheepy Hotel, Inc. All rights reserved.
        </div>
      </Container>
    </>
  );
}
