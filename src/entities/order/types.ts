export type Order = {
  id: string
  date: string
  time: string
  subject: string
  contact: string
  communicationType: string
  orderNumber: string
  status: 'sent' | 'error'
}
