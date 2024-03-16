import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TopTabNavigation from './TopTabNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <TopTabNavigation />
    </NavigationContainer>
  );
}
