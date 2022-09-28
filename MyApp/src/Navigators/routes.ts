import Accounts from '@/Screens/Accounts'
import AddAccount from '@/Screens/AddAccount'
import AddBook from '@/Screens/AddBook'
import AddRecord from '@/Screens/AddRecord'
import Homepage from '@/Screens/Homepage'

export enum ScreenRoutes {
  addRecord = 'Create Record',
  addAccount = 'Create Account',
  addBook = 'Create Book',
}

export const ScreenComponents = {
  AddRecord,
  AddAccount,
  AddBook,
}
