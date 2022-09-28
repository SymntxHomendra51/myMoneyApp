import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useTheme from '@/Hooks/useTheme'
import { Caption, Checkbox } from 'react-native-paper'

const AppCheckboxWLabel = ({ value, onChange, label }) => {
  const { Gutters, Layout } = useTheme()

  return (
    <View style={[Layout.row, Layout.alignItemsCenter]}>
      <Checkbox.Android
        status={value ? 'checked' : 'unchecked'}
        onPress={onChange}
      />
      <Caption>{label}</Caption>
    </View>
  )
}

export default AppCheckboxWLabel

const styles = StyleSheet.create({})
