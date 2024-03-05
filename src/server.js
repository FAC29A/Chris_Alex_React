import express from 'express'
import cors from 'cors'
import {
	deleteTask,
	getTasks,
	toggleFinished,
} from '../model/tasksFunctions.js'

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

server.post('/deletetask/:id', (req, res) => {
	try {
		const id = parseInt(req.params.id, 10)
		const result = deleteTask(id)

		// Check if any rows were deleted
		if (result && result.changes > 0) {
			res.status(200).json({ message: 'Task successfully deleted' })
		} else {
			res.status(404).json({ message: 'Task not found' })
		}
	} catch (error) {
		console.error(error)
		res
			.status(500)
			.json({ message: 'Internal Server Error', error: error.message })
	}
})

server.listen(port, host, () => {
	console.log(`listening at port: ${port}`)
})
