import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker, PickerIOS } from '@react-native-picker/picker'
import { useTheme } from '@/Hooks'
import { Item } from 'react-native-paper/lib/typescript/components/List/List'
const AppPicker = ({ label, value, onChange, data }) => {
  const { Gutters } = useTheme()

  const [selectedLanguage, setSelectedLanguage] = useState('java')
  return (
    <View style={Gutters.smallVMargin}>
      <Text>{label}</Text>
      <Picker
        // itemStyle={{ height: 100 }}

        selectedValue={String(value)}
        mode="dropdown"
        onValueChange={onChange}
      >
        {data.map((item, i) => (
          <Picker.Item
            key={i}
            label={item.label}
            value={String(item.value)}
            color={item?.color}
          />
        ))}
        {/* <Picker.Item key="3" label="JavaScript" value={6} /> */}
      </Picker>
    </View>
  )
}

export default AppPicker

const styles = StyleSheet.create({})
