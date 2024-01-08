import jwt, { JwtPayload } from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { AuthenticatedRequest } from '../types'

const secret = process.env.JWT_SECRET || 'secret'

export const auth: RequestHandler = (req: AuthenticatedRequest, res, next) => {
  // get token from header
  const token = req.header('token')

  // check if no token
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'Authorization denied!' }] })
  }

  // verify token
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload

    if (!decoded.username) {
      return res.status(401).json({ errors: [{ msg: 'The token is not valid!' }] })
    }

    next()
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server error!' }] })
  }
}
