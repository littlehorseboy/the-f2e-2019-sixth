import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles({
  a: {
    fill: 'none',
    strokeMiterlimit: 10,
    stroke: '#3d321f',
  },
  b: {
    fill: 'none',
    strokeMiterlimit: 10,
    stroke: '#000000',
    strokeLinecap: 'round',
  },
});

export default function SheepSmallSvgIcon(): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon viewBox="0 0 22.777 15.067">
      <g transform="translate(-408.965 -732.641)">
        <path className={classes.a} d="M429.881,741.835c.047-.491.075-1.042.075-1.66a12.6,12.6,0,0,0-.908-5.144l.528-.528a.588.588,0,0,0,0-.831h0a.588.588,0,0,0-.831,0l-.586.586a25.093,25.093,0,0,0-8.448-1.117,26.331,26.331,0,0,0-8.347,1.092l-.561-.561a.588.588,0,0,0-.831.831l.435.435a11.868,11.868,0,0,0-.941,5.237,12.2,12.2,0,0,0,.926,5.2l-.42.42a.588.588,0,0,0,.831.831l.515-.516a25.81,25.81,0,0,0,8.393,1.1,26.726,26.726,0,0,0,7.6-.855l.215-.031h.884c2.138.566,2.736-.6,2.827-1.385s-1.474-4.874-4.021-5.252-3.491,1.132-3.491,1.132-2.107-.252-3.019.943,1.258,1.2,1.981,1.038a1.121,1.121,0,0,0,.881-.66" transform="translate(0)" />
        <path className={classes.b} d="M534.4,802.593a1.412,1.412,0,0,0,1.352.472,1.137,1.137,0,0,0,.924-1.045" transform="translate(-105.713 -58.28)" />
        <line className={classes.b} y2="1.352" transform="translate(430.043 744.785)" />
      </g>
    </SvgIcon>
  );
}
