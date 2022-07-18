import React, { Component } from "react";

class LazyImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isReady: true });
    }, 20);
  }

  render() {
    const { isReady } = this.state;
    const { src, className } = this.props;

    return isReady ? (
      <img className={className || ``} src={src} alt="" />
    ) : null;
  }
}

export default LazyImage;
