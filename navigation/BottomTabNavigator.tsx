import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainStackNavigator, ToDoListStackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      barStyle={{ backgroundColor: '#694fad' }}>
      <Tab.Screen
        name="HomeScreen"
        options={{ title: 'Tab Squirtle' }}
        component={MainStackNavigator}
      />
      <Tab.Screen
        name="TodoListScreen"
        options={{ title: 'Tab Todo List' }}
        component={ToDoListStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
