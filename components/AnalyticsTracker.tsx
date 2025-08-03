'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const AnalyticsTracker = React.memo(function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Generate or get session ID
        let sessionId = localStorage.getItem('analytics_session_id');
        if (!sessionId) {
          sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          localStorage.setItem('analytics_session_id', sessionId);
        }

        // Track page view
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pagePath: pathname,
            sessionId,
            referrer: document.referrer || null,
          }),
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [pathname]);

  return null; // This component doesn't render anything
});

export default AnalyticsTracker; 