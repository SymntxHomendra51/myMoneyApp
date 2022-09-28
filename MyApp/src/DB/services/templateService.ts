import { SQLiteDatabase } from 'react-native-sqlite-storage'
import { dbTableNames } from '../initData'
import { AccountsItem, BooksItem, TemplateItem } from '../models'
import { getDBConnection } from './db-service'

export const saveTemplatesItem = async (
  // db: SQLiteDatabase,
  tempItems: TemplateItem[],
) => {
  const db = await getDBConnection()
  const insertQuery =
    `INSERT OR REPLACE INTO ${dbTableNames[3].name} (temp_id,temp_json,temp_b_id) values` +
    tempItems
      .map(i => `('${i.temp_id}','${i.temp_json}', '${i.temp_b_id}')`)
      .join(',')

  return db.executeSql(insertQuery)
}

export const findTemplateItem = async (id: number): Promise<TemplateItem[]> => {
  try {
    const db = await getDBConnection()
    const tempLateItems: TemplateItem[] = []
    const query = `SELECT * FROM ${dbTableNames[3].name} WHERE temp_id = ${id}`
    const results = await db.executeSql(query)
    console.log('db books ', results, query)
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        tempLateItems.push(result.rows.item(index))
      }
    })
    // console.log('tempLateItems', tempLateItems)
    return tempLateItems
  } catch (error) {
    console.error(error)
    throw Error('Failed to get booksItems !!!')
  }
}
export const getTemplatesItem = async (
  db: SQLiteDatabase,
): Promise<TemplateItem[]> => {
  try {
    const db = await getDBConnection()
    const booksItems: TemplateItem[] = []
    const query = `SELECT * FROM ${dbTableNames[3].name}`
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

export const deleteTemplatesItem = async (
  // db: SQLiteDatabase,
  id: number,
) => {
  const db = await getDBConnection()

  const deleteQuery = `DELETE from ${dbTableNames[3].name} where temp_id = ${id}`
  await db.executeSql(deleteQuery)
}

export const accountDb = {
  saveTemplatesItem,
  deleteTemplatesItem,
  getTemplatesItem,
}
