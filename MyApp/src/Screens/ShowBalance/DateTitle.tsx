import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { format, lastDayOfMonth, startOfMonth } from 'date-fns'
import { Surface } from 'react-native-paper'

const DateTitle = ({ type, date }: { type: 'month' | 'year'; date: Date }) => {
  const { Layout, Gutters } = useTheme()
  const typeString = {
    month: 'MM/yyyy',
    year: 'yyyy',
  }
  return (
    <Surface
      style={[styles.container, Layout.alignItemsCenter, Gutters.tinyVMargin]}
    >
      <Text>
        In{' '}
        {format(date, typeString[type]) +
          ' ' +
          `(${format(startOfMonth(date), 'MM/dd')} - ${format(
            lastDayOfMonth(date),
            'MM/dd',
          )})`}
      </Text>
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
