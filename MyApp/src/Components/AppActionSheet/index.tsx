import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActionSheet, { SheetProps } from 'react-native-actions-sheet'

const AppActionSheet = (props: SheetProps) => {
  return (
    <ActionSheet id={props.sheetId}>
      <View>
        <Text>Hello World</Text>
      </View>
    </ActionSheet>
  )
}

export default AppActionSheet

const styles = StyleSheet.create({})
