import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { ExampleContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import DrawerRightAction from '@/Components/DrawerRightAction'
import Homepage from '@/Screens/Homepage'
import { DrawerRoutes, DrawerScreens } from './drawerRoutes'
import { ScreenRoutes } from './routes'
import HomeRightAction from '@/Components/HomeRightAction'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const drawerStack = [
  {
    name: DrawerRoutes.homepage,
    component: DrawerScreens.Homepage,
    options: {
      headerRight: HomeRightAction,
    },
  },
  {
    name: DrawerRoutes.accounts,
    component: DrawerScreens.Accounts,
    addScreen: ScreenRoutes.addAccount,
  },
  {
    name: DrawerRoutes.books,
    component: DrawerScreens.Books,
    addScreen: ScreenRoutes.addAccount,
  },
  {
    name: DrawerRoutes.balance,
    component: DrawerScreens.ShowBalance,
    addScreen: '',
  },
]

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
        // headerRight: DrawerRightAction,
      }}
    >
      {/* <Drawer.Screen name="Home" component={Homepage} />
      <Drawer.Screen name="Accounts" component={Homepage} /> */}

      {drawerStack.map(item => (
        <Drawer.Screen
          key={item.name}
          options={{
            headerRight: () => <DrawerRightAction addScreen={item.addScreen} />,
          }}
          {...item}
        />
      ))}

      {/* Sub stack for homepage routes  */}
    </Drawer.Navigator>
  )
}

export default MainDrawerNavigator
