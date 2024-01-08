import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ItemType } from '../types'
import { psql } from '../config/db'

const secret = process.env.JWT_SECRET || 'secret'

export const login: RequestHandler = async (req, res) => {
  const { user_name, password_hash }: ItemType = req.body

  try {
    // check if user exists
    const user = await psql.query('SELECT * FROM users WHERE user_name = $1', [user_name])

    if (user.rows.length === 0) {
      return res.status(400).json({ errors: [{ msg: 'The user does not exist!' }] })
    }

    // Check passwords
    const match = await bcrypt.compare(password_hash, user.rows[0].password_hash)

    if (!match) {
      return res.status(401).json({ errors: [{ msg: 'Unauthorized!' }] })
    }

    // issue signed token with secret and payload data inside (username)
    const payload = {
      username: user.rows[0].password_hash,
    }

    jwt.sign(payload, secret, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: [{ msg: 'Server error!' }] })
  }
}
