import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppPicker from '@/Components/AppPicker'
import { useCommonData, useTheme } from '@/Hooks'
import AppInput from '@/Components/AppInput'
import { useFormik } from 'formik'
import { Button, IconButton, TextInput } from 'react-native-paper'
import 'react-native-get-random-values' // polyfill for uuid.
import { v4 as uuidv4 } from 'uuid'
import { useFocusEffect } from '@react-navigation/native'
import { saveRecordItem } from '@/DB/services/recordService'
import HeaderRightActions from './HeaderRightActions'

import {
  findTemplateItem,
  getTemplatesItem,
  saveTemplatesItem,
} from '@/DB/services/templateService'
import { range } from 'lodash'
import { useActionSheet } from '@expo/react-native-action-sheet'
import AppDateTimePicker from '@/Components/AppDateTimePicker'
import { RecordsItem } from '@/DB/models'
import { getAccountsItem } from '@/DB'

const AddRecord = ({ navigation, route }) => {
  const { Gutters, Layout, Common } = useTheme()
  const [currOption, setCurrOption] = useState({})
  const [acList, setAcList] = useState([])
  const { currentBook } = useCommonData()

  const { acTypes } = useCommonData()

  const initValue: RecordsItem = {
    // r_id: uuidv4(),
    // r_name: '',
    r_from_ac_type_id: 0,
    r_to_ac_type_id: 0,
    r_date: new Date().toISOString(),
    r_amount: '0',
    r_note: '',
  }

  const handleSubmit = async values => {
    try {
      console.log('submit values', values)
      await saveRecordItem(currentBook, [{ ...values }])
      if (route?.params?.editObject) navigation.goBack()
      setCreated(state => state + 1)
      // formikSetValues(initValue)
    } catch (error) {
      console.log(error)
    }
  }

  const { showActionSheetWithOptions } = useActionSheet()

  const getDbData = async () => {
    // console.log('currentBook from record', currentBook)

    const accs = await getAccountsItem(currentBook)
    console.log('accounts', accs)
    setAcList(accs)
  }

  const {
    handleSubmit: formikHandleSubmit,
    values: formikValues,
    setFieldValue: formikSetFieldValue,
    touched: formikTouched,
    setValues: formikSetValues,
    // setTouched: formikSetTouched,
    setFieldTouched: formikSetTouched,
    errors: formikErrors,
    setErrors,
    handleChange: handleFormikChange,
    handleBlur: handleFormikBlur,
  } = useFormik<typeof initValue>({
    initialValues: initValue,
    // validationSchema: pesticideAppSchema,
    onSubmit: handleSubmit,
    validateOnBlur: true,
  })

  const actionSheetRef = React.useRef(null)
  //
  // Template code start
  //
  const getTemplateList = async () => {
    const templateListRange = range(10)

    const dbList = await getTemplatesItem()
    console.log('dblist ', dbList)

    const list = templateListRange.map(id => {
      const result = dbList.find(tl => tl.temp_id == id) ?? { temp_id: id }
      if (result.temp_json) {
        const json = JSON.parse(result.temp_json)
        return {
          temp_id: id,
          label: `Account ${json.r_from_ac_type_id} to ${json.r_to_ac_type_id}`,
        }
      } else return { temp_id: id, label: 'Empty' }
    })
    return list
  }

  const showTemplateList = async (
    tapAction: (arg0: any) => any,
    title: string,
  ) => {
    const tempList = await getTemplateList()
    tempList.push({ label: 'Cancel' })
    console.log('templist', tempList)
    showActionSheetWithOptions(
      {
        title: title ?? '',
        options: tempList?.map(item => item.label),
        cancelButtonIndex: tempList?.length - 1,
        // destructiveButtonIndex: options?.length,
        destructiveColor: 'red',
        showSeparators: true,
        containerStyle: {
          maxHeight: '90%',
        },
        titleTextStyle: {
          fontWeight: '900',
        },
      },
      async index => {
        console.log(tempList[index])
        if (tempList[index]?.temp_id >= 0)
          await tapAction(tempList[index]?.temp_id)
      },
    )
  }

  const setTemplate = async (temp_id: number) => {
    console.log('set formik values', formikValues)

    const jsString = JSON.stringify({ ...formikValues })
    const template = {
      temp_id: temp_id,
      temp_json: jsString,
      temp_b_id: 1,
    }
    console.log('jsstring', template)
    saveTemplatesItem([template])
  }

  const applyTemplate = async (id: number) => {
    const dbList = await findTemplateItem(id)
    console.log('result find', dbList)

    if (!dbList.length) return
    const object = JSON.parse(dbList[0].temp_json)
    formikSetValues({ ...object })
  }

  const dotOptions = [
    {
      label: 'Set Template',
      id: 1,
      onPress: () => showTemplateList(setTemplate, 'Save'),
    },
  ]

  const AcPickArr = acList.map(o => {
    console.log('actypes', acTypes, acList)

    const type = acTypes.find(type => type.value == o.ac_type_id)
    return {
      label: `${type?.label} - ${o?.ac_name}`,
      value: o?.ac_id,
      color: type?.color,
    }
  })

  // const sampleAccs = [
  //   { label: 'Expense Food', value: '0' },
  //   { label: 'Asset Cash', value: '3' },
  //   { label: 'Income Salary', value: '5' },
  //   { label: 'Liability Credit Card', value: '7' },
  // ]

  const [created, setCreated] = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      formikSetValues(initValue)
      if (route?.params?.editObject)
        navigation.setOptions({ title: 'Edit record' })

      getDbData()
    }, [currentBook]),
  )

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightActions
          options={dotOptions}
          cpyBtn={() => showTemplateList(applyTemplate, 'Apply')}
        />
      ),
    })

    if (route?.params?.selectedObject) {
      console.log('passedobject', route.params.selectedObject)
      const obj = route.params.selectedObject
      formikSetValues({
        r_amount: String(obj.r_amount),
        r_date: obj.r_date,
        r_from_ac_type_id: obj.r_from_ac_type_id,
        // r_id: formikValues.r_id,
        r_note: obj.r_note,
        r_to_ac_type_id: obj.r_to_ac_type_id,
      })
    }

    if (route?.params?.editObject) {
      console.log('passedobject', route.params.editObject)
      const obj = route.params.editObject
      formikSetValues({
        r_amount: String(obj.r_amount),
        r_date: obj.r_date,
        r_from_ac_type_id: obj.r_from_ac_type_id,
        r_id: obj.r_id,
        r_note: obj.r_note,
        r_to_ac_type_id: obj.r_to_ac_type_id,
      })
    }
  }, [])

  useEffect(() => {
    console.log('formikValues', formikValues)
  }, [formikValues])

  useEffect(() => {
    console.log(currOption)
  }, [currOption])

  return (
    <View style={[Gutters.smallHPadding, Gutters.regularVPadding]}>
      {/* <Text>AddRecord</Text> */}
      <AppPicker
        label={'From'}
        value={formikValues.r_from_ac_type_id}
        onChange={handleFormikChange('r_from_ac_type_id')}
        data={AcPickArr}
      />
      <AppPicker
        label={'To'}
        value={formikValues.r_to_ac_type_id}
        onChange={handleFormikChange('r_to_ac_type_id')}
        data={AcPickArr}
      />
      {/* <AppInput
        label={'Date'}
        value={formikValues.r_date}
        onChange={handleFormikChange('r_date')}
      /> */}

      <AppDateTimePicker
        label={'Date'}
        value={formikValues.r_date}
        onChange={handleFormikChange('r_date')}
      />
      <AppInput
        label={'Money ($)'}
        value={formikValues.r_amount}
        onChange={handleFormikChange('r_amount')}
        keyboardType="numeric"
      />
      <AppInput
        label={'Note'}
        value={formikValues.r_note}
        onChange={handleFormikChange('r_note')}
      />
      <View
        style={[Layout.row, Gutters.largeVPadding, Layout.justifyContentAround]}
      >
        <Button mode="contained"> Cancel</Button>
        <Button mode="contained" onPress={formikHandleSubmit}>
          Create {created ? `(${created})` : ''}
        </Button>
      </View>
    </View>
  )
}

export default AddRecord

const styles = StyleSheet.create({})
