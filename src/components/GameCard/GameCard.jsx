import React from 'react'

const GameCard = ({ image, title }) => {
	return (
		<div className='relative w-full rounded-[10px] p-[6px] overflow-hidden card-bg-gradient'>
			<img
				src={image}
				alt={title}
				className='w-full h-[128px] object-cover rounded-[6px] mb-[5px]'
			/>
			<button className='w-full text-white text-[14px] px-[10px] py-[6px] rounded-[6px] card-bg-gradient'>
				Играть
			</button>
		</div>
	)
}

export default GameCard
