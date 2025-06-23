import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function VideoPlaySvg(props: SvgProps) {
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}>
      <Path
        d="M4.208 5.917A6.854 6.854 0 112.992 9.41a.517.517 0 00-.503-.557.465.465 0 00-.47.426 7.833 7.833 0 101.45-4.015V3.47a.49.49 0 00-.98 0v2.937c0 .27.22.49.49.49h2.938a.49.49 0 000-.98h-1.71zm3.667 1.715a.98.98 0 011.46-.854l3.913 2.204a.98.98 0 010 1.706l-3.914 2.204a.98.98 0 01-1.46-.853V7.632zm4.893 2.203L8.854 7.632v4.407l3.914-2.204z"
        fill="#0F274F"
      />
    </Svg>
  );
}

export default VideoPlaySvg;
