import React, { Children, useState } from 'react'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import storageActions from '@/Utils/asyncStorageActions'

export const CommonContext = React.createContext({
  acTypes: [],
  setActypes: () => {},
  currentBook: 0,
  setCurrentBook: () => {},
})

const CommonProvider = ({ children }) => {
  const [acTypes, setAcTypes] = React.useState([
    { value: 1, label: 'Asset', color: 'green' },
    { value: 2, label: 'Liability', color: 'yellow' },
    { value: 3, label: 'Income', color: 'blue' },
    { value: 4, label: 'Expense', color: 'red' },
  ])

  const [currentBook, setCurrentBook] = useState(1)

  const getBookId = async () => {
    const bookId = await storageActions.getData('@selectedBook')
    console.log('getbookid', bookId, currentBook)
    if (currentBook == bookId) return
    if (isNaN(bookId)) return

    setCurrentBook(Number(bookId))
  }
  const setBookId = async () => {
    await storageActions.storeData('@selectedBook', String(currentBook))
    // if (currentBook == bookId) return
    // setCurrentBook(Number(bookId))
  }
  React.useEffect(() => {
    getBookId()
  }, [])

  React.useEffect(() => {
    console.log('selected book', currentBook)
    // setBookId()
  }, [currentBook])

  return (
    <CommonContext.Provider
      value={{ acTypes, setAcTypes, currentBook, setCurrentBook }}
    >
      <ActionSheetProvider>{children}</ActionSheetProvider>
    </CommonContext.Provider>
  )
}

export default CommonProvider
