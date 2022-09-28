import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { Layout } from '@/Theme'
import { useTheme } from '@/Hooks'
import { useNavigation } from '@react-navigation/native'
import { ScreenRoutes } from '@/Navigators/routes'

const DrawerRightAction = props => {
  const navigation = useNavigation()
  // console.log('props', props)
  const { Layout } = useTheme()
  return (
    <View style={[Layout.rowCenter]}>
      <IconButton
        icon="plus"
        color={'black'}
        size={25}
        onPress={() => navigation.navigate(props.addScreen)}
      />
      <IconButton
        icon="sort"
        // color={'red'}
        size={25}
        onPress={() => console.log('Pressed')}
      />
    </View>
  )
}

export default DrawerRightAction

const styles = StyleSheet.create({})
