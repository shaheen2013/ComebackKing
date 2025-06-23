import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

function GoogleSvg(props: SvgProps) {
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width={props.width || 21}
      height={props.height || 21}
      viewBox="0 0 21 21"
      fill="none"
      {...props}>
      <G clipPath="url(#clip0_968_603)">
        <Path
          d="M20.262 10.687c0-.82-.067-1.417-.21-2.037h-9.357v3.698h5.492c-.11.92-.709 2.303-2.038 3.233l-.018.124 2.958 2.292.205.02c1.883-1.738 2.968-4.296 2.968-7.33z"
          fill="#4285F4"
        />
        <Path
          d="M10.695 20.431c2.69 0 4.95-.886 6.6-2.414l-3.146-2.436c-.841.587-1.97.997-3.454.997-2.636 0-4.872-1.739-5.67-4.141l-.117.01-3.076 2.38-.04.112a9.958 9.958 0 008.903 5.492z"
          fill="#34A853"
        />
        <Path
          d="M5.025 12.437a6.135 6.135 0 01-.332-1.971c0-.687.122-1.351.321-1.971l-.005-.132-3.115-2.42-.102.05a9.975 9.975 0 00-1.063 4.473c0 1.605.388 3.122 1.063 4.473l3.233-2.502z"
          fill="#FBBC05"
        />
        <Path
          d="M10.695 4.353c1.871 0 3.133.809 3.853 1.484l2.812-2.746C15.633 1.485 13.385.5 10.695.5a9.958 9.958 0 00-8.903 5.492l3.222 2.503c.809-2.403 3.045-4.142 5.68-4.142z"
          fill="#EB4335"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_968_603">
          <Path fill="#fff" transform="translate(.5 .5)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default GoogleSvg;
