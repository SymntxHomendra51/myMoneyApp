import { SQLiteDatabase } from 'react-native-sqlite-storage'
import { dbTableNames } from '../initData'
import { AccountsItem, BooksItem } from '../models'
import { getDBConnection } from './db-service'

export const saveAccountsItem = async (
  // db: SQLiteDatabase,
  accItems: AccountsItem[],
) => {
  const db = await getDBConnection()

  const insertQuery =
    `INSERT OR REPLACE INTO ${dbTableNames[2].name} (${
      accItems[0].ac_id ? ` ac_id,` : ''
    }ac_name,ac_type_id,ac_initial_bal,ac_b_id) values` +
    accItems
      .map(
        i =>
          `(${accItems[0]?.ac_id ? i.ac_id + ',' : ''} '${i.ac_name}','${
            i.ac_type_id
          }', '${i.ac_initial_bal}', '${i.ac_b_id}')`,
      )
      .join(',')

  console.log('query', insertQuery)

  return db.executeSql(insertQuery)
}

export const getAccountsItem = async (b_id = 1): Promise<AccountsItem[]> => {
  try {
    const db = await getDBConnection()
    const booksItems: AccountsItem[] = []
    const query = `SELECT * FROM ${dbTableNames[2].name} where ac_b_id = ${b_id}`
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

  const deleteQuery = `DELETE from ${dbTableNames[2].name} where ac_id = ${id}`
  await db.executeSql(deleteQuery)
}

export const accountDb = {
  saveAccountsItem,
  deleteAccountsItem,
  getAccountsItem,
}
