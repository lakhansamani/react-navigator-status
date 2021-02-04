import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NavigatorStatus } from '../src';

const meta: Meta = {
  title: 'Navigator Status',
  component: NavigatorStatus,
};

export default meta;

const Template: Story = args => <NavigatorStatus />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
