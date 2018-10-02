import React from 'react';

const Loader = (props) => (
    <svg viewBox="0 0 120 160">
      <circle className="outer" onAnimationEnd={props.reset} strokeWidth="20" fill="transparent" stroke="green" r="50" cx="60" cy="60" />
      <g className="tick" fill="green">
        <rect transform="rotate(-45)" x="-22.4" y="83.9" width="50" height="10" />
        <rect transform="rotate(225)" x="-93.9" y="-22.4" width="25" height="10" />
      </g>
    </svg>
)

export default Loader;