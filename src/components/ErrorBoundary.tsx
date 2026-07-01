import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('App Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          backgroundColor: '#111B26',
          color: '#F0F4F8',
          padding: '20px',
          fontFamily: 'monospace',
          height: '100vh',
          overflow: 'auto',
        }}>
          <h1 style={{ color: '#F9701F' }}>⚠️ Application Error</h1>
          <p>{this.state.error?.message}</p>
          <pre style={{ backgroundColor: '#1D2A3A', padding: '10px', borderRadius: '4px' }}>
            {this.state.error?.stack}
          </pre>
          <p style={{ marginTop: '20px', fontSize: '12px', color: '#8F9194' }}>
            Check browser console for more details.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
