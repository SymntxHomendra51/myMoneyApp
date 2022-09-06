import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppPicker from '@/Components/AppPicker'
import { useTheme } from '@/Hooks'

const AddRecord = () => {
  const { Gutters } = useTheme()

  const sampleAccs = [
    { label: 'Expense Food', value: 'food.expense' },
    { label: 'Asset Cash', value: 'asset.cash' },
    { label: 'Income Salary', value: 'income.salary' },
    { label: 'Liability Credit Card', value: 'liability.credit.card' },
  ]

  const [fromAcc, setFromAcc] = useState('food.expense')
  const handleOnChange = (value: React.SetStateAction<string>) => {
    setFromAcc(value)
  }
  return (
    <View style={[Gutters.smallHPadding, Gutters.regularVPadding]}>
      {/* <Text>AddRecord</Text> */}
      <AppPicker
        label={'From'}
        value={fromAcc}
        onChange={setFromAcc}
        data={sampleAccs}
      />
      <AppPicker
        label={'To'}
        value={fromAcc}
        onChange={setFromAcc}
        data={sampleAccs}
      />
    </View>
  )
}

export default AddRecord

const styles = StyleSheet.create({})
