import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function HistorySvg(props: SvgProps) {
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={props.height || 61}
      height={props.width || 60}
      viewBox="0 0 61 60"
      fill="none"
      {...props}>
      <Path
        d="M30.5 10.625c10.7 0 19.375 8.674 19.375 19.375 0 10.7-8.675 19.375-19.375 19.375S11.125 40.7 11.125 30c0-1.083.089-2.145.26-3.178a1.563 1.563 0 10-3.084-.508C8.103 27.514 8 28.746 8 30c0 12.426 10.074 22.5 22.5 22.5S53 42.426 53 30 42.926 7.5 30.5 7.5c-6.07 0-11.58 2.405-15.625 6.31v-3.498a1.563 1.563 0 00-3.125 0v8.126c0 .862.7 1.562 1.563 1.562h8.124a1.563 1.563 0 000-3.125h-5.19a19.32 19.32 0 0114.253-6.25zm1.25 7.188a1.563 1.563 0 00-3.125 0v12.5c0 .862.7 1.562 1.563 1.562h8.75a1.563 1.563 0 000-3.125H31.75V17.812z"
        fill={props.color || '#C3C9D3'}
      />
    </Svg>
  );
}

export default HistorySvg;
