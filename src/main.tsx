import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class RootErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('CRITICAL REACT CRASH CAUGHT:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          padding: '30px',
          backgroundColor: '#1e1e2e',
          color: '#ff5555',
          fontFamily: 'monospace',
          overflow: 'auto'
        }}>
          <h1 style={{ color: '#ff6e6e', fontSize: '24px' }}>Application Render Error</h1>
          <p style={{ color: '#fff', fontSize: '16px' }}>{this.state.error?.toString()}</p>
          <pre style={{ color: '#f1fa8c', background: '#111', padding: '15px', borderRadius: '8px', overflow: 'auto' }}>
            {this.state.error?.stack}
          </pre>
          <pre style={{ color: '#8be9fd', background: '#111', padding: '15px', borderRadius: '8px', overflow: 'auto', marginTop: '10px' }}>
            {this.state.errorInfo?.componentStack}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#50fa7b',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>,
)
