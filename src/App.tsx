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
import GenericFilter from './components/GenericFilter'
import categories from './components/categories'
import priorities from './components/priorities'
import { Task } from './components/TaskList'

function App() {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			description: 'React',
			length: 60,
			category: 'Study',
			priority: '2: High',
			finished: false,
		},
		{
			id: 2,
			description: 'Work a bit',
			length: 60,
			category: 'Work',
			priority: '4: Low',
			finished: false,
		},
		{
			id: 3,
			description: 'Walk the dog',
			length: 120,
			category: 'Extra',
			priority: '3: Medium',
			finished: false,
		},
	])

	const [selectedCategory, setSelectedCategory] = useState('')
	const [selectedPriority, setSelectedPriority] = useState('')

	// To keep track of an editing
	const [editingTask, setEditingTask] = useState<Task | null>(null)

	// const visibleTasks = selectedCategory
	// 	? tasks.filter((task) => task.category === selectedCategory)
	// 	: tasks

	// const visiblePriorities = selectedPriority
	// 	? tasks.filter((task) => task.priority === selectedPriority)
	// 	: tasks

	//combining two ternary logics into a single function - forgot to add return!
	const visibleTasks = () => {
		return tasks.filter((task) => {
			const matchesCategory = selectedCategory
				? task.category === selectedCategory
				: true
			const matchesPriority = selectedPriority
				? task.priority === selectedPriority
				: true
			return matchesCategory && matchesPriority
		})
	}

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
				<h2 className='mb-3 white'>Create task</h2>
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
				<h2 className='mb-3 white'>Your tasks</h2>
				<div className='flexContainer'>
					<div className='flexContainer'>
						<GenericFilter
							options={categories} // Replace with categories array if you have it
							value={selectedCategory}
							onChange={setSelectedCategory}
						/>
						<GenericFilter
							options={priorities} // Replace with priorities array if you have it
							value={selectedPriority}
							onChange={setSelectedPriority}
						/>
					</div>
				</div>
			</div>
			<TaskList
				tasks={visibleTasks()}
				onDelete={(id) => setTasks(tasks.filter((e) => e.id !== id))}
				onFinished={(id) => toggleFinished(id)}
				sortBy={(sortField) => sortBy(sortField as keyof Task)}
			></TaskList>
		</>
	)
}

export default App
