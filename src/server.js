import express from 'express'
import Database from 'better-sqlite3'
import cors from 'cors'
import { editTask, getTasks, toggleFinished } from '../model/tasksFunctions.js'

const server = express()
const port = 3001
const host = '0.0.0.0'

server.use(cors()) // Enable CORS for all routes

server.get('/gettasks', (req, res) => {
	const rows = getTasks()
	res.json(rows)
})

server.post('/togglefinished/:id', (req, res) => {
	const id = parseInt(req.params.id, 10)
	const updatedTask = toggleFinished(id)
	if (updatedTask) {
		res.json(updatedTask)
	} else {
		res.status(404).json({ error: 'Task not found' })
	}
})

server.listen(port, host, () => {
	console.log(`listening at port: ${port}`)
})
