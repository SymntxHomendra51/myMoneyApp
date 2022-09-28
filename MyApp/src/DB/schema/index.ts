export const BooksItem = {
  b_id: ['INTEGER', 'PRIMARY KEY'],
  b_name: ['TEXT', 'NOT NULL'],
  b_symbol: ['TEXT'],
  b_note: ['TEXT'],
}

export const AccountsItem = {
  ac_id: ['INTEGER', 'PRIMARY KEY'],
  ac_b_id: ['INTEGER', 'NOT NULL'],
  ac_name: ['TEXT', 'NOT NULL'],
  ac_type_id: ['INTEGER'],
  ac_initial_bal: ['INTEGER'],
}

export const RecordItem = {
  r_id: ['INTEGER', 'PRIMARY KEY'],
  // r_name: ['TEXT'],
  r_from_ac_type_id: ['INTEGER'],
  r_to_ac_type_id: ['INTEGER'],
  r_date: ['TEXT'],
  r_amount: ['INTEGER'],
  r_note: ['TEXT'],
  r_b_id: ['INTEGER', 'NOT NULL'],
}

export const TemplateItem = {
  temp_id: ['INTEGER', 'PRIMARY KEY'],
  temp_json: ['TEXT'],
  temp_b_id: ['INTEGER', 'NOT NULL'],
}
