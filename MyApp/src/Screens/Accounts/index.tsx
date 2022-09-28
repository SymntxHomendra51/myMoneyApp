import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect, useNavigationState } from '@react-navigation/native'
import { useCommonData, useTheme } from '@/Hooks'
import { ScrollView } from 'react-native-gesture-handler'
import {
  deleteAccountsItem,
  getAccountsItem,
} from '@/DB/services/accountService'
import { parseISO } from 'date-fns'
import customHeader from './customHeader'
import { navigationRef } from '@/Navigators/utils'
import DrawerRightAction from '@/Components/DrawerRightAction'
import { ScreenRoutes } from '@/Navigators/routes'

const Accounts = props => {
  const { AppTheme, Layout, Gutters, Common } = useTheme()
  // const styles = makeStyle(AppTheme)
  const [accountsState, setAccountsState] = useState([])
  const [selected, setSelected] = useState(-1)
  console.log('account props', props)

  const { currentBook } = useCommonData()

  const addToSelection = o => {
    // const arr = [...selected]
    // if (arr.includes(o.ac_id)) {
    //   const i = arr.indexOf(o.ac_id)
    //   arr.splice(i, 1)
    // } else arr.push(o?.ac_id)
    // console.log('arr', arr)
    const id = o.ac_id
    setSelected(state => (id == state ? 0 : id))
  }

  const handleDelete = async () => {
    const ifYes = await Alert.alert(
      'Delete',
      'Are you sure to Delete this',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteAccountsItem(selected)
            getDbData()
            setSelected(0)
          },
        },
        { text: 'No', onPress: () => console.log('cancelled') },
      ],
      { cancelable: true },
    )
  }

  const handleCopy = () => {
    console.log('copying', selected)
    const object = accountsState.find(o => o.ac_id == selected)
    console.log('object', object)

    props.navigation.navigate(ScreenRoutes.addAccount, {
      selectedObject: object,
    })
  }
  const handleEdit = () => {
    console.log('editing', selected)
    const object = accountsState.find(o => o.ac_id == selected)
    console.log('edit object', object)

    props.navigation.navigate(ScreenRoutes.addAccount, {
      editObject: object,
    })
  }
  const handleCancel = () => {
    console.log('cancel pressed')
    setSelected(0)
  }

  const getDbData = async () => {
    const accounts = await getAccountsItem(currentBook)
    console.log('accounts', accounts)
    setAccountsState([...accounts])
  }

  useFocusEffect(
    React.useCallback(() => {
      getDbData()
    }, [currentBook]),
  )

  React.useEffect(() => {
    console.log('selected', selected)
    if (selected > 0)
      props.navigation.setOptions({
        headerRight: () =>
          customHeader.headerRight({
            edtBtn: handleEdit,
            delBtn: handleDelete,
            cpyBtn: handleCopy,
          }),
        headerLeft: () =>
          customHeader.headerLeft({
            bckBtn: handleCancel,
          }),
      })
    else {
      console.log('no selection')
      props.navigation.setOptions({
        headerRight: () => (
          <DrawerRightAction addScreen={ScreenRoutes.addAccount} />
        ),
        headerLeft: () =>
          customHeader.headerLeft({
            bckBtn: () => props.navigation.toggleDrawer(),
          }),
      })
    }
  }, [selected])

  return (
    <ScrollView contentContainerStyle={Gutters.regularHPadding}>
      {accountsState?.map(item => (
        <Pressable
          key={item?.ac_id}
          style={[
            Gutters.tinyVMargin,
            Gutters.tinyVPadding,
            Gutters.tinyHPadding,
            selected == item.ac_id && Common.backgroundPrimary,
          ]}
          onPress={() => {
            console.log('pressed')

            addToSelection(item)
          }}
        >
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <View>
              <Text>{item?.ac_name}</Text>
            </View>
            <View>
              {/* <Text>{parseISO(item?.r_date ?? '').toLocaleDateString()}</Text> */}
            </View>
          </View>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <View>
              <Text>Initial: {item?.ac_initial_bal}</Text>
            </View>
            <View>
              <Text>Type Id: {item.ac_type_id}</Text>
            </View>
          </View>
        </Pressable>
      ))}
      <Text style={{ textAlign: 'center' }}>End OF LIST</Text>
    </ScrollView>
  )
}

export default Accounts

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
