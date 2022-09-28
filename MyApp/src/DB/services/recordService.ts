import { SQLiteDatabase } from 'react-native-sqlite-storage'
import { dbTableNames } from '../initData'
import { BooksItem, RecordsItem } from '../models'
import { getDBConnection } from './db-service'

export const saveRecordItem = async (b_id = 1, recordItems: RecordsItem[]) => {
  try {
    const db = await getDBConnection()
    const insertQuery =
      `INSERT OR REPLACE INTO ${dbTableNames[1].name} (${
        recordItems[0].r_id ? ` r_id,` : ''
      }r_from_ac_type_id,r_to_ac_type_id,r_date,r_amount,r_note,r_b_id) values` +
      recordItems
        .map(
          i =>
            `(${recordItems[0].r_id ? i.r_id + ',' : ''}${
              i.r_from_ac_type_id
            },'${i.r_to_ac_type_id}', '${i.r_date}','${i.r_amount}','${
              i.r_note
            }','${b_id}')`,
        )
        .join(',')

    console.log('inserquery', insertQuery)

    return db.executeSql(insertQuery)
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getRecordItem = async (b_id = 1): Promise<RecordsItem[]> => {
  try {
    const db = await getDBConnection()
    const recordItems: RecordsItem[] = []
    const query = `SELECT * FROM ${dbTableNames[1].name} where r_b_id = ${b_id}`
    console.log('db records ', recordItems, query)
    const results = await db.executeSql(query)
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        recordItems.push(result.rows.item(index))
      }
    })
    // console.log('recordItems', recordItems)
    return recordItems
  } catch (error) {
    console.error(error)
    throw Error('Failed to get booksItems !!!')
  }
}

const getFilter = string => {
  switch (string) {
    case 'month':
      return '%m/%Y'
      break
    case 'year':
      return '%Y'
      break
    case 'day':
      return '%d/%m/%Y'
      break

    default:
      return '%d/%m/%Y'
  }
}
export const getFilteredRecords = async (
  b_id = 1,
  filterType: 'month' | 'year' | 'day',
  value: string,
): Promise<RecordsItem[]> => {
  try {
    const type = getFilter(filterType)

    const queryFields = `a.r_id, a.ac_id as r_from_ac_id, a.ac_initial_bal as r_from_ac_initial, a.ac_type_id as ac_from_type_id,a.ac_name as ac_from_name,b.ac_id as r_to_ac_id, b.ac_initial_bal as r_to_ac_initial, b.ac_type_id as ac_to_type_id,b.ac_name as ac_to_name, a.r_amount,a.r_date,a.r_note`
    const queryTable1 = `SELECT * FROM  mm_records LEFT JOIN mm_accounts ON  mm_records.r_from_ac_type_id = mm_accounts.ac_id`
    const queryTable2 = `SELECT * FROM  mm_records LEFT JOIN mm_accounts ON  mm_records.r_to_ac_type_id = mm_accounts.ac_id`
    const queryJoinCondition = `a.r_id = b.r_id`
    const queryCondition = `strftime('${type}', a.r_date ) = '${value}' AND a.r_b_id = ${b_id}`

    const db = await getDBConnection()
    const recordItems: RecordsItem[] = []
    const query = `SELECT ${queryFields} FROM (${queryTable1}) as a JOIN (${queryTable2}) as b WHERE ${queryJoinCondition} AND ${queryCondition}`
    console.log('db records ', recordItems, query)
    const results = await db.executeSql(query)

    // const results = await db.executeSql(query)
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        recordItems.push(result.rows.item(index))
      }
    })
    // console.log('recordItems', recordItems)
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
    const deleteQuery = `DELETE from ${dbTableNames[1].name} where r_id = ${id}`
    console.log('delete query', deleteQuery)

    await db.executeSql(deleteQuery)
  } catch (error) {
    console.log('error', error)
  }
}
// Test query
// SELECT  a.r_id, a.ac_id as r_from_ac_id, a.ac_initial_bal as r_from_ac_initial, a.ac_type_id as ac_from_type_id,a.ac_name as ac_from_name,b.ac_id as r_to_ac_id, b.ac_initial_bal as r_to_ac_initial, b.ac_type_id as ac_to_type_id,b.ac_name as ac_to_name, a.r_amount,a.r_date,a.r_note
// FROM (SELECT  * FROM  mm_records LEFT JOIN mm_accounts ON  mm_records.r_from_ac_type_id = mm_accounts.ac_id) as a
// JOIN (SELECT * FROM  mm_records LEFT JOIN mm_accounts ON  mm_records.r_to_ac_type_id = mm_accounts.ac_id) as b WHERE a.r_id = b.r_id AND strftime('%m/%Y', a.r_date ) = '09/2022' AND a.r_b_id = 1
