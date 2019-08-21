import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CloseIcon from '@material-ui/icons/Close';
import SheepSmallSvgIcon from '../../components/icons/SheepSmallSvgIcon/SheepSmallSvgIcon';
import { storeTypes } from '../../reducers/configureStore';
import { RoomsItemI } from '../../reducers/rooms/rooms';

/* eslint-disable @typescript-eslint/no-var-requires */
const teaTableImg = require('../../assets/images/teaTable.png');
const manSvg = require('../../assets/images/svg/standing-up-man-.svg');
const bedSvg = require('../../assets/images/svg/bed.svg');
const showerSvg = require('../../assets/images/svg/shower.svg');
const wifiSvg = require('../../assets/images/svg/wifi.svg');
const coffeeSvg = require('../../assets/images/svg/coffee-cup-of-hot-drink-black-silhouette.svg');
const calendarSvg = require('../../assets/images/svg/calendar.svg');
/* eslint-enable */

const useStyles = makeStyles((theme): Record<'container' | 'gridButton' | 'imagePhotoContainer' | 'imagePhotoGrid'
| 'imagePhoto' | 'imagePhoto100' | 'cardContainer' | 'verticalCardContainer' | 'verticalImagePhoto'
| 'verticalRoomInfoContainer' | 'positionText' | 'imagePhotoAside' | 'subTitleContainer'
| 'roomInfoContainer' | 'roomPriceContainer' | 'brandContainer' | 'footerContainer'
| 'roomLeftFirst' | 'roomLeftSecond' | 'roomLeftThird' | 'roomRightArticle'
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
      minWidth: 160,
      paddingTop: 16,
      paddingBottom: 16,
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  roomRightArticle: {
    fontSize: 18,
    lineHeight: '32px',
    padding: 48,
    '&::first-letter': {
      fontSize: '200%',
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

        <Grid container className={classes.imagePhotoContainer}>
          <Grid item xs={12} sm={3} md={4} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.roomLeftFirst}>
                <div>Room type</div>
                <div>
                  <img src={manSvg} alt="man" style={{ width: 18 }} />
                  <div>1 person</div>
                </div>
                <div>
                  <img src={bedSvg} alt="bed" style={{ width: 40 }} />
                  <div>1 person</div>
                </div>
                <div>
                  <img src={showerSvg} alt="shower" style={{ width: 40 }} />
                  <div>1 person</div>
                </div>
                <div>
                  <div>18</div>
                  <div>m2</div>
                </div>
              </div>
            </div>
            <div className={classes.cardContainer}>
              <div className={classes.roomLeftSecond}>
                <div>
                  <div>
                    <img src={wifiSvg} alt="wifi" />
                    Free wifi
                  </div>
                  <div>
                    <img src={coffeeSvg} alt="coffee" />
                    Breakfast include
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.cardContainer}>
              <div className={classes.roomLeftThird}>
                <div>
                  <div>Mini Bar</div>
                  <div><CloseIcon /></div>
                </div>
                <div>
                  <div>Room Service</div>
                  <div><CloseIcon /></div>
                </div>
                <div>
                  <div>Telephone</div>
                  <div><RadioButtonUncheckedIcon /></div>
                </div>
                <div>
                  <div>A/C</div>
                  <div><RadioButtonUncheckedIcon /></div>
                </div>
                <div>
                  <div>Fridge</div>
                  <div><RadioButtonUncheckedIcon /></div>
                </div>
                <div>
                  <div>Sofa</div>
                  <div><CloseIcon /></div>
                </div>
                <div>
                  <div>View</div>
                  <div><CloseIcon /></div>
                </div>
                <div>
                  <div>Smoke</div>
                  <div><RadioButtonUncheckedIcon /></div>
                </div>
                <div>
                  <div>Kids</div>
                  <div><CloseIcon /></div>
                </div>
                <div>
                  <div>Pets</div>
                  <div><RadioButtonUncheckedIcon /></div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} md={8} className={classes.imagePhotoGrid}>
            <div className={classNames(classes.cardContainer, classes.roomRightArticle)}>
              Single Room is only reserved for one guest.
              There is a bedroom with a single size bed and a private bathroom.
              Everything you need prepared for you: sheets and blankets, towels,
              soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.
            </div>

            <div className={classes.cardContainer}>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={calendarSvg} alt="calendar" />
                    </InputAdornment>
                  ),
                }}
                helperText="15:00~21:00"
              />
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={calendarSvg} alt="calendar" />
                    </InputAdornment>
                  ),
                }}
                helperText="15:00~21:00"
              />
              <FormControl variant="outlined">
                <InputLabel>Age</InputLabel>
                <Select
                  native
                  defaultValue={1}
                >
                  <option value={1}>1 adult</option>
                  <option value={2}>2 adult</option>
                  <option value={3}>3 adult</option>
                  <option value={4}>4 adult</option>
                  <option value={5}>5 adult</option>
                </Select>
              </FormControl>
            </div>

            <div className={classes.cardContainer}>
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

            <div className={classes.cardContainer}>
              <input />
              <input />
              <Button>Reserve</Button>
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
