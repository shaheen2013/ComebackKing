import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function MenuBar(props: SvgProps) {
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={29}
      viewBox="0 0 28 29"
      fill="none"
      {...props}>
      <Path
        d="M3.5 14.5h16.333M3.5 7.5h21m-21 14h21"
        stroke="#0F274F"
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default MenuBar;
