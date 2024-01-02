export type User = {
  id: string
  email: string
  role: 'USER' | 'ADM' | 'MASTER'
  account_id: string
}
