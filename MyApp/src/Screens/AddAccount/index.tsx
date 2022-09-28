import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppPicker from '@/Components/AppPicker'
import { useCommonData, useTheme } from '@/Hooks'
import AppInput from '@/Components/AppInput'
import { useFormik } from 'formik'
import { Button } from 'react-native-paper'
import 'react-native-get-random-values' // polyfill for uuid.
import { v4 as uuidv4 } from 'uuid'
import { useFocusEffect } from '@react-navigation/native'
import { saveAccountsItem } from '@/DB/services/accountService'
import { AccountsItem } from '@/DB/models'

const AddAccount = ({ route, navigation }) => {
  const { Gutters, Layout } = useTheme()

  const { acTypes, currentBook } = useCommonData()

  console.log('acTypes', acTypes)

  const initValue: AccountsItem = {
    // ac_id: uuidv4(),
    ac_name: '',
    ac_type_id: 1,
    ac_initial_bal: '0',
    ac_b_id: currentBook,
    // ac_note: '',
  }

  const handleSubmit = async values => {
    try {
      console.log('submit values', values)
      values.ac_b_id = currentBook
      await saveAccountsItem([{ ...values }])
      if (route?.params?.editObject) navigation.goBack()
      setCreated(state => state + 1)
      formikSetValues(initValue)
    } catch (error) {
      console.log(error)
    }
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

  const sampleAccs = [
    { label: 'Expense Food', value: '0' },
    { label: 'Asset Cash', value: '3' },
    { label: 'Income Salary', value: '5' },
    { label: 'Liability Credit Card', value: '7' },
  ]

  const [created, setCreated] = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      formikSetValues(initValue)
    }, [currentBook]),
  )

  React.useEffect(() => {
    if (route?.params?.selectedObject) {
      console.log('passedobject', route.params.selectedObject)
      const obj = route.params.selectedObject
      formikSetValues({
        ac_name: obj.ac_name,
        ac_type_id: obj.ac_type_id,
        ac_initial_bal: obj.ac_initial_bal,
        ac_b_id: obj.ac_b_id,
      })
    }

    if (route?.params?.editObject) {
      console.log('passedobject', route.params.editObject)
      const obj = route.params.editObject
      formikSetValues({
        ac_name: obj.ac_name,
        ac_type_id: obj.ac_type_id,
        ac_initial_bal: obj.ac_initial_bal,
        ac_id: obj.ac_id,
        ac_b_id: obj.ac_b_id,
      })
    }
  }, [])

  React.useEffect(() => {
    console.log(formikValues)
  }, [formikValues])

  return (
    <View style={[Gutters.smallHPadding, Gutters.regularVPadding]}>
      {/* <Text>AddAccount</Text> */}

      <AppInput
        label={'Name'}
        value={formikValues.ac_name}
        onChange={handleFormikChange('ac_name')}
      />
      <AppPicker
        label={'Type'}
        value={formikValues.ac_type_id}
        onChange={handleFormikChange('ac_type_id')}
        data={acTypes}
      />
      <AppInput
        label={'Initial'}
        value={String(formikValues.ac_initial_bal)}
        onChange={handleFormikChange('ac_initial_bal')}
        keyboardType="numeric"
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

export default AddAccount

const styles = StyleSheet.create({})
