import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { Layout } from '@/Theme'
import { useTheme } from '@/Hooks'
import { useNavigation } from '@react-navigation/native'
import { ScreenRoutes } from '@/Navigators/routes'

const DrawerRightAction = props => {
  const navigation = useNavigation()
  console.log('props', props)
  const { Layout } = useTheme()
  return (
    <View style={[Layout.rowCenter]}>
      <IconButton
        icon="feather"
        color={'black'}
        size={20}
        onPress={() => console.log('Pressed')}
      />
      <IconButton
        icon="feather"
        color={'red'}
        size={20}
        onPress={() => navigation.navigate(ScreenRoutes.addRecord)}
      />
    </View>
  )
}

export default DrawerRightAction

const styles = StyleSheet.create({})
