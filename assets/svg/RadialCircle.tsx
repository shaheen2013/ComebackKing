import React from 'react';
import Svg, {
  Circle,
  G,
  Ellipse,
  Defs,
  Filter,
  FeFlood,
  FeBlend,
  FeGaussianBlur,
  SvgProps,
} from 'react-native-svg';

const RadialCircle = ({width = 128, height = 110}: SvgProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 128 110" fill="none">
      <Circle cx="63" cy="55" r="50" fill="#E8EBF3" />
      <G filter="url(#filter0_f_1143_3933)">
        <Ellipse
          cx="79.7625"
          cy="49.3174"
          rx="22.7273"
          ry="23.8636"
          fill="#6A23EA"
        />
      </G>
      <G filter="url(#filter1_f_1143_3933)">
        <Ellipse
          cx="46.808"
          cy="43.6355"
          rx="21.5909"
          ry="15.9091"
          fill="#A904D2"
        />
      </G>
      <G filter="url(#filter2_f_1143_3933)">
        <Ellipse
          cx="52.4897"
          cy="68.6355"
          rx="22.7273"
          ry="15.9091"
          fill="#00EAFF"
        />
      </G>
      <Defs>
        <Filter
          id="filter0_f_1143_3933"
          x="32.0352"
          y="0.453735"
          width="95.4545"
          height="97.7273"
          filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="12.5"
            result="effect1_foregroundBlur_1143_3933"
          />
        </Filter>
        <Filter
          id="filter1_f_1143_3933"
          x="0.217041"
          y="2.72644"
          width="93.1818"
          height="81.8182"
          filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="12.5"
            result="effect1_foregroundBlur_1143_3933"
          />
        </Filter>
        <Filter
          id="filter2_f_1143_3933"
          x="4.76245"
          y="27.7264"
          width="95.4546"
          height="81.8182"
          filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="12.5"
            result="effect1_foregroundBlur_1143_3933"
          />
        </Filter>
      </Defs>
    </Svg>
  );
};

export default RadialCircle;
