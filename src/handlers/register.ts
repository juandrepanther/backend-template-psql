import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import { ItemType } from '../types'
import { psql } from '../config/db'

export const register: RequestHandler = async (req, res) => {
  const {
    user_name,
    password_hash,
    first_name,
    last_name,
    email,
    gender,
    date_of_birth,
    country_of_birth,
  }: ItemType = req.body

  try {
    let user = await psql.query('SELECT * FROM users WHERE user_name = $1', [user_name])

    // if user exists
    if (user.rows.length > 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists! No data is inserted!' }] })
    }

    // encrypt password

    const salt = await bcrypt.genSalt(10)
    const encrypted_password = await bcrypt.hash(password_hash, salt)

    // add new user in database

    await psql.query(
      'INSERT INTO users (first_name, last_name, email, gender, date_of_birth, country_of_birth, user_name, password_hash) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        first_name,
        last_name,
        email,
        gender,
        date_of_birth,
        country_of_birth,
        user_name,
        encrypted_password,
      ],
    )

    res.status(201).json({ message: `The New user is created: ${user_name}` })
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: [{ msg: 'Server error' }] })
  }
}
