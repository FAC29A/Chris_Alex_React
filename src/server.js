import express from 'express'
import Database from 'better-sqlite3'
import cors from 'cors' // Import CORS module
//import db from '../database/db.js'
import { getTasks } from '../model/tasksFunctions.js'

const server = express()
const port = 3001
const host = '0.0.0.0'

server.use(cors()) // Enable CORS for all routes
// const db = new Database('./database/tasksdb.db')

server.get('/gettasks', (req, res) => {
	// const rows = db.prepare('SELECT * FROM tasks').all()
	const rows = getTasks()
	//reposnd with fetched data
	console.log(rows)
	res.json(rows)
})

server.listen(port, host, () => {
	console.log(`listening at port: ${port}`)
})
