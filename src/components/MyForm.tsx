import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import categories from './categories'
import priorities from './priorities'

// validation rules
const schema = z.object({
	description: z
		.string()
		.max(50, { message: 'Description should be less than 50 characters' })
		.min(3, { message: 'Description should be at least 3 characters' }),
	length: z
		.number({ invalid_type_error: 'Length required' })
		.min(10, { message: 'Length should be at least 10 minutes' }),
	category: z.enum(categories, {
		errorMap: () => ({ message: 'Category is required' }),
	}),
	priority: z.enum(priorities, {
		errorMap: () => ({ message: 'Priority is required' }),
	}),

	finished: z.boolean().optional().nullable(),
})

interface Props {
	onSubmit: (data: FormData) => void
}

// Here we store the types of the schema
type FormData = z.infer<typeof schema>

const MyForm = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onChange' })

	return (
		<form
			className='white'
			onSubmit={handleSubmit((data) => {
				onSubmit(data)
				reset()
			})}
		>
			<div className='mb-3 white'>
				<label htmlFor='description' className='form-label'>
					Description
				</label>
				<input
					{...register('description')}
					id='description'
					type='text'
					className='form-control'
				></input>
				{errors.description && (
					<p className='text-danger'>{errors.description.message}</p>
				)}
			</div>
			<div className='mb-3'>
				<label htmlFor='length' className='form-label'>
					Length (min)
				</label>
				<input
					{...register('length', { valueAsNumber: true })}
					id='length'
					type='number'
					className='form-control'
				></input>
				{errors.length && (
					<p className='text-danger'>{errors.length.message}</p>
				)}
			</div>
			<div className='flexContainer'>
				<div className='mb-3'>
					<label htmlFor='category' className='form-label'>
						Category
					</label>
					<select
						{...register('category')}
						id='category'
						className='form-select'
					>
						<option value=''></option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					{errors.category && (
						<p className='text-danger'>{errors.category.message}</p>
					)}
				</div>

				<div className='mb-3'>
					<label htmlFor='priority' className='form-label'>
						Priority
					</label>
					<select
						{...register('priority')}
						id='priority'
						className='form-select'
					>
						<option value=''></option>
						{priorities.map((priority) => (
							<option key={priority} value={priority}>
								{priority}
							</option>
						))}
					</select>
					{errors.priority && (
						<p className='text-danger'>{errors.priority.message}</p>
					)}
				</div>
			</div>

			<button disabled={!isValid} className='btn btn-primary' type='submit'>
				{/* <button className='btn btn-primary' type='submit'> */}
				Submit
			</button>
		</form>
	)
}

export default MyForm
