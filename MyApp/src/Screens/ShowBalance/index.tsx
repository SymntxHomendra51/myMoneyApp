import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PagerView from 'react-native-pager-view'
import InfinitePager, {
  InfinitePagerImperativeApi,
} from 'react-native-infinite-pager'
import { addDays, addMonths, subDays } from 'date-fns'
import { last, range } from 'lodash'
import customHeader from './customHeader'
import BalanceView from './BalanceView'

const ShowBalance = ({ navigation }) => {
  const [currDay, setCurrDay] = useState(new Date())
  const [postion, setPostion] = useState(1)
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

  const goToCurrentPage = () => {
    pagerRef?.current?.setPage(0, { animated: true })
  }

  useEffect(() => {
    // pagerRef?.current?.setPageWithoutAnimation(postion)
  }, [days])
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        customHeader(selected)?.headerRight({
          firstBtn: goToCurrentPage,
          scndBtn: selected
            ? () => console.log('selected')
            : () => console.log('not selected'),
          thrdBtn: () => console.log('hello'),
        }),
    })
  }, [])

  return (
    <View style={styles.flex}>
      <InfinitePager
        ref={pagerRef}
        PageComponent={props => (
          <BalanceView index={props.index} getDate={getMonthFromIndex} />
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
