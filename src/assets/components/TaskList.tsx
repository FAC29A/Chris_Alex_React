import { FaCheckCircle } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

export interface Task {
	id: number
	description: string
	length: number
	category: string
	finished: boolean
}

interface Props {
	tasks: Task[]
	onDelete: (id: number) => void
	onFinished: (id: number) => void
	sortBy: (sortField: string) => void
}

const TaskList = ({ tasks, onDelete, onFinished, sortBy }: Props) => {
	if (tasks.length === 0) return null

	return (
		<table className='table  align-middle '>
			<thead>
				<tr className={'text-center table-secondary'}>
					<th onClick={() => sortBy('description')}>Description</th>
					<th onClick={() => sortBy('length')}>Length (min)</th>
					<th onClick={() => sortBy('category')}>Category</th>
					<th>Finished</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{tasks.map((task) => (
					<tr
						key={task.id}
						className={`text-center ${task.finished ? 'table-success' : ''}`}
					>
						<td>{task.description}</td>
						<td>{task.length}</td>
						<td>{task.category}</td>
						<td className={'text-center'}>
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
						<td className={'text-center'}>
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
				<tr>
					<td>Total Length</td>
					<td>
						{tasks
							.reduce(
								(acc, task) => (!task.finished ? acc + task.length : acc),
								0
							)
							.toFixed(2)}
					</td>
					<td></td>
					<td></td>
				</tr>
			</tfoot>
		</table>
	)
}

export default TaskList
