import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  username?: string
}

export interface ItemType {
  first_name: string
  last_name: string
  gender: string
  email?: string
  date_of_birth: string
  country_of_birth: string
  user_name?: string
  password_hash?: string
}
