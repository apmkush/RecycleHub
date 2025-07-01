import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {   /// this ensures the webpage scrolls to the top whenever the route (URL path) changes.
  const { pathname } = useLocation();   ////This hook from react-router-dom provides access to the current location (URL path).
                                        ///The pathname property is extracted, which changes whenever the route changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
