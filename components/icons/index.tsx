import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function TickIcon(props: SvgProps) {
  return (
    <Svg width={32} height={26} viewBox="0 0 32 26" fill="none" {...props}>
      <Path
        d="M15.211 20.959c4.52-4.836 8.883-8.117 14.364-12.762 1.64-1.39 1.894-3.828.607-5.555C28.814.806 26.216.44 24.456 1.899c-5.02 4.164-8.926 8.173-12.63 12.459-.195.224-.292.337-.393.4a.787.787 0 01-.833.005c-.102-.063-.2-.173-.394-.393l-1.974-2.236a4.123 4.123 0 00-6.537.457 4.186 4.186 0 00.379 5.11l3.095 3.433c2.316 2.569 3.474 3.854 4.864 3.866 1.39.012 2.653-1.339 5.178-4.041z"
        fill={props.fill || "#81C784"}
        stroke={props.stroke || "#81C784"}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

function CancelIcon(props: SvgProps) {
  return (
    <Svg width={30} height={30} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109C18.717 21.5 16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391C2.5 18.717 2.5 16.479 2.5 12z"
        fill="#89BEFF"
        stroke="#89BEFF"
        strokeWidth={1.5}
      />
      <Path
        d="M16 8l-8 8m8 0L8 8"
        stroke="#FFE7D5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export { TickIcon, CancelIcon };
