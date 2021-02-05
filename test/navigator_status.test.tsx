import React from 'react';
import * as ReactDOM from 'react-dom';
import { NavigatorStatus } from '../src';

describe('NavigatorStatus', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavigatorStatus />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
