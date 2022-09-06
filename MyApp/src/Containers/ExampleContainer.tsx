import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme, ThemeState } from '@/Store/Theme'
import {
  createTable,
  deleteTodoItem,
  getDBConnection,
  getTodoItems,
  saveTodoItems,
} from '@/DB/services/db-service'
import { random } from 'lodash'
import { loadDataCallback } from '@/DB/services/commonService'
import { getBookItem, saveBookItem } from '@/DB/services/bookService'

const ExampleContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [userId, setUserId] = useState('9')
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()

  useEffect(() => {
    fetchOne(userId)
  }, [fetchOne, userId])

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  // const loadDataCallback = useCallback(async () => {
  //   try {
  //     const initTodos = [
  //       { id: 0, value: 'go to shop' },
  //       { id: 1, value: 'eat at least a one healthy foods' },
  //       { id: 2, value: 'Do some exercises' },
  //     ]
  //     console.log('test1')
  //     const db = await getDBConnection()

  //     await createTable(db)
  //     const storedTodoItems = await getTodoItems(db)
  //     if (storedTodoItems.length) {
  //       console.log('storedTodoItems', storedTodoItems)

  //       // setTodos(storedTodoItems);
  //     } else {
  //       await saveTodoItems(db, initTodos)
  //       // setTodos(initTodos);
  //       console.log('initTodos', initTodos)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [])
  useEffect(() => {
    loadDataCallback()
  }, [loadDataCallback])
  const addBooks = async () => {
    // if (!newTodo.trim()) return
    try {
      const newTodos = [
        // ...todos,
        {
          // id: todos.length
          //   ? todos.reduce((acc, cur) => {
          //       if (cur.id > acc.id) return cur
          //       return acc
          //     }).id + 1
          //   : 0,
          b_id: 10 + random(10, 1000000),
          b_name: 'newBook',
          b_symbol: '$',
        },
        {
          b_id: 10 + random(10, 1000000),
          b_name: 'newBook' + random(10, 1000000),
          b_symbol: '₹',
        },
        {
          b_id: 10 + random(10, 1000000),
          b_name: 'newBook' + random(10, 1000000),
          b_symbol: '#',
        },
      ]
      console.log('newTodos', newTodos)

      const db = await getDBConnection()

      await saveBookItem(db, newTodos)
      console.log('newTodos', newTodos)
    } catch (error) {
      console.error(error)
    }
  }
  const getBooks = async (id: number) => {
    try {
      const db = await getDBConnection()
      const result = await getBookItem(db)
      // todos.splice(id, 1)
      // setTodos(todos.slice(0))
      console.log('bookitems', result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
        {(isLoading || isFetching) && <ActivityIndicator />}
        {!isSuccess ? (
          <Text style={Fonts.textRegular}>{error}</Text>
        ) : (
          <Text style={Fonts.textRegular}>
            {t('example.helloUser', { name: data?.name })}
          </Text>
        )}
      </View>
      <View
        style={[
          Layout.row,
          Layout.rowHCenter,
          Gutters.smallHPadding,
          Gutters.largeVMargin,
          Common.backgroundPrimary,
        ]}
      >
        <Text style={[Layout.fill, Fonts.textCenter, Fonts.textSmall]}>
          {t('example.labels.userId')}
        </Text>
        <TextInput
          onChangeText={setUserId}
          editable={!isLoading}
          keyboardType={'number-pad'}
          maxLength={1}
          value={userId}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput]}
        />
      </View>
      <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>DarkMode :</Text>

      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: null })}
      >
        <Text style={Fonts.textRegular}>Auto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Common.button.outlineRounded, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: true })}
      >
        <Text style={Fonts.textRegular}>Dark</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: false })}
      >
        <Text style={Fonts.textRegular}>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Common.button.outlineRounded, Gutters.regularBMargin]}
        onPress={() => addBooks()}
      >
        <Text style={Fonts.textRegular}>Add Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => getBooks()}
      >
        <Text style={Fonts.textRegular}>Delete Item</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ExampleContainer
