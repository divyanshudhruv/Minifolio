/**
 * Performance monitoring utilities for Minifolio portfolio template
 * Provides comprehensive performance tracking and optimization features
 */

import { useEffect, useRef, useCallback, useState } from 'react';

export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  type: 'navigation' | 'component' | 'interaction' | 'resource';
  metadata?: Record<string, any>;
}

export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private timers: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];
  private maxMetrics = 100;

  /**
   * Start timing an operation
   */
  startTimer(name: string): void {
    if (this.timers.has(name)) {
      console.warn(`Timer '${name}' is already running. Overwriting is not allowed.`);
      return;
    }
    this.timers.set(name, performance.now());
  }

  /**
   * End timing an operation and record the metric
   */
  endTimer(name: string, type: PerformanceMetric['type'] = 'component', metadata?: Record<string, any>): number {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`Timer '${name}' was not started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(name);

    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      type,
      metadata
    };

    this.metrics.push(metric);

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  /**
   * Measure component render time
   */
  measureComponent(componentName: string, renderFn: () => void): void {
    this.startTimer(`component-${componentName}`);
    renderFn();
    this.endTimer(`component-${componentName}`, 'component', { component: componentName });
  }

  /**
   * Measure async operation
   */
  async measureAsync<T>(name: string, operation: () => Promise<T>, type: PerformanceMetric['type'] = 'component'): Promise<T> {
    this.startTimer(name);
    try {
      const result = await operation();
      this.endTimer(name, type);
      return result;
    } catch (error) {
      this.endTimer(name, type, { error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  /**
   * Get performance statistics
   */
  getStats(): {
    total: number;
    average: number;
    slowest: PerformanceMetric[];
    fastest: PerformanceMetric[];
    byType: Record<string, PerformanceMetric[]>;
  } {
    const total = this.metrics.reduce((sum, metric) => sum + metric.duration, 0);
    const average = this.metrics.length > 0 ? total / this.metrics.length : 0;

    const slowest = [...this.metrics]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);

    const fastest = [...this.metrics]
      .sort((a, b) => a.duration - b.duration)
      .slice(0, 5);

    const byType = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.type]) {
        acc[metric.type] = [];
      }
      acc[metric.type].push(metric);
      return acc;
    }, {} as Record<string, PerformanceMetric[]>);

    return {
      total,
      average,
      slowest,
      fastest,
      byType
    };
  }

  /**
   * Get metrics by name
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name.includes(name));
  }

  /**
   * Get slow operations (above threshold)
   */
  getSlowOperations(threshold: number = 100): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.duration > threshold);
  }

  /**
   * Setup Web Vitals monitoring
   */
  setupWebVitals(onMetric?: (metric: WebVitalsMetric) => void): void {
    if (typeof window === 'undefined') return;

    // Core Web Vitals
    const vitals = ['CLS', 'FID', 'FCP', 'LCP', 'TTFB'] as const;

    vitals.forEach(vital => {
      try {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          const getMetric = {
            CLS: getCLS,
            FID: getFID,
            FCP: getFCP,
            LCP: getLCP,
            TTFB: getTTFB
          }[vital];

          if (getMetric) {
            getMetric((metric) => {
              const webVitalsMetric: WebVitalsMetric = {
                name: vital,
                value: metric.value,
                delta: metric.delta,
                id: metric.id,
                navigationType: metric.navigationType
              };

              // Record as performance metric
              this.metrics.push({
                name: `web-vitals-${vital}`,
                duration: metric.value,
                timestamp: Date.now(),
                type: 'resource',
                metadata: {
                  delta: metric.delta,
                  id: metric.id,
                  navigationType: metric.navigationType
                }
              });

              onMetric?.(webVitalsMetric);
              console.log(`[Web Vitals] ${vital}: ${metric.value}`);
            });
          }
        }).catch((error) => {
          console.warn(`Web Vitals monitoring is optional and failed to load for ${vital}. This is expected if the package is not installed.`, error);
        });
      } catch (error) {
        console.warn(`Failed to load Web Vitals for ${vital}:`, error);
      }
    });
  }

  /**
   * Setup resource timing monitoring
   */
  setupResourceMonitoring(): void {
    if (typeof window === 'undefined') return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            this.metrics.push({
              name: `resource-${entry.name}`,
              duration: entry.duration,
              timestamp: Date.now(),
              type: 'resource',
              metadata: {
                size: (entry as any).transferSize || 0,
                type: entry.name.split('.').pop()
              }
            });
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Failed to setup resource monitoring:', error);
    }
  }

  /**
   * Setup navigation timing monitoring
   */
  setupNavigationMonitoring(): void {
    if (typeof window === 'undefined') return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            this.metrics.push({
              name: 'navigation',
              duration: entry.duration,
              timestamp: Date.now(),
              type: 'navigation',
              metadata: {
                domContentLoaded: (entry as any).domContentLoadedEventEnd - (entry as any).domContentLoadedEventStart,
                loadComplete: (entry as any).loadEventEnd - (entry as any).loadEventStart
              }
            });
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Failed to setup navigation monitoring:', error);
    }
  }

  /**
   * Export metrics as JSON
   */
  exportMetrics(): string {
    return JSON.stringify({
      metrics: this.metrics,
      stats: this.getStats(),
      timestamp: Date.now()
    }, null, 2);
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
    this.timers.clear();
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Global performance monitor instance
const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [webVitals, setWebVitals] = useState<WebVitalsMetric[]>([]);

  const startTimer = useCallback((name: string) => {
    performanceMonitor.startTimer(name);
  }, []);

  const endTimer = useCallback((name: string, type: PerformanceMetric['type'] = 'component', metadata?: Record<string, any>) => {
    return performanceMonitor.endTimer(name, type, metadata);
  }, []);

  const measureComponent = useCallback((componentName: string, renderFn: () => void) => {
    performanceMonitor.measureComponent(componentName, renderFn);
  }, []);

  const measureAsync = useCallback(async <T>(name: string, operation: () => Promise<T>, type: PerformanceMetric['type'] = 'component'): Promise<T> => {
    return performanceMonitor.measureAsync(name, operation, type);
  }, []);

  const getStats = useCallback(() => {
    return performanceMonitor.getStats();
  }, []);

  const getSlowOperations = useCallback((threshold: number = 100) => {
    return performanceMonitor.getSlowOperations(threshold);
  }, []);

  const exportMetrics = useCallback(() => {
    return performanceMonitor.exportMetrics();
  }, []);

  // Setup monitoring on mount
  useEffect(() => {
    performanceMonitor.setupWebVitals((metric) => {
      setWebVitals(prev => [...prev.slice(-10), metric]);
    });

    performanceMonitor.setupResourceMonitoring();
    performanceMonitor.setupNavigationMonitoring();

    // Update metrics periodically
    const interval = setInterval(() => {
      setMetrics(performanceMonitor.getStats().byType.component || []);
    }, 5000);

    return () => {
      clearInterval(interval);
      performanceMonitor.cleanup();
    };
  }, []);

  return {
    metrics,
    webVitals,
    startTimer,
    endTimer,
    measureComponent,
    measureAsync,
    getStats,
    getSlowOperations,
    exportMetrics
  };
}

/**
 * Performance decorator for components
 */
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function PerformanceMonitoredComponent(props: P) {
    const { measureComponent } = usePerformanceMonitoring();

    useEffect(() => {
      measureComponent(componentName, () => {
        // Component render is measured automatically
      });
    }, [measureComponent]);

    return <Component {...props} />;
  };
}

/**
 * Performance boundary component
 */
export function PerformanceBoundary({ children, fallback }: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
}) {
  const { getSlowOperations } = usePerformanceMonitoring();
  const [hasSlowOperations, setHasSlowOperations] = useState(false);

  useEffect(() => {
    const slowOps = getSlowOperations(200); // 200ms threshold
    setHasSlowOperations(slowOps.length > 0);
  }, [getSlowOperations]);

  if (hasSlowOperations && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default performanceMonitor;




