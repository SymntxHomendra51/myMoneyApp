import { AccountsItem, BooksItem, RecordItem, TemplateItem } from './schema'

export const dbTableNames = [
  { name: 'mm_books1', schema: BooksItem },
  { name: 'mm_records', schema: RecordItem },
  { name: 'mm_accounts', schema: AccountsItem },
  { name: 'mm_templates', schema: TemplateItem },
]

export const dbInitAccounts = [
  { ac_b_id: 1, ac_id: 1, ac_initial_bal: 0, ac_name: 'Cash', ac_type_id: 1 },
  { ac_b_id: 1, ac_id: 3, ac_initial_bal: 0, ac_name: 'Salary', ac_type_id: 3 },
  {
    ac_b_id: 1,
    ac_id: 2,
    ac_initial_bal: 0,
    ac_name: 'Credit Card',
    ac_type_id: 2,
  },
  { ac_b_id: 1, ac_id: 4, ac_initial_bal: 0, ac_name: 'Food', ac_type_id: 4 },
]

export const dbInitBooks = [
  { b_name: 'go to shop', b_symbol: '$', b_id: 1, b_note: '' },
  { b_name: 'money', b_symbol: '$', b_id: 2, b_note: '' },
]
