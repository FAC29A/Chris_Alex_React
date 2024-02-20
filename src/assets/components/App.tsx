//import ListGroup from "./components/ListGroup"
// import Alert from './components/Alert'
// import Button from './components/Button'
// import { LuAperture } from 'react-icons/lu'
// import Like from './components/Like'
// import ExpandableText from './components/ExpandableText'
// import ExpandableButton from './components/ExpandableButton'
//import Form from './components/Form'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import MyForm from './components/MyForm'
import TaskList from './components/TaskList'
import Filter from './components/Filter'
import { Task } from './components/TaskList'

function App() {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			description: 'React',
			length: 60,
			category: 'Study',
			finished: false,
		},
		{
			id: 2,
			description: 'Work a bit',
			length: 60,
			category: 'Work',
			finished: false,
		},
		{
			id: 3,
			description: 'Walk the dog',
			length: 120,
			category: 'Extra',
			finished: false,
		},
	])

	const [selectedCategory, setSelectedCategory] = useState('')

	const visibleTasks = selectedCategory
		? tasks.filter((task) => task.category === selectedCategory)
		: tasks

	const toggleFinished = (id: number) => {
		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				return { ...task, finished: !task.finished }
			}
			return task
		})
		setTasks(updatedTasks)
	}

	const sortBy = (sortField: keyof Task) => {
		const sortedTasks = [...tasks].sort((a, b) => {
			// Ensure both values are strings before comparing
			if (
				typeof a[sortField] === 'string' &&
				typeof b[sortField] === 'string'
			) {
				return (a[sortField] as string).localeCompare(b[sortField] as string)
			}
			// Ensure both values are numbers before comparing
			else if (
				typeof a[sortField] === 'number' &&
				typeof b[sortField] === 'number'
			) {
				return (a[sortField] as number) - (b[sortField] as number)
			}
			// Default case for non-comparable types (like boolean)
			return 0
		})
		setTasks(sortedTasks)
	}

	return (
		<>
			<div className='mb-5'>
				<h2 className='mb-3'>Create task</h2>
				<MyForm
					onSubmit={(task) =>
						setTasks([
							...tasks,
							{ ...task, id: parseInt(uuidv4()), finished: false },
						])
					}
				></MyForm>
			</div>

			<div className='mb-3'>
				<h2 className='mb-3'>Your tasks</h2>
				<Filter
					onSelectCategory={(category) => setSelectedCategory(category)}
				></Filter>
			</div>
			<TaskList
				tasks={visibleTasks}
				onDelete={(id) => setTasks(tasks.filter((e) => e.id !== id))}
				onFinished={(id) => toggleFinished(id)}
				sortBy={(sortField) => sortBy(sortField as keyof Task)}
			></TaskList>
		</>
	)
}

export default App
