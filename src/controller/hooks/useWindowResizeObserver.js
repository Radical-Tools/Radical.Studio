import { useEffect } from 'react';

const useWindowResizeObserver = (onWindowResize) => {
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    onWindowResize({ width, height });
    function handleResize() {
      onWindowResize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
};
export default useWindowResizeObserver;
