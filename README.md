# React Navigator Status

A component that lets you identify the user's internet connection and helps in notifying the user.
Inspired by [react-detect-offline](https://www.npmjs.com/package/react-detect-offline) created this component, but instead of polling network status this component uses `online` and `offline` event listeners https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events.

## How to use?

- `yarn add react-navigator-status`

### Default

```tsx
import * as React from 'react';
import { NavigatorStatus } from 'react-navigator-status';

const App = () => {
  return <NavigatorStatus />;
};
```

### With custom component

- `NavigatorStatus` component gives you render prop with `isOnline` which you can use further to render alert as per your needs.

```tsx
import * as React from 'react';
import { NavigatorStatus } from 'react-navigator-status';

// doesn't show alert initially
// show offline alert forever
// show online alert for 4s

const Alert: React.FC<{ isOnline: boolean }> = ({ isOnline }) => {
  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    if (isOnline && showAlert) {
      if (isMounted) {
        setShowAlert(true);
      }

      setTimeout(() => {
        if (isMounted) {
          setShowAlert(false);
        }
      }, 4000);
    }

    if (!isOnline && isMounted) {
      setShowAlert(true);
    }

    return () => {
      isMounted = false;
    };
  }, [isOnline]);

  return (
    <div
      style={{
        fontFamily: `sans-serif`,
      }}
    >
      {showAlert && (
        <div
          style={{
            color: 'white',
            padding: 20,
            marginBottom: 20,
            background: isOnline ? `rgb(59, 201, 149)` : `#ff5733`,
          }}
        >
          {isOnline
            ? `You are online`
            : `You are offline please check your connection`}
        </div>
      )}
      <p>Change the network status to see the alert</p>
    </div>
  );
};

const App = () => {
  return (
    <NavigatorStatus>
      {({ isOnline }) => <Alert isOnline={isOnline} />}
    </NavigatorStatus>
  );
};
```
