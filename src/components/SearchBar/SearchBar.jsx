import React from 'react'

const SearchBar = () => {
	return (
		<div className='px-[10px] py-[6px] card-bg-gradient rounded-[8px] mb-[25px]'>
			<div className='relative'>
				<input
					type='text'
					placeholder='Поиск'
					className='w-full text-white py-2 pl-4 pr-10 bg-transparent outline-none placeholder:text-white/60 placeholder:text-[14px] text-[14px]'
				/>
				<button className='absolute right-[0px] top-1/2 p-[9px] transform -translate-y-1/2 card-bg-gradient rounded-[8px]'>
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
							stroke-width='1.5'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}

export default SearchBar
