export const BooksItem = {
  b_id: ['INTEGER', 'UNIQUE'],
  b_name: ['TEXT', 'NOT NULL'],
  b_symbol: ['TEXT'],
}

export const AccountsItem = {
  ac_id: ['INTEGER', 'UNIQUE'],
  ac_name: ['TEXT', 'NOT NULL'],
  ac_type_id: ['INTEGER'],
  ac_initial_bal: ['INTEGER'],
}
export const RecordItem = {
  r_id: ['INTEGER'],
  r_name: ['TEXT'],
  r_from_ac_type_id: ['INTEGER'],
  r_to_ac_type_id: ['INTEGER'],
  r_date: ['TEXT'],
  r_amount: ['INTEGER'],
  r_note: ['TEXT'],
}
