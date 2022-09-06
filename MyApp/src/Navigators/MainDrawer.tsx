import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { ExampleContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import DrawerRightAction from '@/Components/DrawerRightAction'
import Homepage from '@/Screens/Homepage'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

// @refresh reset
const MainDrawerNavigator = () => {
  const { AppTheme } = useTheme()
  return (
    <Drawer.Navigator
      backBehavior="history"
      // drawerContent={props => <AppDrawerComponent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: AppTheme.colors.primary,
          elevation: 0,
        },

        // headerTintColor: '#fff',
        headerRight: DrawerRightAction,
      }}
    >
      <Drawer.Screen name="Home" component={Homepage} />

      {/* Sub stack for homepage routes  */}
    </Drawer.Navigator>
  )
}

export default MainDrawerNavigator
