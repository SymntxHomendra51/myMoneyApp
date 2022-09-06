import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './MainDrawer'
import { navigationRef } from './utils'
import { Provider as PaperProvider } from 'react-native-paper'
import MainDrawerNavigator from './MainDrawer'
import { ScreenComponents, ScreenRoutes } from './routes'

const Stack = createStackNavigator()

const mainStack = [
  { name: ScreenRoutes.addRecord, component: ScreenComponents.AddRecord },
]

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, AppTheme } = useTheme()
  const { colors } = AppTheme

  console.log('theme', AppTheme)
  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <PaperProvider theme={AppTheme}>
        <NavigationContainer theme={AppTheme} ref={navigationRef}>
          <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
          <Stack.Navigator
            screenOptions={
              {
                // headerShown: false
              }
            }
          >
            <Stack.Screen
              name="Startup"
              component={StartupContainer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainDrawerNavigator}
              options={{
                animationEnabled: false,
                headerShown: false,
              }}
            />
            {mainStack.map(item => (
              <Stack.Screen
                name={item.name}
                key={item.name}
                component={item.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
