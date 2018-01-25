import React, { Component } from 'react';

import styles from './styles.module.css';

export default class Header extends Component {
  render() {
    return <h1 className={styles.header}>{this.props.caption}</h1>;
  }
}
