import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import MyForm from './components/MyForm'
import TaskList from './components/TaskList'
import GenericFilter from './components/GenericFilter'
import categories from './components/categories'
import priorities from './components/priorities'
import { Task } from './components/TaskList'
//import { GiConsoleController } from 'react-icons/gi'

function App() {
	const [tasks, setTasks] = useState<any[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3001/gettasks')
				if (!response.ok) {
					throw new Error('Failed to fetch data')
				}

				const jsonData = await response.json()
				setTasks(jsonData)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		fetchData()
	}, [tasks])

	const [selectedCategory, setSelectedCategory] = useState('')
	const [selectedPriority, setSelectedPriority] = useState('')

	const visibleTasks = () => {
		const filteredTasks = tasks.filter((task) => {
			const matchesCategory = selectedCategory
				? task.category === selectedCategory
				: true
			const matchesPriority = selectedPriority
				? task.priority === selectedPriority
				: true
			return matchesCategory && matchesPriority
		})
		//console.log('Filtered tasks:', filteredTasks)
		return filteredTasks
	}

	const toggleFinished = async (id: number) => {
		try {
			// Send a POST request to the server to toggle the finished status
			const response = await fetch(
				`http://localhost:3001/togglefinished/${id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response.ok) {
				throw new Error('Failed to toggle task status')
			}

			// Wait for the server to send back the updated task
			const updatedTask = await response.json()

			// Update the tasks state with the updated task
			setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)))
		} catch (error) {
			console.error('Error toggling task status:', error)
		}
	}

	const deleteTask = async (id: number) => {
		try {
			const response = await fetch(`http://localhost:3001/deletetask/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				throw new Error('Failed to delete task')
			}
			//setTasks(tasks.filter((task) => task.id !== id))
		} catch (error) {
			console.error('Error deleting task:', error)
		}
	}

	const liveEdit = (searchId: number, description: string) => {
		console.log(searchId, description)
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
				onDelete={(id) => deleteTask(id)}
				onFinished={(id) => toggleFinished(id)}
				sortBy={(sortField) => sortBy(sortField as keyof Task)}
			></TaskList>
		</>
	)
}

export default App
