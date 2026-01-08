import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Input error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="text-red-500 text-sm mt-1">
          Error rendering field: {this.state.errorMessage}
        </p>
      );
    }

    return this.props.children;
  }
}
