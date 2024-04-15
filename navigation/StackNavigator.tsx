import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SquirtleScreen from '../screens/SquirtleScreen';
import PokemonScreen from '../screens/PokemonScreen';
import TodoListScreen from '../screens/TodoListScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: 'grey',
  },
  headerTintColor: 'white',
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007bff',
          justifyContent: 'center',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="SquirtleScreen"
        component={SquirtleScreen}
        options={{ title: 'Squirtle' }}
      />
      <Stack.Screen
        name="PokemonScreen"
        component={PokemonScreen}
        options={({ route }) => ({ title: route.params.pokemon })}
      />
    </Stack.Navigator>
  );
};

const ToDoListStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="TodoListScreen"
        options={{ title: 'Todo List' }}
        component={TodoListScreen}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ToDoListStackNavigator };
