import priorities from './priorities'

interface Props {
	onSelectPriority: (priority: string) => void
	onSelectCategory: (category: string) => void
}

const Filter2 = ({ onSelectPriority, onSelectCategory }: Props) => {
	return (
		<select
			className='form-select width100'
			onChange={(event) => {
				onSelectPriority(event.target.value)
				onSelectCategory('All categories')
			}}
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
