import React, { useEffect, useState } from 'react'

const SearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [debouncedTerm, setDebouncedTerm] = useState('')

	// Update search term immediately for UI feedback
	const handleInputChange = e => {
		setSearchTerm(e.target.value)
	}

	// Debounce search term to avoid excessive API calls or filtering
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedTerm(searchTerm)
		}, 300) // 300ms delay

		return () => clearTimeout(timer)
	}, [searchTerm])

	// Call onSearch with debounced term
	useEffect(() => {
		onSearch(debouncedTerm)
	}, [debouncedTerm, onSearch])

	const handleSubmit = e => {
		e.preventDefault()
		onSearch(searchTerm) // Immediate search on submit
	}

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			onSearch(searchTerm)
		}
	}

	return (
		<div className='px-[10px] py-[6px] rounded-[8px] mb-[25px]'>
			<form onSubmit={handleSubmit} className='relative'>
				<input
					type='text'
					placeholder='Поиск'
					value={searchTerm}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					className='w-full text-white py-2 pl-4 pr-10 bg-transparent outline-none placeholder:text-white/60 placeholder:text-[14px] text-[14px]'
				/>
				<button
					type='submit'
					className='absolute right-[0px] top-1/2 p-[9px] transform -translate-y-1/2 rounded-[8px] hover:opacity-90 transition-opacity'
				>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M15 15L19 19M1 9C1 11.1217 1.84285 13.1566 3.34315 14.6569C4.84344 16.1571 6.87827 17 9 17C11.1217 17 13.1566 16.1571 14.6569 14.6569C16.1571 13.1566 17 11.1217 17 9C17 6.87827 16.1571 4.84344 14.6569 3.34315C13.1566 1.84285 11.1217 1 9 1C6.87827 1 4.84344 1.84285 3.34315 3.34315C1.84285 4.84344 1 6.87827 1 9Z'
							stroke='white'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
			</form>
		</div>
	)
}

export default SearchBar
