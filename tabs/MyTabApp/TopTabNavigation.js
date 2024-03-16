import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import Screen5 from './Screen5';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Screen1" component={Screen1} />
      <Tab.Screen name="Screen2" component={Screen2} />
      <Tab.Screen name="Screen3" component={Screen3} />
      <Tab.Screen name="Screen4" component={Screen4} />
      <Tab.Screen name="Screen5" component={Screen5} />
    </Tab.Navigator>
  );
};

export default TopTabNavigation;
