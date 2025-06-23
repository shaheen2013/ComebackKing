import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function PaymentSvg(props: SvgProps) {
  return (
    <Svg
    //   xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}>
      <Path
        d="M13.646 13.125a.52.52 0 100 1.042h2.083a.52.52 0 000-1.042h-2.083zM1.667 6.615A2.865 2.865 0 014.532 3.75h10.937a2.865 2.865 0 012.865 2.865v6.77a2.865 2.865 0 01-2.865 2.865H4.532a2.865 2.865 0 01-2.865-2.865v-6.77zm2.865-1.823a1.823 1.823 0 00-1.823 1.823v1.302h14.583V6.615a1.823 1.823 0 00-1.823-1.823H4.532zm12.76 4.166H2.709v4.427c0 1.007.816 1.823 1.823 1.823h10.937a1.823 1.823 0 001.823-1.823V8.958z"
        fill="#0F274F"
      />
    </Svg>
  );
}

export default PaymentSvg;
