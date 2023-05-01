import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import {
  format,
  lastDayOfMonth,
  startOfMonth,
  startOfYear,
  lastDayOfYear,
} from 'date-fns'
import { Surface } from 'react-native-paper'
import dateType from '@/Utils/enums/dateType'

const DateTitle = ({ type, date }: { type: dateType; date: Date }) => {
  const { Layout, Gutters } = useTheme()
  const typeString = {
    [dateType.month]: 'MM/yyyy',
    [dateType.years]: 'yyyy',
  }

  const getDateString = () => {
    switch (type) {
      case dateType.month:
        return `(${format(startOfMonth(date), 'MM/dd')} - ${format(
          lastDayOfMonth(date),
          'MM/dd',
        )})`

      case dateType.years:
        return `(${format(startOfYear(date), 'MM/dd')} - ${format(
          lastDayOfYear(date),
          'MM/dd',
        )})`
      default:
        break
    }
  }
  return (
    <Surface
      style={[styles.container, Layout.alignItemsCenter, Gutters.tinyVMargin]}
    >
      <Text>In {format(date, typeString[type]) + ' ' + getDateString()}</Text>
    </Surface>
  )
}

export default DateTitle

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'palegreen',
    width: '100%',
    padding: 8,
    elevation: 5,
  },
})
