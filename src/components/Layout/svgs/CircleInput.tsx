import React from 'react'
import Colors from '../../../Theme/Colors'

interface CircleInputProps extends React.HTMLAttributes<SVGElement> {
  percent: number
  width: number
  token: string
  onMax: () => void
}

export const CircleInput: React.FC<CircleInputProps> = ({
  percent,
  width,
  onClick,
  onMax,
  token,
  ...rest
}) => {
  percent = percent > 0 ? percent * 10 : 0
  const strokeCalculate = () =>
    `0,${percent % 1000},0,${1000 - (percent % 1000)}`

  return (
    <svg
      style={{
        position: 'absolute',
        zIndex: 15,
        top: 0,
        left: 0,
        width: width,
        touchAction: 'none',
      }}
      viewBox="0 0 360 360"
      {...rest}
    >
      <g onClick={onClick}>
        <circle r="160" cx="180" cy="180" fill={Colors.background} />
        <path
          fill="none"
          stroke={percent <= 1000 ? Colors.green : Colors.red}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${percent},1000`}
          d="M 180 20 
          a 160 160 0 0 1 0 320 
          a 160 160 0 0 1 0 -320"
        />
        <path
          fill="none"
          stroke={percent === Infinity ? 'red' : 'white'}
          strokeWidth="25"
          strokeLinecap="round"
          strokeDasharray={strokeCalculate()}
          d="M180 20.845
          a 159.155 159.155 0 0 1 0 318.31
          a 159.155 159.155 0 0 1 0 -318.31"
        />
        <path
          d="M 180 90 L 290 90 C 230 20 130 20 70 90 L 180 90"
          fill="white"
        />
        <text
          x="175"
          y="70"
          fontSize="25"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {token}
        </text>
      </g>
      <g onClick={() => onMax()}>
        <path
          d="M 180 270 L 290 270 C 230 340 130 340 70 270 L 180 270"
          fill={Colors.green}
          strokeWidth="2"
          stroke="white"
        />
        <text
          x="175"
          y="295"
          fontSize="25"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          MAX
        </text>
      </g>
    </svg>
  )
}