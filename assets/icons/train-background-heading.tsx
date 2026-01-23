import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';
const TrainBackgroundHeading = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <Circle cx={24} cy={24} r={18} fill="#fafafa" />
    <Path fill="#f82217" d="m24 0 7.794 7.8H16.206L24 0Z" />
  </Svg>
);
export default TrainBackgroundHeading;
