import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavigatorStatus } from '../.';

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
    <div>
      <NavigatorStatus>
        {({ isOnline }) => <Alert isOnline={isOnline} />}
      </NavigatorStatus>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
