import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { parseISO } from 'date-fns'

import { useCommonData, useTheme } from '@/Hooks'

import makeStyle from './style'
import { getRecordItem, deleteRecordItem } from '@/DB/services/recordService'
import customHeader from './customHeader'
import { ScreenRoutes } from '@/Navigators/routes'
import HomeRightAction from '@/Components/HomeRightAction'
import showTemplateList from '../AddRecord/showTemplateList'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { saveTemplatesItem } from '@/DB/services/templateService'
import { getAccountsItem } from '@/DB'

const HomePage = props => {
  const { AppTheme, Layout, Gutters, Common } = useTheme()
  const styles = makeStyle(AppTheme)
  const [recordsState, setRecordsState] = useState([])
  const [acList, setAcList] = useState([])
  const [selected, setSelected] = useState(-1)

  const { showActionSheetWithOptions } = useActionSheet()
  const { currentBook, acTypes } = useCommonData()

  const getDbData = async () => {
    console.log('currentBook from record', currentBook)

    const records = await getRecordItem(currentBook)
    const accs = await getAccountsItem(currentBook)
    console.log('records', records, 'accounts', accs)
    setAcList(accs)
    setRecordsState([...records])
  }

  const getAccountName = id => {
    const o = acList.find(o => o.ac_id == id)
    const color = acTypes.find(a => a?.value == o?.ac_type_id)?.color
    return o?.ac_name ? (
      <Text style={{ color }} children={o?.ac_name} />
    ) : (
      '(Deleted)'
    )
  }

  const handleSelection = id => {
    setSelected(state => (id == state ? 0 : id))
  }

  const handleCopy = () => {
    console.log('copying', selected)
    const object = recordsState.find(o => o.r_id == selected)
    console.log('object', object)

    props.navigation.navigate(ScreenRoutes.addRecord, {
      selectedObject: object,
    })
  }
  const handleEdit = () => {
    console.log('editing', selected)
    const object = recordsState.find(o => o.r_id == selected)
    console.log('edit object', object)

    props.navigation.navigate(ScreenRoutes.addRecord, {
      editObject: object,
    })
  }

  const handleDelete = async () => {
    try {
      console.log('deleting', selected)
      await deleteRecordItem(selected)
      await getDbData()
    } catch (error) {
      console.log('delete error', error)
    }
  }

  const handleSetTemplate = temp_id => {
    const object = recordsState.find(o => o.r_id == selected)
    console.log('template function', temp_id, object)
    const jsString = JSON.stringify(object)
    const template = {
      temp_id: temp_id,
      temp_json: jsString,
      temp_b_id: 1,
    }
    console.log('jsstring', template)
    saveTemplatesItem([template])
  }

  const dotOptions = [
    {
      label: 'Set Template',
      id: 1,
      onPress: () =>
        showTemplateList(handleSetTemplate, showActionSheetWithOptions),
    },
    {
      label: 'Delete',
      id: 1,
      onPress: handleDelete,
    },
  ]
  useFocusEffect(
    React.useCallback(() => {
      getDbData()
    }, [currentBook]),
  )

  useEffect(() => {
    console.log('selected', selected)
    if (selected > 0)
      props.navigation.setOptions({
        headerRight: () =>
          customHeader.headerRight({
            options: dotOptions,
            cpyBtn: handleCopy,
            edtBtn: handleEdit,
          }),
        headerLeft: () =>
          customHeader.headerLeft({
            bckBtn: () => setSelected(0),
          }),
      })
    else if (!selected) {
      console.log('no selection')
      props.navigation.setOptions({
        headerRight: () => <HomeRightAction />,
        headerLeft: () =>
          customHeader.headerLeft({
            bckBtn: () => props.navigation.toggleDrawer(),
          }),
      })
    }
  }, [selected])

  return (
    <ScrollView contentContainerStyle={Gutters.regularHPadding}>
      {recordsState?.map(item => (
        <Pressable
          style={[
            Gutters.regularVMargin,
            Gutters.tinyHPadding,
            selected == item?.r_id && Common.backgroundPrimary,
          ]}
          onPress={() => handleSelection(item?.r_id)}
          key={item.r_id}
        >
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <View>
              <Text>
                From: {getAccountName(item?.r_from_ac_type_id) ?? 'Deleted'}
              </Text>
            </View>
            <View>
              <Text>{parseISO(item?.r_date ?? '').toLocaleDateString()}</Text>
            </View>
          </View>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <View>
              <Text>To: {getAccountName(item?.r_to_ac_type_id)}</Text>
            </View>
            <View>
              <Text>Amount: {item.r_amount}</Text>
            </View>
          </View>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <View>
              <Text>Note: {item?.r_note}</Text>
            </View>
            <View>
              <Text>
                Time: {parseISO(item?.r_date ?? '').toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
      <Text style={{ textAlign: 'center' }}>End OF LIST</Text>
    </ScrollView>
  )
}

export default HomePage
