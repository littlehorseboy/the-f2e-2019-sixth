import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';
import ManSvgIcon from '../../components/icons/ManSvgIcon/ManSvgIcon';
import BedBigSvgIcon from '../../components/icons/BedBigSvgIcon/BedBigSvgIcon';
import BedSvgIcon from '../../components/icons/BedSvgIcon/BedSvgIcon';
import { storeTypes } from '../../reducers/configureStore';
import { RoomsItemI } from '../../reducers/rooms/rooms';

/* eslint-disable @typescript-eslint/no-var-requires */
const teaTableImg = require('../../assets/images/teaTable.png');
/* eslint-enable */

const useStyles = makeStyles((theme): Record<'container' | 'gridButton' | 'imagePhotoContainer' | 'imagePhotoGrid'
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
  gridButton: {
    paddingTop: 48,
    paddingBottom: 48,
    fontFamily: 'Regular',
    fontSize: 18,
    color: '#3D321F',
    border: '1px solid #DCD8D2',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
}));

export default function Main(): JSX.Element {
  const classes = useStyles();

  const rooms = useSelector((
    state: storeTypes,
  ): RoomsItemI[] => state.roomsReducer.rooms);

  return (
    <>
      <Container maxWidth={false} className={classes.container}>
        <Grid container>
          {rooms.map((room): JSX.Element => (
            <Grid key={room.id} item xs={6} sm={4} md={2} className={classes.gridButton}>
              {room.name}
            </Grid>
          ))}
        </Grid>

        <Grid container className={classes.imagePhotoContainer}>
          <Grid item xs={12} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.imagePhoto} />
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={3} md={4}>
            <div>
              Room type
              <ManSvgIcon />
              <ManSvgIcon />
              <ManSvgIcon />
              <ManSvgIcon />
            </div>
            <div>
              <ManSvgIcon />
                Free wifi
              <ManSvgIcon />
              Breakfast include
            </div>
            <div>
              <div>Mini Bar</div>
              <div>Mini Bar</div>
              <div>Mini Bar</div>
              <div>Mini Bar</div>
              <div>Mini Bar</div>
              <div>Mini Bar</div>
              <div>Mini Bar</div>
              <div>Mini Bar</div>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} md={8}>
            <div>文章巴拉巴拉</div>
            <div>
              <input />
              <input />
              <input />
            </div>
            <div>
              <Grid container>
                <Grid item xs={12} sm={3} md={4}>
                  <input type="date" />
                  <input type="date" />
                </Grid>
                <Grid item xs={12} sm={9} md={8}>
                  <ul>
                    <li>2019/09/15 ~ 2019/9/17</li>
                    <li>1 adult</li>
                    <li>2 night</li>
                  </ul>
                  <div>
                    <sup>$</sup>
                    <span>2780</span>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div>
              <input />
              <input />
              <Button>Reserve</Button>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} className={classes.container}>
        <div className={classes.brandContainer}>
          <AirlineSeatFlatIcon />
          © 2019 Sheepy Hotel, Inc. All rights reserved.
        </div>
      </Container>

      <Container maxWidth={false} className={classes.container}>
        <div className={classes.footerContainer} />
      </Container>
    </>
  );
}
