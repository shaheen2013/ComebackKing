import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function EyeSvg(props: SvgProps) {
  return (
    <Svg
      width={props.width || 24}
      height={props.height || 25}
      viewBox="0 0 24 25"
      fill="none"
      {...props}>
      <Path
        d="M6.984 13.125v.003a.5.5 0 01-.612.355c-.431-.114-.355-.611-.355-.611l.018-.062s.026-.084.047-.145a6.7 6.7 0 011.117-1.982C8.096 9.589 9.605 8.5 12 8.5s3.904 1.089 4.802 2.183a6.7 6.7 0 011.117 1.982 4.075 4.075 0 01.06.187l.003.013v.004l.001.002a.5.5 0 01-.966.258l-.001-.004-.007-.025a4.87 4.87 0 00-.2-.52 5.695 5.695 0 00-.78-1.263C15.285 10.412 14.043 9.5 12 9.5c-2.044 0-3.285.912-4.028 1.817a5.7 5.7 0 00-.945 1.674 3.037 3.037 0 00-.035.109l-.008.025zM12 11.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM10.5 14a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
        fill={props.color || '#242424'}
      />
    </Svg>
  );
}

export default EyeSvg;
