import { FaCheckCircle } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

export interface Task {
	id: number
	description: string
	length: number
	category: string
	priority: string
	finished: boolean
}

interface Props {
	tasks: Task[]
	onDelete: (id: number) => void
	onFinished: (id: number) => void
	sortBy: (sortField: string) => void
}

const TaskList = ({ tasks, onDelete, onFinished, sortBy }: Props) => {
	//if (tasks.length === 0) return null

	return (
		<table className='table  align-middle text-center'>
			<thead>
				<tr className={'text-center table-secondary'}>
					<th role='button' onClick={() => sortBy('description')}>
						Description
					</th>
					<th role='button' onClick={() => sortBy('length')}>
						Length (min)
					</th>
					<th role='button' onClick={() => sortBy('category')}>
						Category
					</th>
					<th role='button' onClick={() => sortBy('priority')}>
						Priority
					</th>
					<th>Finished</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{tasks.map((task) => (
					<tr
						key={task.id}
						className={`${task.finished ? 'table-success' : ''}`}
					>
						<td>{task.description}</td>
						<td>{task.length}</td>
						<td>{task.category}</td>
						<td>{task.priority}</td>
						<td>
							<button
								onClick={() => onFinished(task.id)}
								className='btn align-middle '
							>
								<FaCheckCircle
									style={{
										color: task.finished ? 'green' : 'grey',
										fontSize: '20px',
									}}
								/>
							</button>
						</td>
						<td>
							<button
								onClick={() => onDelete(task.id)}
								className='btn btn-danger '
							>
								<MdDeleteForever
									style={{
										color: 'white',
										fontSize: '20px',
									}}
								/>
							</button>
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr className='table-secondary'>
					<td>Total Length</td>
					<td>
						{tasks
							.reduce(
								(acc, task) => (!task.finished ? acc + task.length : acc),
								0
							)
							.toFixed(2) + ' min'}
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tfoot>
		</table>
	)
}

export default TaskList
