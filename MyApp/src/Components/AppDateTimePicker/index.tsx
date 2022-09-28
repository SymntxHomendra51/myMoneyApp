import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { IconButton, TextInput } from 'react-native-paper'
import { useTheme } from '@/Hooks'
import { addDays, format, parseISO, subDays } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const AppDateTimePicker = ({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (arg0: string) => void
  label: String
}) => {
  const [mode, setMode] = useState('date')
  const [isOpen, setIsOpen] = useState(false)

  const { Gutters, Layout, Common } = useTheme()
  const dateObj = parseISO(value)
  const date = format(dateObj, 'MM/dd/yyyy ( iii )')
  const time = format(dateObj, 'p')

  const handleAdd = () => {
    const res = addDays(dateObj, 1)
    onChange(res.toISOString())
  }
  const handleSub = () => {
    const res = subDays(dateObj, 1)
    onChange(res.toISOString())
  }
  const handleCurrent = () => {
    const res = new Date()
    onChange(res.toISOString())
  }
  const handleConfirm = passed => {
    console.log('passed', passed)
    setIsOpen(false)

    // const res = new Date()
    onChange(passed.toISOString())
  }
  const handleCancel = passed => {
    console.log('passed', passed)
    setIsOpen(false)
    // const res = new Date()
    // onChange(res.toISOString())
  }

  const handleOpen = mode => {
    setMode(mode)
    setIsOpen(true)
  }

  return (
    <View style={Gutters.smallVMargin}>
      <Text>{label}</Text>
      <View style={Layout.row}>
        <TextInput
          // itemStyle={{ height: 100 }}
          value={date}
          dense
          editable={false}
          // label={label}
          style={{
            backgroundColor: 'transparent',
            flexGrow: 1,
          }}
        />
        <TextInput
          style={{
            backgroundColor: 'transparent',
            width: '25%',
            marginLeft: '10%',
          }}
          value={time}
          editable={false}
          dense
        />
      </View>
      <View style={[Layout.row, Layout.rowFlxEnd, Gutters.tinyTMargin]}>
        <IconButton
          icon={'chevron-left'}
          style={Common.backgroundPrimary}
          onPress={handleSub}
        />
        <IconButton
          icon={'chevron-right'}
          style={Common.backgroundPrimary}
          onPress={handleAdd}
        />
        <IconButton
          icon={'calendar-range'}
          style={Common.backgroundPrimary}
          onPress={() => handleOpen('date')}
        />
        <IconButton
          icon={'clock-time-five-outline'}
          style={Common.backgroundPrimary}
          onPress={() => handleOpen('time')}
        />
        <IconButton
          icon={'calendar-today'}
          style={Common.backgroundPrimary}
          onPress={handleCurrent}
        />
      </View>
      <DateTimePickerModal
        isVisible={isOpen}
        mode={mode}
        date={dateObj}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  )
}

export default AppDateTimePicker

const styles = StyleSheet.create({})
