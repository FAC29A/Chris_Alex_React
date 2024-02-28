
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import MyForm from './components/MyForm'
import TaskList from './components/TaskList'
import GenericFilter from './components/GenericFilter'
import categories from './components/categories'
import priorities from './components/priorities'
import { Task } from './components/TaskList'
import { createTask, getTasks, deleteTask, editTask } from '../model/tasksFunctions'




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


	//combining two ternary logics into a single function 
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

	const liveEdit = (searchId: number, description: string) => {
		console.log(searchId, description);
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
				onEdit={(id, description) => liveEdit(id, description)}
				onDelete={(id) => setTasks(tasks.filter((e) => e.id !== id))}
				onFinished={(id) => toggleFinished(id)}
				sortBy={(sortField) => sortBy(sortField as keyof Task)}
			></TaskList>
		</>
	)
}

export default App
