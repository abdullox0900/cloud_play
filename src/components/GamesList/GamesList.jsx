import React from 'react'
import img1 from '../../assets/card/img-1.png'
import img2 from '../../assets/card/img-2.png'
import img3 from '../../assets/card/img-3.png'
import img4 from '../../assets/card/img-4.png'
import img5 from '../../assets/card/img-5.png'
import img6 from '../../assets/card/img-6.png'
import GameCard from '../GameCard/GameCard'

// Sample game data - in a real app, this would come from an API
const games = [
	{
		id: 1,
		title: 'Game 1',
		image: img1,
	},
	{
		id: 2,
		title: 'Game 2',
		image: img2,
	},
	{
		id: 3,
		title: 'Game 3',
		image: img3,
	},
	{
		id: 4,
		title: 'Game 4',
		image: img4,
	},
	{
		id: 5,
		title: 'Game 5',
		image: img5,
	},
	{
		id: 6,
		title: 'Game 6',
		image: img6,
	},
]

const GamesList = () => {
	return (
		<div className=''>
			<h2 className='text-white text-[18px] font-bold mb-[15px]'>Игры</h2>
			<div className='grid grid-cols-2 gap-[15px]'>
				{games.map(game => (
					<GameCard key={game.id} image={game.image} title={game.title} />
				))}
			</div>
			<div className='mt-[20px]'>
				<button className='w-full text-white py-[16px] text-[16px] rounded-[6px] game-button-bg-gradient'>
					Больше игры
				</button>
			</div>
		</div>
	)
}

export default GamesList
