import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useCommonData, useTheme } from '@/Hooks'
import { ScrollView } from 'react-native-gesture-handler'
import { parseISO } from 'date-fns'
import { deleteBookItem, getBookItem } from '@/DB/services/bookService'
import { BooksItem } from '@/DB/models'
import customHeader from './customHeader'
import HomeRightAction from '@/Components/HomeRightAction'
import DrawerRightAction from '@/Components/DrawerRightAction'
import { ScreenRoutes } from '@/Navigators/routes'
import storageActions from '@/Utils/asyncStorageActions'

const Books = ({ navigation, route }) => {
  const { AppTheme, Layout, Gutters } = useTheme()
  // const styles = makeStyle(AppTheme)
  const [booksState, setBooksState] = useState([])
  const [selected, setSelected] = useState(0)

  const { Common } = useTheme()
  const { setCurrentBook, currentBook } = useCommonData()

  const getDbData = async () => {
    const books = await getBookItem()
    console.log('books', books)
    setBooksState([...books])
  }

  const handleSelection = id => {
    setSelected(state => (id == state ? 0 : id))
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure to Delete this',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteBookItem(selected)
            getDbData()
            setSelected(0)
          },
        },
        { text: 'No', onPress: () => console.log('cancelled') },
      ],
      { cancelable: true },
    )
  }
  const handleEdit = () => {
    console.log('copying', selected)
    const object = booksState.find(o => o.b_id == selected)
    console.log('object', object)

    navigation.navigate(ScreenRoutes.addBook, {
      selectedObject: object,
    })
  }

  const handleDefault = () => {
    console.log('default', selected)
    const object = booksState.find(o => o.b_id == selected)
    console.log('edit object', object)

    setCurrentBook(object?.b_id)
    setSelected(0)
    storageActions.storeData('@selectedBook', String(object?.b_id))
  }

  useFocusEffect(
    React.useCallback(() => {
      getDbData()
    }, []),
  )

  useEffect(() => {
    console.log('currentBook', currentBook)
  }, [currentBook])

  useEffect(() => {
    console.log('selected', selected)
    if (selected > 0)
      navigation.setOptions({
        headerRight: () =>
          customHeader.headerRight({
            delBtn: handleDelete,
            dfltBtn: handleDefault,
            edtBtn: handleEdit,
          }),
        headerLeft: () =>
          customHeader.headerLeft({
            bckBtn: () => setSelected(0),
          }),
      })
    else if (!selected) {
      console.log('no selection')
      navigation.setOptions({
        headerRight: () => (
          <DrawerRightAction addScreen={ScreenRoutes.addBook} />
        ),
        headerLeft: () =>
          customHeader.headerLeft({
            bckBtn: () => navigation.toggleDrawer(),
          }),
      })
    }
  }, [selected])

  return (
    <ScrollView contentContainerStyle={Gutters.regularHPadding}>
      {booksState?.map((item: BooksItem) => (
        <Pressable
          style={[
            Gutters.regularVMargin,
            Gutters.tinyHPadding,
            selected == item?.b_id && Common.backgroundPrimary,
          ]}
          key={item.b_id}
          onPress={() => handleSelection(item.b_id)}
        >
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <View>
              <Text>
                Name: {item?.b_name} {currentBook == item?.b_id && '(Default)'}
              </Text>
            </View>
            <View>
              <Text>Symbol: {item?.b_symbol}</Text>
            </View>
          </View>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <View>
              <Text>Id: {item?.b_id}</Text>
            </View>
            <View>
              <Text>Note: {item?.b_note}</Text>
            </View>
          </View>
        </Pressable>
      ))}
      <Text style={{ textAlign: 'center', fontSize: 12 }}>End OF LIST</Text>
    </ScrollView>
  )
}

export default Books

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
