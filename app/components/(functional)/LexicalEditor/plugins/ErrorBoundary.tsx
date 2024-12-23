import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("LexicalEditor error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <div>Something went wrong with the editor.</div>;
    }

    return this.props.children;
  }
}

// eslint-disable-next-line import/no-unused-modules
export default ErrorBoundary;
