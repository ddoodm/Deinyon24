import { useState, useEffect } from 'react';

export function useLayout(breakpoint = 768) {
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsVertical(window.innerWidth <= breakpoint);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isVertical ? 'vertical' : 'horizontal';
}
