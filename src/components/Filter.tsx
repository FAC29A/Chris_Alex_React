import categories from './categories'

interface Props {
	onSelectCategory: (category: string) => void
	onSelectPriority: (priority: string) => void
}

const Filter = ({ onSelectCategory, onSelectPriority }: Props) => {
	return (
		<select
			className='form-select width100'
			onChange={(event) => {
				onSelectCategory(event.target.value)
				onSelectPriority('All priorities')
			}}
		>
			<option value=''>All categories</option>
			{categories.map((category) => (
				<option key={category} value={category}>
					{category}
				</option>
			))}
		</select>
	)
}

export default Filter
