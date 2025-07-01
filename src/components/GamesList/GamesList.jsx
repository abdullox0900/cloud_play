import React, { useEffect, useRef, useState } from 'react'
import { useGames } from '../../api'
import { isAuthenticated } from '../../api/user'
import GameCard from '../GameCard/GameCard'

// Mock data for fallback
const MOCK_GAMES = [
	{ id: 'game1', title: 'Game 1' },
	{ id: 'game2', title: 'Game 2' },
	{ id: 'game3', title: 'Game 3' },
	{ id: 'game4', title: 'Game 4' },
	{ id: 'game5', title: 'Game 5' },
	{ id: 'game6', title: 'Game 6' },
	{ id: 'game7', title: 'Game 7' },
	{ id: 'game8', title: 'Game 8' },
	{ id: 'game9', title: 'Game 9' },
	{ id: 'game10', title: 'Game 10' },
	{ id: 'game11', title: 'Game 11' },
	{ id: 'game12', title: 'Game 12' },
	{ id: 'game13', title: 'Game 13' },
	{ id: 'game14', title: 'Game 14' },
	{ id: 'game15', title: 'Game 15' },
	{ id: 'game16', title: 'Game 16' },
	{ id: 'game17', title: 'Game 17' },
	{ id: 'game18', title: 'Game 18' },
]

