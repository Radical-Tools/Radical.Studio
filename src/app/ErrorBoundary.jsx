import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Try to revert state here when we will have back functionality
  static getDerivedStateFromError(error) {
    // eslint-disable-next-line no-console
    console.log('get derived state', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log('catch', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}
ErrorBoundary.propTypes = { children: PropTypes.node.isRequired };
