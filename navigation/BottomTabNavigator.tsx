import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';
import { MainStackNavigator, ToDoListStackNavigator } from './StackNavigator'

export type TabParamList = {
  HomeTab: undefined
  TodoListTab: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: 'home' | 'form' | undefined;

          if (route.name === 'HomeTab') {
            iconName = 'home'
          } 

          if (route.name === 'TodoListTab') {
            iconName = 'form'
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        options={{ title: 'Tab Squirtle' }}
        component={MainStackNavigator}
      />
      <Tab.Screen
        name="TodoListTab"
        options={{ title: 'Tab Todo List' }}
        component={ToDoListStackNavigator}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
