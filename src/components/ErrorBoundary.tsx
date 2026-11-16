import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * If a page crashes while rendering, show a friendly card instead of a blank screen.
 * Moving to another page (a new `resetKey`) clears the error.
 * Also covers a lazy page chunk that fails to download (e.g. an old tab after a new deploy).
 */
export default class ErrorBoundary extends Component<{ children: ReactNode; resetKey: string }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidUpdate(prev: { resetKey: string }) {
    if (this.state.failed && prev.resetKey !== this.props.resetKey) this.setState({ failed: false });
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page crashed:', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="section crash">
        <div className="container crash-card" role="alert">
          <span className="kicker">Something went wrong</span>
          <h1>This page hit a snag</h1>
          <p className="muted">
            Your progress is safe. Reloading usually fixes it, especially if the site was just updated.
          </p>
          <div className="crash-actions">
            <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
              Reload the page
            </button>
            <a className="btn btn-ghost" href="#/">Go to the home page</a>
          </div>
        </div>
      </section>
    );
  }
}
