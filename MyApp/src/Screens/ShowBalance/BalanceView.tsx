import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useCommonData, useTheme } from '@/Hooks'
import { getFilteredRecords } from '@/DB'
import { format } from 'date-fns'
import DateTitle from './DateTitle'
import { Divider, Surface } from 'react-native-paper'
import IText from '@/Components/IText'
import { calcBalance } from './utils'

const BalanceView = ({
  index,
  getDate,
}: {
  index: number
  getDate: (arg0: number) => Date
}) => {
  const { currentBook, acTypes } = useCommonData()
  const { Common, Layout, Gutters } = useTheme()
  const [recordState, setRecordState] = React.useState([])
  console.log('index', index)

  const NUM_ITEMS = 50

  function getColor(i: number) {
    const multiplier = 255 / (NUM_ITEMS - 1)
    const colorVal = Math.abs(i) * multiplier
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
  }

  const getDbData = async () => {
    const today = getDate(index)
    const result = await getFilteredRecords(
      currentBook,
      'month',
      format(today, 'MM/yyyy'),
    )
    console.log('getdbdata', index)

    const calcData = calcBalance(result)

    console.log('result', result, 'calc data', calcData)

    setRecordState(calcData)
  }

  useEffect(() => {
    getDbData()
  }, [index])
  useEffect(() => {
    console.log('recordState', recordState)
  }, [recordState])

  const findAc = id => {
    return acTypes.find(o => o?.value == id)?.label
  }

  return (
    <View
      style={[
        styles.flex,
        {
          alignItems: 'center',
        },
        Gutters.tinyHPadding,
      ]}
    >
      <DateTitle type={'month'} date={getDate(index)} />
      {/* <Text style={{ fontSize: 30, backgroundColor: 'red', width: '100%' }}>
         {getDate(index).toLocaleDateString()} 
        hello
      </Text> */}

      <Surface style={[{ elevation: 4 }, Layout.fullWidth]}>
        {recordState.map(o => (
          <>
            <View
              style={[
                Common.backgroundSecondary,
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.smallHPadding,
                Gutters.smallVPadding,
              ]}
            >
              <IText> {findAc(o.ac_type_id)}</IText>
              <IText>{o.amount}₹</IText>
            </View>

            {o.acArray?.map?.(o => (
              <>
                <View
                  style={[
                    Common.backgroundPrimary,
                    Layout.row,
                    Layout.justifyContentBetween,
                    Gutters.smallHPadding,
                    Gutters.smallVPadding,
                  ]}
                >
                  <Text>{o.acName}</Text>
                  <Text>{o.bal}₹</Text>
                </View>
                <Divider />
              </>
            ))}
          </>
        ))}
      </Surface>
      {/* {recordState.map(i => (
        <Text>{JSON.stringify(i)}</Text>
      ))} */}
    </View>
  )
}

export default BalanceView

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
