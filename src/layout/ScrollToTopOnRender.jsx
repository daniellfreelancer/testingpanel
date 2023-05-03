import React, { useEffect } from 'react';

function ScrollToTopOnRender() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTopOnRender