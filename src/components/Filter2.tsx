import priorities from "./priorities"

interface Props {
	onSelectPriority: (priority: string) => void
}

const Filter2 = ({ onSelectPriority }: Props) => {
	return (
		<select
			className='form-select'
			onChange={(event) => onSelectPriority(event.target.value)}
		>
			<option value=''>All priorities</option>
			{priorities.map((priority) => (
				<option key={priority} value={priority}>
					{priority}
				</option>
			))}
		</select>
	)
}

export default Filter2
