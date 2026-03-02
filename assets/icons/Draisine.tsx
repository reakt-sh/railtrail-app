import Svg, { Circle, Path, Rect, SvgProps } from 'react-native-svg';

interface DraisineIconProps extends SvgProps {
  width?: number;
  height?: number;
  color?: string;
}

const DraisineIcon = ({ width = 96, height = 96, color = '#000', ...props }: DraisineIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 500 500" {...props}>
    {/* Räder */}
    <Circle cx={100} cy={425} r={60} stroke={color} strokeWidth={25} fill="none" />
    <Circle cx={400} cy={425} r={60} stroke={color} strokeWidth={25} fill="none" />
    {/* A-Rahmen und Griff */}
    <Path
      d="M 250,60 410,320 M 250,60 90,320 M 220,50 h 90"
      stroke={color}
      strokeWidth={25}
      strokeLinecap="round"
      fill="none"
    />
    {/* Sitz/Lenker */}
    <Path d="m 205,215 40,0 10,80 40,0" stroke={color} strokeWidth={25} fill="none" />
    {/* Horizontale Stange */}
    <Path d="m 130,255 h 240" stroke={color} strokeWidth={14} fill="none" />
    {/* Plattform */}
    <Rect x={10} y={320} width={480} height={50} fill={color} />
    {/* Mittelpunkt */}
    <Circle cx={250} cy={255} r={22} fill={color} />
  </Svg>
);

export default DraisineIcon;
