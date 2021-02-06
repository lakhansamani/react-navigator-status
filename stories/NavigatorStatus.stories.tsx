import React, { FC, useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { NavigatorStatus, useNavigatorStatus } from '../src';

const meta: Meta = {
  title: 'Navigator Status',
  component: NavigatorStatus,
};

export default meta;

const DefaultStory: Story = () => <NavigatorStatus />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultStory.bind({});

const Alert: FC<{ isOnline: boolean }> = ({ isOnline }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
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

const CustomComponentStory: Story = () => (
  <NavigatorStatus>
    {({ isOnline }) => <Alert isOnline={isOnline} />}
  </NavigatorStatus>
);

export const WithCustomComponent = CustomComponentStory.bind({});

const CustomComponentStoryWithHook: Story = () => {
  const isOnline = useNavigatorStatus();

  return <Alert isOnline={isOnline} />;
};

export const WithHook = CustomComponentStoryWithHook.bind({});

Default.args = {};
