import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavigatorStatus } from '../.';

const App = () => {
  return (
    <div>
      <NavigatorStatus />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
