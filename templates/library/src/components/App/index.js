import React, { Component } from 'react';
import styled from 'react-emotion';

import ErrorBoundary from '../ErrorBoundary';

import styles from './styles.module.css';
import reactLogo from './img/react-logo.png';

import Header from '../Header';

const Container = styled.div`
  background: #fb2;
  padding: 30px 30px;
`;

export class App extends Component {
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
          src={reactLogo}
          alt="React Logo from local folder"
          width={256}
          height={128}
        />
      </Container>
    );
  }
}

export const AppWithErrorBoundary = props => (
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
