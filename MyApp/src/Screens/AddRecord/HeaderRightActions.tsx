import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { IconButton } from 'react-native-paper'
import { useActionSheet } from '@expo/react-native-action-sheet'

const HeaderRightActions = props => {
  const { AppTheme, Layout, Gutters, Common } = useTheme()
  const { showActionSheetWithOptions } = useActionSheet()

  const { options, cpyBtn } = props
  const opArr = [...options]
  opArr.push({ label: 'Cancel', onPress: () => {} })

  return (
    <View>
      <View style={[Layout.rowCenter]}>
        <IconButton
          icon="clipboard-file"
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

export default HeaderRightActions

const styles = StyleSheet.create({})
