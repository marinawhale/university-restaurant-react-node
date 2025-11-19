import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search,
      title: document.title
    });

    window.scrollTo(0, 0); 
    
    console.log("GA4 Pageview Rastreado:", location.pathname);

  }, [location]);
};

export default usePageTracking;