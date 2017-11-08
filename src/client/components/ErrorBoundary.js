import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    error: null,
    info: null,
    reload: false,
  };

  reload = () => {
    this.setState({ reload: !this.state.reload });
  };

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    if (this.state.error) {
      return (
        <span>
          <h3>{this.state.error.message}</h3>
          <span style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.info.componentStack}
          </span>
        </span>
      );
    }
    return this.props.children;
  }
}
