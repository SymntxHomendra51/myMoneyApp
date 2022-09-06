import { getBookItem, saveBookItem } from './bookService'
import {
  createAllTable,
  createTable,
  getDBConnection,
  getTodoItems,
} from './db-service'

export const loadDataCallback = async () => {
  try {
    const initTodos = [
      { b_id: 0, b_name: 'go to shop', b_symbol: '$' },
      { b_id: 2, b_name: 'money', b_symbol: '$' },
      { b_id: 3, b_name: 'school', b_symbol: '$' },
    ]
    console.log('test1')
    const db = await getDBConnection()

    await createAllTable()
    const storedTodoItems = await getBookItem(db)
    if (storedTodoItems.length) {
      console.log('storedTodoItems', storedTodoItems)

      // setTodos(storedTodoItems);
    } else {
      await saveBookItem(db, initTodos)
      // setTodos(initTodos);
      console.log('initTodos', initTodos)
    }
  } catch (error) {
    console.error(error)
  }
}
