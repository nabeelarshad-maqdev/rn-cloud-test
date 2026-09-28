/**
 * @format
 */

import React from 'react';
import {Text} from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PracticeScreen from '../src/screens/PracticeScreen';

const initialMetrics = {
  frame: {x: 0, y: 0, width: 390, height: 844},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

test('renders practice screen title and subtitle', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <PracticeScreen />
      </SafeAreaProvider>,
    );
  });

  const labels = tree!.root
    .findAllByType(Text)
    .map(node => node.props.children)
    .flat();

  expect(labels).toContain('Practice Screen');
  expect(labels).toContain('Cursor Cloud Test');
});
