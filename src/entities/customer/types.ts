export type CustomerProfile = {
  id: string
  name: string
  gender: string
  age: number
  email: string
  phones: string[]
  accountId: string
}

export type CommunicationStats = {
  sms: number
  email: number
  orders: number
}

export type CarrierStatus = {
  status: string
  since: string
}
