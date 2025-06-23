import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function EmailSvg(props: SvgProps) {
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}>
      <Path
        d="M15.5 4A2.5 2.5 0 0118 6.5v8a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 14.5v-8A2.5 2.5 0 014.5 4h11zM17 7.961l-6.746 3.97a.5.5 0 01-.426.038l-.082-.038L3 7.963V14.5A1.5 1.5 0 004.5 16h11a1.5 1.5 0 001.5-1.5V7.961zM15.5 5h-11A1.5 1.5 0 003 6.5v.302l7 4.118L17 6.8V6.5A1.5 1.5 0 0015.5 5z"
        fill="#0F274F"
      />
    </Svg>
  );
}

export default EmailSvg;
