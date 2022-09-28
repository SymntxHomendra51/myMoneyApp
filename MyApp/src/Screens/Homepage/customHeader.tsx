import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { useTheme } from '@/Hooks'
import { useActionSheet } from '@expo/react-native-action-sheet'

const HeaderRight = props => {
  const { options, cpyBtn, edtBtn } = props
  const navigation = useNavigation()
  const { showActionSheetWithOptions } = useActionSheet()

  // console.log('props', props)
  const { Layout } = useTheme()

  const opArr = [...options]
  opArr.push({ label: 'Cancel', onPress: () => {} })
  return (
    <View>
      <View style={[Layout.rowCenter]}>
        <IconButton
          icon="square-edit-outline"
          color={'black'}
          size={25}
          onPress={edtBtn}
        />
        <IconButton
          icon="content-copy"
          color={'black'}
          size={25}
          onPress={cpyBtn}
        />
        <IconButton
          icon="dots-vertical"
          // color={'red'}
          size={25}
          onPress={() =>
            showActionSheetWithOptions(
              {
                options: opArr?.map(item => item.label),
                cancelButtonIndex: options?.length,
                // destructiveButtonIndex: options?.length,
                destructiveColor: 'red',
                showSeparators: true,
                containerStyle: {
                  maxHeight: '90%',
                },
              },
              index => {
                opArr[index].onPress()
              },
            )
          }
        />
      </View>
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
