import React from 'react';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
}));

export default function Main(): JSX.Element {
  const classes = useStyles();

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
        <Grid container className={classes.imagePhotoContainer}>
          <Grid item xs={12} md={6} className={classes.imagePhotoGrid}>
            <div className={classes.cardContainer}>
              <div className={classes.imagePhoto} style={{ backgroundImage: `url(${DeluxeTwinRoomImg})` }} />
              <div>
                <div>Deluxe Twin Room</div>
                <div>
                  <div>
                    {Array(3).fill(null).map((): JSX.Element => (
                      <SvgIcon key={uuidv4()} viewBox="0 0 10.776 25.5">
                        <g opacity="0.44" transform="translate(-15.459)">
                          <g transform="translate(15.459 0)">
                            <circle fill="#3d321f" cx="2.146" cy="2.146" r="2.146" transform="translate(3.2)" />
                            <path fill="#3d321f" d="M21.553,11.078a3.908,3.908,0,0,0-1.642.02c-3.568.418-4.727,4.549-4.4,7.7.142,1.362,2.288,1.376,2.145,0a8.175,8.175,0,0,1,.542-4.111v4.489c0,.053.005.1.008.153,0,.024-.007.045-.007.07,0,3.562-.006,7.122-.153,10.681-.065,1.582,2.388,1.576,2.453,0,.115-2.789.144-5.58.151-8.371a2.838,2.838,0,0,0,.349,0c.007,2.791.035,5.582.15,8.37.065,1.576,2.518,1.582,2.453,0-.147-3.559-.152-7.119-.152-10.681a1.344,1.344,0,0,0-.037-.308c0-1.546-.062-3.094-.044-4.64a7.781,7.781,0,0,1,.671,4.346c-.144,1.375,2,1.361,2.145,0C26.517,15.58,25.3,11.343,21.553,11.078Z" transform="translate(-15.459 -5.762)" />
                          </g>
                        </g>
                      </SvgIcon>
                    ))}
                    {Array(3).fill(null).map((): JSX.Element => (
                      <SvgIcon key={uuidv4()} viewBox="0 0 40.121 25.5">
                        <g opacity="0.44" transform="translate(0 -87.994)">
                          <path fill="#3d321f" d="M44.486,95.69a3.8,3.8,0,0,1,3.8-3.8h8.525A3.8,3.8,0,0,1,59.979,93.6a3.8,3.8,0,0,1,3.171-1.711h8.525a3.8,3.8,0,0,1,3.8,3.8v.175h.951v-3.7a4.172,4.172,0,0,0-4.168-4.168H47.7a4.172,4.172,0,0,0-4.168,4.168v3.7h.951V95.69Z" transform="translate(-39.918)" />
                          <path fill="#3d321f" d="M38.525,204.076H1.6a1.6,1.6,0,0,0-1.6,1.6v9.265a1.6,1.6,0,0,0,1.6,1.6H2.26l-.785,2.216a.887.887,0,1,0,1.672.592l.995-2.808H35.979l.995,2.808a.887.887,0,1,0,1.672-.592l-.785-2.216h.664a1.6,1.6,0,0,0,1.6-1.6v-9.265A1.6,1.6,0,0,0,38.525,204.076Z" transform="translate(0 -106.438)" />
                          <path fill="#3d321f" d="M257.287,156.262a2.026,2.026,0,0,0-2.024,2.024v.175h12.573v-.175a2.026,2.026,0,0,0-2.024-2.024Z" transform="translate(-234.056 -62.596)" />
                          <path fill="#3d321f" d="M78.349,156.262a2.026,2.026,0,0,0-2.024,2.024v.175H88.9v-.175a2.026,2.026,0,0,0-2.024-2.024Z" transform="translate(-69.984 -62.596)" />
                        </g>
                      </SvgIcon>
                    ))}
                    {Array(3).fill(null).map((): JSX.Element => (
                      <SvgIcon key={uuidv4()} viewBox="0 0 26.808 25.5">
                        <g opacity="0.44" transform="translate(0 -10.979)">
                          <path fill="#3d321f" d="M126.038,106.233h-8.525a2.282,2.282,0,0,0-2.279,2.279v.416s0,.009,0,.014h13.085s0-.009,0-.014v-.416A2.282,2.282,0,0,0,126.038,106.233Z" transform="translate(-108.372 -89.582)" />
                          <path fill="#3d321f" d="M62.726,19.346V18.93a3.546,3.546,0,0,1,3.542-3.542h8.525a3.546,3.546,0,0,1,3.542,3.542v.416s0,.009,0,.014h1.983V15.4A4.428,4.428,0,0,0,75.9,10.979H65.167A4.428,4.428,0,0,0,60.744,15.4V19.36h1.983S62.726,19.351,62.726,19.346Z" transform="translate(-57.127)" />
                          <path fill="#3d321f" d="M24.956,172.948H1.851A1.853,1.853,0,0,0,0,174.8v9.265a1.853,1.853,0,0,0,1.851,1.851H2.7l-.725,2.046a.632.632,0,1,0,1.191.422l.874-2.467H22.772l.874,2.467a.632.632,0,0,0,1.191-.422l-.725-2.046h.845a1.853,1.853,0,0,0,1.851-1.851V174.8A1.853,1.853,0,0,0,24.956,172.948Z" transform="translate(0 -152.325)" />
                        </g>
                      </SvgIcon>
                    ))}
                  </div>
                  <div>
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
