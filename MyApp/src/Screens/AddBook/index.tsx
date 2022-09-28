import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useCommonData, useTheme } from '@/Hooks'
import { saveBookItem } from '@/DB/services/bookService'
import { useFormik } from 'formik'
import { useFocusEffect } from '@react-navigation/native'
import AppInput from '@/Components/AppInput'
import { Button, Caption, Checkbox, Paragraph } from 'react-native-paper'
import AppCheckboxWLabel from '@/Components/AppCheckboxWLabel'

const AddBook = ({ route, navigation }) => {
  const { Gutters, Layout } = useTheme()

  const { acTypes } = useCommonData()

  // console.log('acTypes', acTypes)

  const initValue = {
    // ac_id: uuidv4(),
    b_name: '',
    b_symbol: '$',
    b_note: '',
    accounts: {
      copy_ac: false,
      create_d_ac: false,
    },
  }

  const handleSubmit = async values => {
    try {
      console.log('submit values', values)
      const { accounts, ...rest } = values
      await saveBookItem([{ ...rest }])
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
    }, []),
  )

  React.useEffect(() => {
    if (route?.params?.selectedObject) {
      console.log('passedobject', route.params.selectedObject)
      const obj = route.params.selectedObject
      formikSetValues({
        b_id: obj.b_id,
        b_name: obj.b_name,
        b_symbol: obj.b_symbol,
        b_note: obj.b_note,
        accounts: {
          copy_ac: false,
          create_d_ac: false,
        },
      })
    }

    if (route?.params?.editObject) {
      console.log('passedobject', route.params.editObject)
      const obj = route.params.editObject
      formikSetValues({
        b_id: obj.b_id,
        b_name: obj.b_name,
        b_symbol: obj.b_symbol,
        b_note: obj.b_note,
        accounts: {
          copy_ac: false,
          create_d_ac: false,
        },
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
        value={formikValues.b_name}
        onChange={handleFormikChange('b_name')}
      />

      <AppInput
        label={'Symbol'}
        value={String(formikValues.b_symbol)}
        onChange={handleFormikChange('b_symbol')}
        keyboardType="numeric"
      />
      <Text>Account Options</Text>
      <AppCheckboxWLabel
        value={formikValues.accounts.copy_ac}
        onChange={() => {
          formikSetFieldValue(
            'accounts.copy_ac',
            !formikValues.accounts.copy_ac,
          )
        }}
        label={'Copy all the current accounts (dummy)'}
      />
      <AppCheckboxWLabel
        value={formikValues.accounts.create_d_ac}
        onChange={() => {
          formikSetFieldValue(
            'accounts.create_d_ac',
            !formikValues.accounts.create_d_ac,
          )
        }}
        label={'Copy all the current accounts (dummy)'}
      />

      <AppInput
        label={'Note'}
        value={formikValues.b_note}
        onChange={handleFormikChange('b_note')}
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

export default AddBook

const styles = StyleSheet.create({})
