import { RequestHandler } from 'express'
import { psql } from '../config/db'

export const data: RequestHandler = async (req, res) => {
  try {
    const data = await psql.query('SELECT * FROM users')

    res.status(200).json({ message: data.rows })
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: [{ msg: 'Server error!' }] })
  }
}
