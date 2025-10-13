/**
 * Error handling utilities for Minifolio portfolio template
 * Provides comprehensive error management and user feedback
 */

import { useState, useCallback, useEffect } from 'react';

export interface ErrorInfo {
  id: string;
  message: string;
  stack?: string;
  timestamp: number;
  type: 'error' | 'warning' | 'info';
  context?: Record<string, any>;
  recoverable: boolean;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorManager {
  private errors: ErrorInfo[] = [];
  private maxErrors = 50;
  private errorHandlers: Array<(error: ErrorInfo) => void> = [];

  /**
   * Log an error
   */
  logError(error: Error, context?: Record<string, any>, type: ErrorInfo['type'] = 'error'): ErrorInfo {
    const errorInfo: ErrorInfo = {
      id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      type,
      context,
      recoverable: true
    };

    this.errors.push(errorInfo);

    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Notify error handlers
    this.errorHandlers.forEach(handler => handler(errorInfo));

    console.error(`[Error Manager] ${errorInfo.message}`, errorInfo);
    return errorInfo;
  }

  /**
   * Log a warning
   */
  logWarning(message: string, context?: Record<string, any>): ErrorInfo {
    const errorInfo: ErrorInfo = {
      id: `warning-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      timestamp: Date.now(),
      type: 'warning',
      context,
      recoverable: true
    };

    this.errors.push(errorInfo);
    console.warn(`[Error Manager] ${message}`, context);
    return errorInfo;
  }

  /**
   * Log an info message
   */
  logInfo(message: string, context?: Record<string, any>): ErrorInfo {
    const errorInfo: ErrorInfo = {
      id: `info-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      timestamp: Date.now(),
      type: 'info',
      context,
      recoverable: true
    };

    this.errors.push(errorInfo);
    console.info(`[Error Manager] ${message}`, context);
    return errorInfo;
  }

  /**
   * Add error handler
   */
  addErrorHandler(handler: (error: ErrorInfo) => void): () => void {
    this.errorHandlers.push(handler);
    return () => {
      const index = this.errorHandlers.indexOf(handler);
      if (index > -1) {
        this.errorHandlers.splice(index, 1);
      }
    };
  }

  /**
   * Get all errors
   */
  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  /**
   * Get errors by type
   */
  getErrorsByType(type: ErrorInfo['type']): ErrorInfo[] {
    return this.errors.filter(error => error.type === type);
  }

  /**
   * Get recent errors
   */
  getRecentErrors(count: number = 10): ErrorInfo[] {
    return this.errors.slice(-count);
  }

  /**
   * Clear all errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Clear errors by type
   */
  clearErrorsByType(type: ErrorInfo['type']): void {
    this.errors = this.errors.filter(error => error.type !== type);
  }

  /**
   * Get error statistics
   */
  getErrorStats(): {
    total: number;
    byType: Record<string, number>;
    recent: number;
    recoverable: number;
  } {
    const total = this.errors.length;
    const byType = this.errors.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recent = this.errors.filter(error => 
      Date.now() - error.timestamp < 60000 // Last minute
    ).length;

    const recoverable = this.errors.filter(error => error.recoverable).length;

    return {
      total,
      byType,
      recent,
      recoverable
    };
  }

  /**
   * Export errors as JSON
   */
  exportErrors(): string {
    return JSON.stringify({
      errors: this.errors,
      stats: this.getErrorStats(),
      timestamp: Date.now()
    }, null, 2);
  }
}

// Global error manager instance
const errorManager = new ErrorManager();

/**
 * React hook for error handling
 */
export function useErrorHandling() {
  const [errors, setErrors] = useState<ErrorInfo[]>([]);

  const logError = useCallback((error: Error, context?: Record<string, any>, type: ErrorInfo['type'] = 'error') => {
    const errorInfo = errorManager.logError(error, context, type);
    setErrors(prev => [...prev.slice(-10), errorInfo]);
    return errorInfo;
  }, []);

  const logWarning = useCallback((message: string, context?: Record<string, any>) => {
    const errorInfo = errorManager.logWarning(message, context);
    setErrors(prev => [...prev.slice(-10), errorInfo]);
    return errorInfo;
  }, []);

  const logInfo = useCallback((message: string, context?: Record<string, any>) => {
    const errorInfo = errorManager.logInfo(message, context);
    setErrors(prev => [...prev.slice(-10), errorInfo]);
    return errorInfo;
  }, []);

  const clearErrors = useCallback(() => {
    errorManager.clearErrors();
    setErrors([]);
  }, []);

  const getErrorStats = useCallback(() => {
    return errorManager.getErrorStats();
  }, []);

  const exportErrors = useCallback(() => {
    return errorManager.exportErrors();
  }, []);

  // Setup error handler on mount
  useEffect(() => {
    const removeHandler = errorManager.addErrorHandler((errorInfo) => {
      setErrors(prev => [...prev.slice(-10), errorInfo]);
    });

    return removeHandler;
  }, []);

  return {
    errors,
    logError,
    logWarning,
    logInfo,
    clearErrors,
    getErrorStats,
    exportErrors
  };
}

/**
 * Error boundary component
 */
export class ErrorBoundary extends React.Component<
  { 
    children: React.ReactNode; 
    fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error
    errorManager.logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true
    });

    // Call custom error handler
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      return (
        <div className="error-boundary" role="alert" aria-labelledby="error-title">
          <h2 id="error-title">Something went wrong</h2>
          <p>An error occurred while rendering this component.</p>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.stack}</pre>
          </details>
          <button onClick={this.resetError} className="retry-button">
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Default error fallback component
 */
