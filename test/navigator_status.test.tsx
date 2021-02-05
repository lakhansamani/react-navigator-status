import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as NavigatorStatus } from '../stories/NavigatorStatus.stories';

describe('NavigatorStatus', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavigatorStatus />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
