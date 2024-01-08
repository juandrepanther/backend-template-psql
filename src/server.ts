import { config } from 'dotenv'
config()

import express from 'express'
import cors from 'cors'
import { router } from './router'

const app = express()
const port = process.env.PORT

app.use(express.json())

// allow cross-origin connections
app.use(cors())

// routes
app.use(router)

// start the server
app.listen(port, () => console.log(`Server is running on port: ${port}`))
