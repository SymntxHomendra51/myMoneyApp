import { SQLiteDatabase } from 'react-native-sqlite-storage'
import { AccountsItem, BooksItem } from '../models'
import { getDBConnection, tableNames } from './db-service'

export const saveAccountsItem = async (
  // db: SQLiteDatabase,
  accItems: AccountsItem[],
) => {
  const db = await getDBConnection()

  const insertQuery =
    `INSERT OR REPLACE INTO ${tableNames[2].name} (ac_id, ac_name,ac_type_id,ac_initial_bal) values` +
    accItems
      .map(
        i =>
          `(${i.ac_id}, '${i.ac_initial_bal}','${i.ac_name}', '${i.ac_type_id}')`,
      )
      .join(',')

  return db.executeSql(insertQuery)
}

export const getAccountsItem = async (
  db: SQLiteDatabase,
): Promise<AccountsItem[]> => {
  try {
    const db = await getDBConnection()
    const booksItems: AccountsItem[] = []
    const query = `SELECT * FROM ${tableNames[2].name}`
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

export const deleteAccountsItem = async (
  // db: SQLiteDatabase,
  id: number,
) => {
  const db = await getDBConnection()

  const deleteQuery = `DELETE from ${tableNames[2].name} where ac_id = ${id}`
  await db.executeSql(deleteQuery)
}

export const accountDb = {
  saveAccountsItem,
  deleteAccountsItem,
  getAccountsItem,
}