const GamesList = ({ searchTerm = '' }) => {
	const { games, isLoading, isError } = useGames()
	const [allGames, setAllGames] = useState([])
	const [filteredGames, setFilteredGames] = useState([])
	const [displayedGames, setDisplayedGames] = useState([])
	const [useMockData, setUseMockData] = useState(false)
	const [page, setPage] = useState(1)
	const gamesPerPage = 6
	const [isAuth, setIsAuth] = useState(isAuthenticated())
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [activeFilter, setActiveFilter] = useState('all') // 'all', 'popular', 'new'
	const filterRef = useRef(null)

	// Process games data when it changes
	useEffect(() => {
		console.log('Games data:', games)
		if (games && games.length > 0) {
			// Ensure we have an array of games
			const gamesArray = Array.isArray(games) ? games : [games]
			setAllGames(gamesArray)
			setUseMockData(false)
		} else if (isError || (games && games.length === 0)) {
			// Use mock data if API fails or returns empty
			console.log('Using mock data due to API error or empty response')
			setAllGames(MOCK_GAMES)
			setUseMockData(true)
		}
	}, [games, isError])

	// Check authentication status
	useEffect(() => {
		setIsAuth(isAuthenticated())

		// Listen for storage events (login/logout)
		const handleStorageChange = () => {
			setIsAuth(isAuthenticated())
		}

		window.addEventListener('storage', handleStorageChange)
		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	// Handle click outside to close filter dropdown
	useEffect(() => {
		const handleClickOutside = event => {
			if (filterRef.current && !filterRef.current.contains(event.target)) {
				setIsFilterOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [filterRef])

	// Filter games based on search term and active filter
	useEffect(() => {
		let filtered = [...allGames]

		// Apply search filter
		if (searchTerm.trim() !== '') {
			const lowercasedSearch = searchTerm.toLowerCase()
			filtered = filtered.filter(game => {
				const title = (game.title || game.name || '').toLowerCase()
				return title.includes(lowercasedSearch)
			})
		}

		// Apply category filter
		if (activeFilter === 'popular') {
			// Sort by popularity (mock implementation)
			filtered = [...filtered].sort((a, b) => {
				const aPopularity = a.popularity || Math.random() * 100
				const bPopularity = b.popularity || Math.random() * 100
				return bPopularity - aPopularity
			})
		} else if (activeFilter === 'new') {
			// Sort by newest (mock implementation)
			filtered = [...filtered].sort((a, b) => {
				const aDate =
					a.releaseDate || new Date().getTime() - Math.random() * 10000000
				const bDate =
					b.releaseDate || new Date().getTime() - Math.random() * 10000000
				return bDate - aDate
			})
		}

		setFilteredGames(filtered)
		// Reset pagination when filter changes
		setPage(1)
	}, [searchTerm, allGames, activeFilter])

	// Update displayed games when page or filtered games change
	useEffect(() => {
		const startIndex = 0
		const endIndex = page * gamesPerPage
		setDisplayedGames(filteredGames.slice(startIndex, endIndex))
	}, [page, filteredGames])

	// Use mock data if loading takes too long
	useEffect(() => {
		let timer
		if (isLoading) {
			timer = setTimeout(() => {
				if (allGames.length === 0) {
					console.log('Loading timeout, using mock data')
					setAllGames(MOCK_GAMES)
					setUseMockData(true)
				}
			}, 5000) // 5 second timeout
		}
		return () => clearTimeout(timer)
	}, [isLoading, allGames.length])

	// Load more games
	const handleLoadMore = () => {
		setPage(prevPage => prevPage + 1)
	}

	// Toggle filter dropdown
	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen)
	}

	// Handle filter selection
	const handleFilterSelect = filter => {
		setActiveFilter(filter)
		setIsFilterOpen(false)
	}

	// Check if there are more games to load
	const hasMoreGames = displayedGames.length < filteredGames.length

	// Handle loading state
	if (isLoading && displayedGames.length === 0) {
		return (
			<div className=''>
				<h2 className='text-white text-[18px] font-bold mb-[15px]'>Игры</h2>
				<div className='text-white'>Loading games...</div>
			</div>
		)
	}

	// Handle empty games list (should never happen now with mock data)
	if (!displayedGames.length && !isLoading) {
		return (
			<div className=''>
				<h2 className='text-white text-[18px] font-bold mb-[15px]'>Игры</h2>
				<div className='text-white'>
					{searchTerm ? 'No games match your search.' : 'No games available.'}
				</div>
			</div>
		)
	}

	return (
		<div className=''>
			<div className='flex items-center justify-between mb-[15px]'>
				<h2 className='text-white text-[18px] font-bold'>
					{searchTerm ? `Поиск: ${searchTerm}` : 'Игры'}
					{searchTerm &&
						filteredGames.length > 0 &&
						` (${filteredGames.length})`}
				</h2>

				{isAuth && (
					<div className='relative' ref={filterRef}>
						<button
							onClick={toggleFilter}
							className='text-white p-1 hover:bg-gray-700 rounded-full'
							aria-label='Filter games'
							title='Filter games'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className={
									activeFilter !== 'all' ? 'text-blue-400' : 'text-white'
								}
							>
								<polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'></polygon>
							</svg>
						</button>

						{isFilterOpen && (
							<div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10'>
								<div className='py-1' role='menu' aria-orientation='vertical'>
									<button
										className={`block px-4 py-2 text-sm w-full text-left ${
											activeFilter === 'all' ? 'text-blue-400' : 'text-white'
										} hover:bg-gray-700`}
										onClick={() => handleFilterSelect('all')}
									>
										Все игры
									</button>
									<button
										className={`block px-4 py-2 text-sm w-full text-left ${
											activeFilter === 'popular'
												? 'text-blue-400'
												: 'text-white'
										} hover:bg-gray-700`}
										onClick={() => handleFilterSelect('popular')}
									>
										Популярные
									</button>
									<button
										className={`block px-4 py-2 text-sm w-full text-left ${
											activeFilter === 'new' ? 'text-blue-400' : 'text-white'
										} hover:bg-gray-700`}
										onClick={() => handleFilterSelect('new')}
									>
										Новые
									</button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			{useMockData && (
				<div className='text-yellow-300 text-sm mb-2'>Using demo games</div>
			)}
			<div className='grid grid-cols-2 gap-[15px]'>
				{displayedGames.map(game => (
					<GameCard
						key={game.id || game._id || Math.random().toString()}
						id={game.id || game._id}
						title={game.title || game.name || 'Game'}
					/>
				))}
			</div>
			{hasMoreGames && (
				<div className='mt-[20px]'>
					<button
						className='w-full text-white py-[16px] text-[16px] rounded-[6px] game-button-bg-gradient'
						onClick={handleLoadMore}
					>
						Больше игры
					</button>
				</div>
			)}
		</div>
	)
}

export default GamesList
