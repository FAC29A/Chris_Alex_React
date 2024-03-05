import db from '../database/db.js'

const create_task = db.prepare(/*sql*/ `
    INSERT INTO tasks (description, length, priority, category)
    VALUES ($description, $length, $priority, $category)
    RETURNING id, description, length, priority, category, finished, taskDate
    `)

function createTask(task) {
	return create_task.get(task)
}

const get_Task_By_Id = db.prepare(/*sql*/ `
    SELECT * FROM tasks WHERE id = ?
`)

function getTaskById(id) {
	return get_Task_By_Id.get(id)
}

const get_All_Tasks = db.prepare(/*sql*/ `
    SELECT * FROM tasks
    `)

function getTasks() {
	return get_All_Tasks.all()
}

const delete_Task = db.prepare(/*sql*/ `
    DELETE FROM tasks WHERE id = ?
    `)

function deleteTask(id) {
	const info = delete_Task.run(id)
	return info
}

const edit_Task = db.prepare(/*sql*/ `
    UPDATE tasks
    SET description = $description,
    priority = $priority,
    length = $length,
    category = $category,
    finished = $finished
    WHERE id = $id
    RETURNING 
    id, 
    description, 
    priority, 
    length, 
    category, 
    taskDate, 
    finished
    `)

function editTask(task) {
	return edit_Task.get(task)
}

function toggleFinished(id) {
	const task = getTaskById(id)
	if (task) {
		const newFinishedValue = task.finished === 0 ? 1 : 0
		return editTask({ ...task, finished: newFinishedValue })
	} else {
		return null // or throw an error
	}
}

export {
	createTask,
	getTasks,
	deleteTask,
	editTask,
	toggleFinished,
	getTaskById,
}
