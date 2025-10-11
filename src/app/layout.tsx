import type { Metadata } from "next";
import { montserrat } from '@/utils/fonts';
import Navbar from "@/components/navbar/navbar";
import Footer from '@/components/footer/footer';

// Import enhanced utilities
import { AccessibilityAnnouncer, SkipLink, screenReaderStyles, highContrastStyles, reducedMotionStyles } from '@/utils/accessibility';
import { ErrorBoundary, DefaultErrorFallback, ErrorNotifications, errorStyles } from '@/utils/error-handling';

import "./globals.css";

export const metadata: Metadata = {
  title: "Minifolio - Minimal Portfolio Template",
  description: "A minimal, accessible portfolio template for developers built with NextJS",
  keywords: ["portfolio", "developer", "minimal", "accessible", "nextjs"],
  authors: [{ name: "Minifolio Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Minifolio - Minimal Portfolio Template",
    description: "A minimal, accessible portfolio template for developers",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minifolio - Minimal Portfolio Template",
    description: "A minimal, accessible portfolio template for developers",
  }
};

const navbarLinks = [
  {name: "Home", url: "#hero"},
  {name: "About", url: "#about"},
  {name: "Education", url: "#education"},
  {name: "Skills", url: "#skills"},
  {name: "Services", url: "#services"},
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Enhanced accessibility and performance styles */}
        <style dangerouslySetInnerHTML={{ __html: screenReaderStyles }} />
        <style dangerouslySetInnerHTML={{ __html: highContrastStyles }} />
        <style dangerouslySetInnerHTML={{ __html: reducedMotionStyles }} />
        <style dangerouslySetInnerHTML={{ __html: errorStyles }} />
      </head>
      <body
        className={`${montserrat.className} antialiased`}
      >
        {/* Accessibility features */}
        <AccessibilityAnnouncer />
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        
        {/* Error handling */}
        <ErrorBoundary fallback={DefaultErrorFallback}>
          <ErrorNotifications />
          
          {/* Main navigation */}
          <Navbar links={navbarLinks} />
          
          {/* Main content */}
          <main id="main-content" role="main" aria-label="Main content">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
