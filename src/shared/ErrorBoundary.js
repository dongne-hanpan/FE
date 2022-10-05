import React from 'react';
import Loading from '../components/univ/Loading';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Loading size={40} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;