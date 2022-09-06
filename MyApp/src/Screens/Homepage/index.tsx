import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import makeStyle from './style'
import { useTheme } from '@/Hooks'

const HomePage = () => {
  const { AppTheme } = useTheme()
  const styles = makeStyle(AppTheme)
  return (
    <View>
      <Text>HomePage</Text>
    </View>
  )
}

export default HomePage
