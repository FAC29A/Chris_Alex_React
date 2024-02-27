import db from '../database/db'

{
    const create_task = db.prepare(/*sql*/ `
    INSERT INTO tasks (description, priority, length, category)
    `)
}

function createTask(task) {
    return create_task.get(task);
}


{
    const get_All_Tasks = db.prepare (/*sql*/ `
    SELECT * FROM tasks
    `)
}

function getTasks() {
    return get_All_Tasks.all();
}

{
    const delete_Task = db.prepare(/*sql*/ `
    DELETE FROM tasks WHERE id = ?
    `)
}

function deleteTask(id) {
    delete_Tasks.run(id);
}

{
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
}

function editTask(id) {
    return edit_Task.get(id)
}

export {
    createTask, 
    editTask, 
    deleteTask, 
    editTask
};
