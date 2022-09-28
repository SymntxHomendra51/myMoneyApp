import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { useTheme } from '@/Hooks'

const HeaderRight = props => {
  const navigation = useNavigation()
  // console.log('props', props)
  const { Layout } = useTheme()
  return (
    <View style={[Layout.rowCenter]}>
      <IconButton
        icon="pencil"
        color={'black'}
        size={25}
        onPress={props.edtBtn}
      />
      <IconButton
        icon="content-copy"
        color={'black'}
        size={25}
        onPress={props.cpyBtn}
      />
      <IconButton
        icon="delete-forever"
        // color={'red'}
        size={25}
        onPress={props.delBtn}
      />
    </View>
  )
}

const HeaderLeft = props => {
  return (
    <View>
      <IconButton
        icon="arrow-left"
        // color={'red'}
        size={25}
        onPress={props.bckBtn}
      />
    </View>
  )
}
const customHeader = {
  headerLeft: props => <HeaderLeft {...props} />,
  headerRight: props => <HeaderRight {...props} />,
}

export default customHeader
