import React, { Component } from 'react';
import styled from 'react-emotion';

import ErrorBoundary from '../ErrorBoundary';

import styles from './styles.module.css';
import webpackLogo from '../../../../static/webpack-logo.jpg';
import reactLogo from './img/react-logo.png';

import Header from '../HeaderWithSCSS';

const Container = styled.div`
  background: #fb2;
  padding: 30px 30px;
`;

class App extends Component {
  state = {
    count: 1,
  };

  handleClick = () => {
    this.setState(() => ({ count: this.state.count + 1 }));
  };

  render() {
    if (this.state.count > 5) {
      throw new Error('Oops, something went wrong...');
    }

    return (
      <Container className={styles.app}>
        <Header caption={this.props.caption} />
        <img
          onClick={this.handleClick}
          src={webpackLogo}
          alt="Webpack Logo from global folder"
          width={128}
          height={128}
        />
        <img
          src={reactLogo}
          alt="React Logo from local folder"
          width={256}
          height={128}
        />
      </Container>
    );
  }
}

const AppWithErrorBoundary = props => (
  <div className="global-app">
    <h1>Hey!!</h1>
    <ErrorBoundary>
      <App {...props} />
    </ErrorBoundary>
    <ErrorBoundary>
      <App {...props} />
    </ErrorBoundary>
  </div>
);

export default AppWithErrorBoundary;
