/**
 * Enhanced Portfolio Component with accessibility and performance features
 * Demonstrates best practices for portfolio development
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAccessibility } from '@/utils/accessibility';
import { usePerformanceMonitoring } from '@/utils/performance';
import { useErrorHandling } from '@/utils/error-handling';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface PortfolioProps {
  items?: PortfolioItem[];
  title?: string;
  description?: string;
}

const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
    image: '/api/placeholder/400/300',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/ecommerce',
    featured: true
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/api/placeholder/400/300',
    technologies: ['Vue.js', 'Firebase', 'WebSocket'],
    liveUrl: 'https://example.com/tasks',
    githubUrl: 'https://github.com/example/tasks'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
    image: '/api/placeholder/400/300',
    technologies: ['Next.js', 'TypeScript', 'OpenWeather API'],
    liveUrl: 'https://example.com/weather',
    githubUrl: 'https://github.com/example/weather'
  }
];

export default function EnhancedPortfolio({ 
  items = defaultPortfolioItems, 
  title = "Portfolio",
  description = "A collection of my recent projects and work"
}: PortfolioProps) {
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(items);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Enhanced utilities
  const { announce, announceSuccess, announceError, focusElement } = useAccessibility();
  const { startTimer, endTimer, measureAsync } = usePerformanceMonitoring();
  const { logError, logWarning, logInfo } = useErrorHandling();

  // Performance monitoring for component mount
  useEffect(() => {
    startTimer('portfolio-component-mount');
    logInfo('Portfolio component mounted');
    
    return () => {
      endTimer('portfolio-component-mount', 'component');
    };
  }, [startTimer, endTimer, logInfo]);

  // Filter items based on selected filter
  const filterItems = useCallback(async (filter: string) => {
    setIsLoading(true);
    startTimer('portfolio-filter');
    
    try {
      await measureAsync('portfolio-filter-operation', async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
        
        if (filter === 'all') {
          setFilteredItems(items);
        } else if (filter === 'featured') {
          setFilteredItems(items.filter(item => item.featured));
        } else {
          setFilteredItems(items.filter(item => 
            item.technologies.some(tech => 
              tech.toLowerCase().includes(filter.toLowerCase())
            )
          ));
        }
        
        setSelectedFilter(filter);
        announceSuccess(`Filtered portfolio to show ${filter} items`);
      }, 'interaction');
      
    } catch (error) {
      logError(error instanceof Error ? error : new Error('Filter operation failed'), {
        filter,
        component: 'Portfolio'
      });
      announceError('Failed to filter portfolio items');
    } finally {
      setIsLoading(false);
      endTimer('portfolio-filter', 'interaction');
    }
  }, [items, startTimer, endTimer, measureAsync, announceSuccess, announceError, logError]);

  // Handle item selection
  const handleItemSelect = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    announce(`Selected project: ${item.title}`);
    focusElement(`#portfolio-item-${item.id}`);
  }, [announce, focusElement]);

  // Handle external link clicks
  const handleExternalLink = useCallback(async (url: string, type: 'live' | 'github') => {
    try {
      await measureAsync(`portfolio-${type}-link`, async () => {
        window.open(url, '_blank', 'noopener,noreferrer');
        announceSuccess(`Opened ${type} link in new tab`);
      }, 'interaction');
    } catch (error) {
      logError(error instanceof Error ? error : new Error('Failed to open external link'), {
        url,
        type,
        component: 'Portfolio'
      });
      announceError(`Failed to open ${type} link`);
    }
  }, [measureAsync, announceSuccess, announceError, logError]);

  // Available filters
  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'featured', label: 'Featured' },
    { key: 'react', label: 'React' },
    { key: 'vue', label: 'Vue.js' },
    { key: 'next', label: 'Next.js' }
  ];

  return (
    <section 
      id="portfolio" 
      className="portfolio-section"
      role="region"
      aria-labelledby="portfolio-title"
      aria-describedby="portfolio-description"
    >
      <div className="portfolio-container">
        {/* Section Header */}
        <header className="portfolio-header">
          <h2 id="portfolio-title" className="portfolio-title">
            {title}
          </h2>
          <p id="portfolio-description" className="portfolio-description">
            {description}
          </p>
        </header>

        {/* Filter Controls */}
        <div className="portfolio-filters" role="group" aria-label="Filter portfolio items">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`portfolio-filter ${selectedFilter === filter.key ? 'active' : ''}`}
              onClick={() => filterItems(filter.key)}
              disabled={isLoading}
              aria-pressed={selectedFilter === filter.key}
              aria-describedby="filter-instructions"
            >
              {filter.label}
              {isLoading && selectedFilter === filter.key && (
                <span className="sr-only">Loading...</span>
              )}
            </button>
          ))}
        </div>
        <p id="filter-instructions" className="sr-only">
          Use these buttons to filter portfolio items by technology or category
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="portfolio-loading" role="status" aria-live="polite">
            <div className="loading-spinner" aria-hidden="true"></div>
            <span>Loading portfolio items...</span>
          </div>
        )}

        {/* Portfolio Grid */}
        <div 
          className="portfolio-grid"
          role="grid"
          aria-label="Portfolio projects"
          aria-rowcount={Math.ceil(filteredItems.length / 2)}
          aria-colcount="2"
        >
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              id={`portfolio-item-${item.id}`}
              className={`portfolio-item ${item.featured ? 'featured' : ''}`}
              role="gridcell"
              aria-rowindex={Math.floor(index / 2) + 1}
              aria-colindex={(index % 2) + 1}
              tabIndex={0}
              onClick={() => handleItemSelect(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleItemSelect(item);
                }
              }}
              aria-describedby={`portfolio-item-${item.id}-description`}
            >
              {/* Project Image */}
              <div className="portfolio-image-container">
                <img
                  src={item.image}
                  alt={`Screenshot of ${item.title} project`}
                  className="portfolio-image"
                  loading="lazy"
                  onError={(e) => {
                    logWarning(`Failed to load image for project: ${item.title}`);
                    e.currentTarget.src = '/api/placeholder/400/300';
                  }}
                />
                {item.featured && (
                  <span className="featured-badge" aria-label="Featured project">
                    Featured
                  </span>
                )}
              </div>

              {/* Project Content */}
              <div className="portfolio-content">
                <h3 className="portfolio-item-title">{item.title}</h3>
                <p 
                  id={`portfolio-item-${item.id}-description`}
                  className="portfolio-item-description"
                >
                  {item.description}
                </p>

                {/* Technologies */}
                <div className="portfolio-technologies" role="list" aria-label="Technologies used">
                  {item.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="portfolio-tech-tag"
                      role="listitem"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="portfolio-actions">
                  {item.liveUrl && (
                    <button
                      className="portfolio-button portfolio-button--primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExternalLink(item.liveUrl!, 'live');
                      }}
                      aria-label={`View live demo of ${item.title}`}
                    >
                      <span aria-hidden="true">🌐</span>
                      Live Demo
                    </button>
                  )}
                  {item.githubUrl && (
                    <button
                      className="portfolio-button portfolio-button--secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExternalLink(item.githubUrl!, 'github');
                      }}
                      aria-label={`View source code for ${item.title} on GitHub`}
                    >
                      <span aria-hidden="true">📁</span>
                      Source Code
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="portfolio-empty" role="status" aria-live="polite">
            <p>No projects found matching the selected filter.</p>
            <button 
              className="portfolio-button portfolio-button--primary"
              onClick={() => filterItems('all')}
            >
              Show All Projects
            </button>
          </div>
        )}

        {/* Project Details Modal */}
        {selectedItem && (
          <div 
            className="portfolio-modal"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            aria-modal="true"
          >
            <div className="portfolio-modal-content">
              <button
                className="portfolio-modal-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close project details"
              >
                ×
              </button>
              
              <h3 id="modal-title">{selectedItem.title}</h3>
              <p id="modal-description">{selectedItem.description}</p>
              
              <div className="portfolio-modal-technologies">
                <h4>Technologies Used:</h4>
                <ul>
                  {selectedItem.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>

              <div className="portfolio-modal-actions">
                {selectedItem.liveUrl && (
                  <button
                    className="portfolio-button portfolio-button--primary"
                    onClick={() => handleExternalLink(selectedItem.liveUrl!, 'live')}
                  >
                    View Live Demo
                  </button>
                )}
                {selectedItem.githubUrl && (
                  <button
                    className="portfolio-button portfolio-button--secondary"
                    onClick={() => handleExternalLink(selectedItem.githubUrl!, 'github')}
                  >
                    View Source Code
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Portfolio Styles */}
      <style jsx>{`
        .portfolio-section {
          padding: 4rem 2rem;
          background: var(--portfolio-bg, #f8f9fa);
          min-height: 100vh;
        }

        .portfolio-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .portfolio-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .portfolio-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary, #333);
          margin-bottom: 1rem;
        }

        .portfolio-description {
          font-size: 1.2rem;
          color: var(--text-secondary, #666);
          max-width: 600px;
          margin: 0 auto;
        }

        .portfolio-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .portfolio-filter {
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--border-color, #ddd);
          background: var(--bg-primary, #fff);
          color: var(--text-primary, #333);
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .portfolio-filter:hover {
          border-color: var(--primary-color, #007bff);
          background: var(--primary-color, #007bff);
          color: white;
        }

        .portfolio-filter.active {
          background: var(--primary-color, #007bff);
          color: white;
          border-color: var(--primary-color, #007bff);
        }

        .portfolio-filter:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .portfolio-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 2rem;
          color: var(--text-secondary, #666);
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-color, #ddd);
          border-top: 2px solid var(--primary-color, #007bff);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .portfolio-item {
          background: var(--bg-primary, #fff);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .portfolio-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: var(--primary-color, #007bff);
        }

        .portfolio-item:focus {
          outline: 3px solid var(--primary-color, #007bff);
          outline-offset: 2px;
        }

        .portfolio-item.featured {
          border-color: var(--accent-color, #ffc107);
        }

        .portfolio-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .portfolio-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .portfolio-item:hover .portfolio-image {
          transform: scale(1.05);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--accent-color, #ffc107);
          color: var(--text-dark, #000);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .portfolio-content {
          padding: 1.5rem;
        }

        .portfolio-item-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary, #333);
          margin-bottom: 0.75rem;
        }

        .portfolio-item-description {
          color: var(--text-secondary, #666);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .portfolio-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .portfolio-tech-tag {
          background: var(--bg-secondary, #f8f9fa);
          color: var(--text-primary, #333);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .portfolio-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .portfolio-button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .portfolio-button--primary {
          background: var(--primary-color, #007bff);
          color: white;
        }

        .portfolio-button--primary:hover {
          background: var(--primary-dark, #0056b3);
        }

        .portfolio-button--secondary {
          background: var(--bg-secondary, #f8f9fa);
          color: var(--text-primary, #333);
          border: 1px solid var(--border-color, #ddd);
        }

        .portfolio-button--secondary:hover {
          background: var(--border-color, #ddd);
        }

        .portfolio-empty {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary, #666);
        }

        .portfolio-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .portfolio-modal-content {
          background: var(--bg-primary, #fff);
          border-radius: 12px;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        }

        .portfolio-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-secondary, #666);
        }

        .portfolio-modal-close:hover {
          color: var(--text-primary, #333);
        }

        .portfolio-modal-technologies h4 {
          margin-bottom: 0.5rem;
          color: var(--text-primary, #333);
        }

        .portfolio-modal-technologies ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .portfolio-modal-technologies li {
          background: var(--bg-secondary, #f8f9fa);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.875rem;
        }

        .portfolio-modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .portfolio-section {
            padding: 2rem 1rem;
          }

          .portfolio-title {
            font-size: 2rem;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .portfolio-filters {
            gap: 0.5rem;
          }

          .portfolio-filter {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }

          .portfolio-actions {
            flex-direction: column;
          }

          .portfolio-button {
            justify-content: center;
          }
        }

        /* High Contrast Mode */
        @media (prefers-contrast: high) {
          .portfolio-item {
            border: 2px solid var(--text-primary, #333);
          }

          .portfolio-button {
            border: 2px solid var(--text-primary, #333);
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .portfolio-item,
          .portfolio-image,
          .portfolio-button,
          .portfolio-filter {
            transition: none;
          }

          .loading-spinner {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
