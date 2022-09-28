import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker, PickerIOS } from '@react-native-picker/picker'
import { useTheme } from '@/Hooks'
import { Item } from 'react-native-paper/lib/typescript/components/List/List'
import { TextInput } from 'react-native-paper'
const AppInput = ({ label, value, onChange, ...rest }) => {
  const { Gutters, AppTheme } = useTheme()

  // const [selectedLanguage, setSelectedLanguage] = useState()

  return (
    <View style={Gutters.smallVMargin}>
      <Text>{label}</Text>
      <TextInput
        // itemStyle={{ height: 100 }}

        // label={label}
        style={{
          backgroundColor: 'transparent',
        }}
        theme={AppTheme}
        onChangeText={onChange}
        dense
        value={value}
        {...rest}
      />
    </View>
  )
}

export default AppInput

const styles = StyleSheet.create({})
