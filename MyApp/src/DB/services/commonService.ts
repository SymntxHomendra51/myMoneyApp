import { dbInitAccounts, dbInitBooks } from '../initData'
import { getAccountsItem, saveAccountsItem } from './accountService'
import { getBookItem, saveBookItem } from './bookService'
import { createAllTable, getDBConnection } from './db-service'

export const loadDataCallback = async () => {
  try {
    const db = await getDBConnection()

    await createAllTable()

    const storedBookItems = await getBookItem(db)
    const storedRecordItems = await getAccountsItem()
    if (storedBookItems.length) {
      console.log('storedBookItems', storedBookItems)

      // setTodos(storedBookItems);
    } else {
      await saveBookItem(dbInitBooks)
      if (!storedRecordItems.length) await saveAccountsItem(dbInitAccounts)
      console.log('test1')
      // setTodos(initTodos);
    }
  } catch (error) {
    console.error(error)
  }
}
