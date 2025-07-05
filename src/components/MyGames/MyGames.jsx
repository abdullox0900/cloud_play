import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaGamepad } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import MainBg from '../MainBg/MainBg'
import TopHeader from '../TopHeader/TopHeader'

const MyGames = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = term => {
		setSearchTerm(term)
		// You can implement search functionality for the MyGames page if needed
	}

	// Mock data for purchased games
	const purchasedGames = [
		{
			id: 1,
			title: 'Cyberpunk 2077',
			image: 'https://via.placeholder.com/150/3a1c71/FFFFFF?text=Cyberpunk',
			lastPlayed: '2023-06-15',
		},
		{
			id: 2,
			title: 'Elden Ring',
			image: 'https://via.placeholder.com/150/4a00e0/FFFFFF?text=Elden+Ring',
			lastPlayed: '2023-06-10',
		},
		{
			id: 3,
			title: 'God of War',
			image: 'https://via.placeholder.com/150/8e2de2/FFFFFF?text=God+of+War',
			lastPlayed: '2023-05-28',
		},
	]

	// Filter games based on search term if needed
	const filteredGames = searchTerm
		? purchasedGames.filter(game =>
				game.title.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: purchasedGames

	return (
		<div className='min-h-screen pb-20 relative'>
			<MainBg />

			{/* TopHeader - Outside container for full width */}
			<div className='w-full fixed top-0 left-0 right-0 z-30'>
				<TopHeader onSearch={handleSearch} />
			</div>

			{/* Fixed Header - Outside container for full width */}
			<div className='w-full fixed top-[40px] left-0 right-0 z-20'>
				<div className='container mx-auto px-4'>
					<Header />
				</div>
			</div>

			{/* Main content with padding to account for fixed headers */}
			<div className='container mx-auto px-4 relative z-10 pt-[140px]'>
				<div className='max-w-md mx-auto'>
					<div className='flex items-center mb-6'>
						<h1 className='text-white text-xl font-bold'>
							{t('myGames.title')}
						</h1>
					</div>

					<div className='bg-[#111111]/90 rounded-xl p-6 border border-[#333333]/30 mb-6'>
						<h2 className='text-[#2E90FA] text-lg font-semibold mb-4 flex items-center'>
							<FaGamepad className='mr-2' /> {t('myGames.purchased')}
						</h2>

						{filteredGames.length > 0 ? (
							<div className='space-y-4'>
								{filteredGames.map(game => (
									<div
										key={game.id}
										className='flex items-center bg-[#0A0A0A]/90 p-3 rounded-lg cursor-pointer hover:bg-[#1A1A1A]/90 transition-all border border-[#333333]/20'
										onClick={() => navigate(`/game/${game.id}`)}
									>
										<img
											src={game.image}
											alt={game.title}
											className='w-16 h-16 rounded-md object-cover mr-4'
										/>
										<div>
											<h3 className='text-white font-medium'>{game.title}</h3>
											<p className='text-gray-400 text-sm'>
												{t('gameDetail.play')}{' '}
												{new Date(game.lastPlayed).toLocaleDateString()}
											</p>
										</div>
										<button className='ml-auto bg-[#2E90FA] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1570CD] transition-all'>
											{t('gameDetail.play')}
										</button>
									</div>
								))}
							</div>
						) : (
							<div className='text-center py-8'>
								<FaGamepad className='mx-auto text-4xl text-gray-500 mb-4' />
								<p className='text-gray-400'>
									{searchTerm
										? t('myGames.noSearchResults')
										: t('myGames.noGames')}
								</p>
								<button
									onClick={() => navigate('/')}
									className='mt-4 bg-[#2E90FA] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#1570CD] transition-all'
								>
									{t('myGames.browse')}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyGames
