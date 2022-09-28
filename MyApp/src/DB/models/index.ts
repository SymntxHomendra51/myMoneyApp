export type ToDoItem = {
  id: number
  value: string
}

export type BooksItem = {
  b_id: number
  b_name: string
  b_symbol: string
  b_note: string
}
export type AccountsItem = {
  ac_id?: number
  ac_b_id: number
  ac_name: string
  ac_type_id: number
  ac_initial_bal: number
}

export type RecordsItem = {
  r_id?: number
  r_b_id: number
  r_name: string
  r_from_ac_type_id: number
  r_to_ac_type_id: number
  r_date: string
  r_amount: number
  r_note: string
}

export type TemplateItem = {
  temp_id: number
  temp_json: string
  temp_b_id: number
}
