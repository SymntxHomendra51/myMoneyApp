import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PagerView from 'react-native-pager-view'
import InfinitePager, {
  InfinitePagerImperativeApi,
} from 'react-native-infinite-pager'
import { addDays, addMonths, addYears, subDays } from 'date-fns'
import { last, range } from 'lodash'
import customHeader from './customHeader'
import BalanceView from './BalanceView'
import dateType from '@/Utils/enums/dateType'

const ShowBalance = ({ navigation }) => {
  const [currDay, setCurrDay] = useState(new Date())
  const [mode, setMode] = useState(dateType.month)
  const [selected, setSelected] = useState(0)
  const [days, setDays] = useState([
    subDays(currDay, 1),
    currDay,
    addDays(currDay, 1),
  ])

  const pagerRef = React.useRef<InfinitePagerImperativeApi>(null)

  const getMonthFromIndex = index => {
    const resDate = addMonths(currDay, index)
    console.log('range arr', resDate.toLocaleDateString())

    // const result = arr.map(i => subDays(date, i))
    return resDate
  }
  const getYearFromIndex = index => {
    const resDate = addYears(currDay, index)
    console.log('range arr', resDate.toLocaleDateString())

    // const result = arr.map(i => subDays(date, i))
    return resDate
  }

  const goToCurrentPage = () => {
    pagerRef?.current?.setPage(0, { animated: true })
  }

  const toggleMode = () => {
    setMode(state =>
      state == dateType.month ? dateType.years : dateType.month,
    )
  }

  const getTitle = () => {
    switch (mode) {
      case dateType.month:
        return 'Monthly Balance'
        break
      case dateType.years:
        return 'Yearly Balance'
      default:
        return 'Set title'
        break
    }
  }

  useEffect(() => {
    // pagerRef?.current?.setPageWithoutAnimation(postion)
  }, [days])
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        customHeader(selected)?.headerRight({
          firstBtn: goToCurrentPage,
          scndBtn: toggleMode,
          thrdBtn: () => console.log('hello'),
        }),
    })
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: getTitle(),
    })
  }, [mode])

  return (
    <View style={styles.flex}>
      <InfinitePager
        ref={pagerRef}
        PageComponent={props => (
          <BalanceView
            index={props.index}
            getDate={
              mode == dateType.month ? getMonthFromIndex : getYearFromIndex
            }
            type={mode}
          />
        )}
        onPageChange={e => console.log('onpagechagen', e)}
        style={styles.flex}
        pageWrapperStyle={styles.flex}
        // pageBuffer={0}
      />
    </View>
  )
}

export default ShowBalance

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})

const onChange = e => {
  const position = e.nativeEvent.position
  if (position > days.length - 2) {
    const temp = [...days]

    temp.push(...getNextDays(last(temp)))
    setDays(temp)
  }
  if (position < 2) {
    const temp = [...days]
    temp.unshift(...getPrevDays(temp[0]))
    setPostion(renderAtATime + position)
    pagerRef?.current?.setPageWithoutAnimation(renderAtATime + position)
    setDays(temp)
  }
}

const getNextDays = date => {
  const arr = range(1, renderAtATime)
  const result = arr.map(i => addDays(date, i))
  return result
}
const getPrevDays = date => {
  const arr = range(renderAtATime, 0, -1)
  console.log('range arr', arr)

  const result = arr.map(i => subDays(date, i))
  return result
}
