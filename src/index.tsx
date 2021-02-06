import React, {
  useState,
  useEffect,
  FC,
  HTMLAttributes,
  ReactChild,
} from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ({ isOnline }: { isOnline: boolean }) => ReactChild;
}

export const hasWindowObj = () => typeof window !== 'undefined';

export const useNavigatorStatus = () => {
  const [isOnline, setIsOnline] = useState(
    hasWindowObj() ? window.navigator.onLine : true
  );

  useEffect(() => {
    let isMounted = true;

    function offlineListener() {
      if (isMounted) {
        setIsOnline(false);
      }
    }

    if (hasWindowObj()) {
      window.addEventListener('offline', offlineListener);
    }

    return () => {
      isMounted = false;
      if (hasWindowObj()) {
        window.removeEventListener('offline', offlineListener);
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    function onlineListener() {
      if (isMounted) {
        setIsOnline(true);
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('online', onlineListener);
    }

    return () => {
      isMounted = false;
      if (hasWindowObj()) {
        window.removeEventListener('online', onlineListener);
      }
    };
  }, []);

  return isOnline;
};

export const NavigatorStatus: FC<Props> = ({ children }) => {
  const isOnline = useNavigatorStatus();

  return (
    <div>
      {children
        ? children({ isOnline })
        : `You are ${isOnline ? `online` : `offline`}`}
    </div>
  );
};