export function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="error-fallback" role="alert" aria-labelledby="error-title">
      <h2 id="error-title">Oops! Something went wrong</h2>
      <p>We're sorry, but something unexpected happened.</p>
      <details>
        <summary>Error details</summary>
        <pre>{error.message}</pre>
      </details>
      <div className="error-actions">
        <button onClick={resetError} className="retry-button">
          Try again
        </button>
        <button onClick={() => window.location.reload()} className="reload-button">
          Reload page
        </button>
      </div>
    </div>
  );
}

/**
 * Error notification component
 */
export function ErrorNotification({ error, onDismiss }: { 
  error: ErrorInfo; 
  onDismiss: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Allow fade out animation
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  return (
    <div 
      className={`error-notification error-notification--${error.type}`}
      role="alert"
      aria-live="polite"
    >
      <div className="error-notification__content">
        <span className="error-notification__message">{error.message}</span>
        {error.context && (
          <details className="error-notification__details">
            <summary>Details</summary>
            <pre>{JSON.stringify(error.context, null, 2)}</pre>
          </details>
        )}
      </div>
      <button 
        className="error-notification__dismiss"
        onClick={() => {
          setIsVisible(false);
          setTimeout(onDismiss, 300);
        }}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}

/**
 * Error notifications container
 */
export function ErrorNotifications() {
  const { errors, clearErrors } = useErrorHandling();
  const [dismissedErrors, setDismissedErrors] = useState<Set<string>>(new Set());

  const handleDismiss = useCallback((errorId: string) => {
    setDismissedErrors(prev => new Set([...prev, errorId]));
  }, []);

  const visibleErrors = errors.filter(error => !dismissedErrors.has(error.id));

  return (
    <div className="error-notifications">
      {visibleErrors.map(error => (
        <ErrorNotification
          key={error.id}
          error={error}
          onDismiss={() => handleDismiss(error.id)}
        />
      ))}
      {visibleErrors.length > 0 && (
        <button 
          className="clear-all-errors"
          onClick={clearErrors}
          aria-label="Clear all error notifications"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

/**
 * Safe async wrapper
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  context?: Record<string, any>
): Promise<{ success: true; data: T } | { success: false; error: ErrorInfo }> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    const errorInfo = errorManager.logError(
      error instanceof Error ? error : new Error(String(error)),
      context
    );
    return { success: false, error: errorInfo };
  }
}

/**
 * Error handling styles
 */
export const errorStyles = `
  .error-boundary {
    padding: 2rem;
    margin: 1rem;
    border: 2px solid #e74c3c;
    border-radius: 8px;
    background: #fdf2f2;
    color: #721c24;
  }

  .error-boundary h2 {
    color: #e74c3c;
    margin-bottom: 1rem;
  }

  .error-boundary details {
    margin: 1rem 0;
  }

  .error-boundary pre {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.875rem;
  }

  .retry-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 0.5rem;
  }

  .retry-button:hover {
    background: #0056b3;
  }

  .reload-button {
    background: #6c757d;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .reload-button:hover {
    background: #545b62;
  }

  .error-notification {
    position: fixed;
    top: 1rem;
    right: 1rem;
    max-width: 400px;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    animation: slideIn 0.3s ease-out;
  }

  .error-notification--error {
    background: #fdf2f2;
    border: 1px solid #e74c3c;
    color: #721c24;
  }

  .error-notification--warning {
    background: #fefce8;
    border: 1px solid #f59e0b;
    color: #92400e;
  }

  .error-notification--info {
    background: #eff6ff;
    border: 1px solid #3b82f6;
    color: #1e40af;
  }

  .error-notification__content {
    flex: 1;
  }

  .error-notification__message {
    font-weight: 500;
  }

  .error-notification__details {
    margin-top: 0.5rem;
  }

  .error-notification__details summary {
    cursor: pointer;
    font-size: 0.875rem;
  }

  .error-notification__details pre {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    background: rgba(0, 0, 0, 0.05);
    padding: 0.5rem;
    border-radius: 4px;
    overflow-x: auto;
  }

  .error-notification__dismiss {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    opacity: 0.7;
  }

  .error-notification__dismiss:hover {
    opacity: 1;
  }

  .error-notifications {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .clear-all-errors {
    background: #6c757d;
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.75rem;
    margin-top: 0.5rem;
  }

  .clear-all-errors:hover {
    background: #545b62;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .error-notification {
      animation: none;
    }
  }
`;

export default errorManager;




