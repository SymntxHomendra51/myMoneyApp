import { SQLiteDatabase } from 'react-native-sqlite-storage'
import { dbTableNames } from '../initData'
import { BooksItem } from '../models'
import { getDBConnection } from './db-service'

export const saveBookItem = async (
  // db: SQLiteDatabase,
  bookItems: BooksItem[],
) => {
  const db = await getDBConnection()

  const insertQuery =
    `INSERT OR REPLACE INTO ${dbTableNames[0].name} (${
      bookItems[0].b_id ? ` b_id,` : ''
    } b_name,b_symbol) values` +
    bookItems
      .map(
        i =>
          `(${bookItems[0]?.b_id ? i.b_id + ',' : ''}'${i.b_name}','${
            i.b_symbol
          }')`,
      )
      .join(',')

  return db.executeSql(insertQuery)
}

export const getBookItem = async (db: SQLiteDatabase): Promise<BooksItem[]> => {
  try {
    const db = await getDBConnection()
    const booksItems: BooksItem[] = []
    const query = `SELECT * FROM ${dbTableNames[0].name}`
    const results = await db.executeSql(query)
    // console.log('db books ', results, query)
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        booksItems.push(result.rows.item(index))
      }
    })
    // console.log('booksItems', booksItems)
    return booksItems
  } catch (error) {
    console.error(error)
    throw Error('Failed to get booksItems !!!')
  }
}

export const deleteBookItem = async (
  // db: SQLiteDatabase,
  id: number,
) => {
  const db = await getDBConnection()

  const deleteQuery = `DELETE from ${dbTableNames[0].name} where b_id = ${id}`
  await db.executeSql(deleteQuery)
}
