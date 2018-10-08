import React, { Component } from 'react';

class Logo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      possibleBlinks: 0
    }
  }

  tick() {
    this.setState(prevState => ({
      possibleBlinks: prevState.possibleBlinks + 1,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const isBlinking = (Math.random() > 0.5)
    const blinkStyle = isBlinking ? 'blink' : ''
    return (
      <svg id="logo" viewBox="0 0 627 627">
        <g transform="translate(-208 -229)">
          <g fill="#fc0">
            <path className="ear" transform="matrix(.972 -.236 .277 1.14 -135 95.3)" d="m581 477h-304l152-263z" stroke-width=".937" />
            <path className="ear" transform="matrix(-.972 -.236 -.277 1.14 1178 95.3)" d="m581 477h-304l152-263z" stroke-width=".937" />
            <ellipse cx="522" cy="609" rx="260" ry="239" />
          </g>
          <g className={blinkStyle}>
            <g id="righteye">
              <ellipse className="iris" cx="418" cy="539" rx="86.7" ry="79.7" fill="#00f" />
              <ellipse className="pupil" cx="477" cy="539" rx="27" ry="24.8" fill="#fff" />
            </g>
            <g id="lefteye">
              <ellipse className="iris" cx="626" cy="539" rx="86.7" ry="79.7" fill="#00f" />
              <ellipse className="pupil" cx="685" cy="539" rx="27" ry="24.8" fill="#fff" />
            </g>
          </g>
          <path d="m421 698c183 34.8 199-46.4 199-46.4" fill="none" stroke="#000" stroke-width="4.25px" />
        </g>
      </svg>
    )
  }
}

export default Logo;