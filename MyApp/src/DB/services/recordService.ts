import { SQLiteDatabase } from 'react-native-sqlite-storage'
import { BooksItem, RecordsItem } from '../models'
import { getDBConnection, tableNames } from './db-service'

export const saveRecordItem = async (
  // db: SQLiteDatabase,
  recordItems: RecordsItem[],
) => {
  const db = await getDBConnection()
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableNames[1].name} (r_id, r_name,r_from_ac_type_id,r_to_ac_type_id,r_date,r_amount,r_note) values` +
    recordItems
      .map(
        i =>
          `(${i.r_id}, '${i.r_name}','${i.r_from_ac_type_id}','${i.r_to_ac_type_id}', '${i.r_date}','${i.r_amount}','${i.r_note}')`,
      )
      .join(',')

  return db.executeSql(insertQuery)
}

export const getRecordItem = async (
  db: SQLiteDatabase,
): Promise<RecordsItem[]> => {
  try {
    const db = await getDBConnection()
    const recordItems: RecordsItem[] = []
    const query = `SELECT * FROM ${tableNames[1].name}`
    const results = await db.executeSql(query)
    // console.log('db books ', results, query)
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        recordItems.push(result.rows.item(index))
      }
    })
    // console.log('booksItems', booksItems)
    return recordItems
  } catch (error) {
    console.error(error)
    throw Error('Failed to get booksItems !!!')
  }
}

export const deleteRecordItem = async (
  // db: SQLiteDatabase,
  id: number,
) => {
  try {
    const db = await getDBConnection()
    const deleteQuery = `DELETE from ${tableNames[1].name} where r_id = ${id}`
    await db.executeSql(deleteQuery)
  } catch (error) {
    console.log('error', error)
  }
}
