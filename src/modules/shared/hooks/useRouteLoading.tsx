import NProgress from 'nprogress';
import { useEffect } from 'react';
import 'nprogress/nprogress.css';

export function useRouteLoading({ isLoading }: { isLoading: boolean }) {
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    });
    if (isLoading) {
      NProgress.start();
      NProgress.inc();
    } else {
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
  }, [isLoading]);

  return null;
}
