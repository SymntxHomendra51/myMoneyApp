import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
  deleteDatabase,
} from 'react-native-sqlite-storage'
import { ToDoItem } from '../models'
import { AccountsItem, BooksItem, RecordItem } from '../schema'

export const tableNames = [
  { name: 'mm_books1', schema: BooksItem },
  { name: 'mm_records', schema: RecordItem },
  { name: 'mm_accounts', schema: AccountsItem },
]

enablePromise(true)

export const getDBConnection = async () => {
  return openDatabase({ name: 'my-money-data.db', location: 'default' })
}

const getSchemaQuery = schema => {
  let query = ''
  Object.entries(schema).forEach(arr => {
    const [k, v] = arr
    if (query.length) query += ', '
    query += `${k} ${v.join(' ')} `
  })

  console.log('query', query)
  return query
}

export const createTable = async (db: SQLiteDatabase, item) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${item.name} (
          ${getSchemaQuery(item.schema)}
      );`
  console.log('query', query)

  const result = await db.executeSql(query)
  console.log('query result', result)
}

export const createAllTable = async () => {
  // await removeDatabase()
  const db = await getDBConnection()
  console.log('db', db)
  await tableNames.forEach(async table => {
    await createTable(db, table)
    console.log('table created')
  })
}

export const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = []
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableNames[0].name}`,
    )
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    })
    return todoItems
  } catch (error) {
    console.error(error)
    throw Error('Failed to get todoItems !!!')
  }
}

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`
  await db.executeSql(deleteQuery)
}

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`

  await db.executeSql(query)
}

export const removeDatabase = async () => {
  await deleteDatabase({ name: 'my-money-data.db', location: 'default' })
}
