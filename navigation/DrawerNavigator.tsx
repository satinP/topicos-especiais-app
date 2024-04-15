import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainStackNavigator } from "./StackNavigator";
import TabNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="LoginScreen" component={TabNavigator} />
      <Drawer.Screen name="HomeScreen" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;