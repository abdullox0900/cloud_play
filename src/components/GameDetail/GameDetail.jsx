import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGame, useGameImage, useGames } from '../../api'
import fallbackImage from '../../assets/card/img-1.png'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import MainBg from '../MainBg/MainBg'
import Menu from '../Menu/Menu'
import TopHeader from '../TopHeader/TopHeader'

// Rating stars component
const RatingStars = ({ rating = 4 }) => {
	const stars = []
	const fullStars = Math.floor(rating)
	const hasHalfStar = rating % 1 >= 0.5

	for (let i = 0; i < 5; i++) {
		if (i < fullStars) {
			stars.push(
				<svg
					key={i}
					className='w-5 h-5 text-yellow-400'
					fill='currentColor'
					viewBox='0 0 20 20'
				>
					<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
				</svg>
			)
		} else if (i === fullStars && hasHalfStar) {
			stars.push(
				<div key={i} className='relative'>
					<svg
						className='w-5 h-5 text-gray-400'
						fill='currentColor'
						viewBox='0 0 20 20'
					>
						<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
					</svg>
					<svg
						className='absolute top-0 left-0 w-5 h-5 overflow-hidden text-yellow-400'
						fill='currentColor'
						viewBox='0 0 20 20'
						style={{ clipPath: 'inset(0 50% 0 0)' }}
					>
						<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
					</svg>
				</div>
			)
		} else {
			stars.push(
				<svg
					key={i}
					className='w-5 h-5 text-gray-400'
					fill='currentColor'
					viewBox='0 0 20 20'
				>
					<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
				</svg>
			)
		}
	}

	return <div className='flex'>{stars}</div>
}

// Game price tag component
const PriceTag = ({ price }) => {
	const { t } = useTranslation()

	if (!price || price === 0) {
		return (
			<span className='bg-green-500 text-white text-xs font-bold px-2 py-1 rounded'>
				{t('pricing.freeTag', 'FREE')}
			</span>
		)
	}

	if (price < 10) {
		return (
			<span className='bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded'>
				${price.toFixed(2)}
			</span>
		)
	}

	if (price >= 10 && price <= 30) {
		return (
			<span className='bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded'>
				${price.toFixed(2)}
			</span>
		)
	}

	return (
		<span className='bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded'>
			${price.toFixed(2)}
		</span>
	)
}

const GameDetail = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const navigate = useNavigate()
	const { game, isLoading: gameLoading, isError: gameError } = useGame(id)
	const {
		imageData,
		isLoading: imageLoading,
		isError: imageError,
	} = useGameImage(id)
	const { games, isLoading: gamesLoading } = useGames()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [imgError, setImgError] = useState(false)
	const [similarGames, setSimilarGames] = useState([])

	useEffect(() => {
		if (game && games && games.length > 0) {
			// Find games with similar category or price point
			const filtered = games
				.filter(
					g =>
						g.id !== game.id &&
						(g.appCategoryId === game.appCategoryId ||
							Math.abs((g.price || 0) - (game.price || 0)) < 10)
				)
				.slice(0, 4)

			setSimilarGames(filtered)
		}
	}, [game, games])

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	const handleImageError = () => {
		console.error(`Failed to load image for game ${id}`)
		setImgError(true)
	}

	// Get a random fallback image from assets/card folder
	const getRandomFallbackImage = () => {
		const imageNum = (parseInt(id, 36) % 6) + 1 // Convert id to number and get mod 6 + 1 (1-6)
		try {
			return require(`../../assets/card/img-${imageNum}.png`)
		} catch (e) {
			return fallbackImage
		}
	}

	// Create image source from base64 data
	const imageUrl =
		imageData && !imgError
			? `data:image/jpeg;base64,${imageData}`
			: getRandomFallbackImage()

	const formatParagraphs = text => {
		if (!text) return null
		return text.split('\r\n\r\n').map((paragraph, index) => (
			<p key={index} className='mb-4'>
				{paragraph}
			</p>
		))
	}

	if (gameLoading) {
		return (
			<div className='w-full min-h-screen flex flex-col'>
				<MainBg />
				<div className='flex-grow'>
					<TopHeader />
					<div className='px-[20px] py-[15px]'>
						<Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
						<div className='flex items-center justify-center h-[50vh]'>
							<div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500'></div>
						</div>
					</div>
				</div>
				<Footer />
				<Menu isOpen={isMenuOpen} onClose={closeMenu} />
			</div>
		)
	}

	if (gameError || !game) {
		return (
			<div className='w-full min-h-screen flex flex-col'>
				<MainBg />
				<div className='flex-grow'>
					<TopHeader />
					<div className='px-[20px] py-[15px]'>
						<Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
						<div className='flex flex-col items-center justify-center h-[50vh] text-white'>
							<h2 className='text-2xl font-bold mb-4'>Game not found</h2>
							<button
								onClick={() => navigate(-1)}
								className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg'
							>
								Go Back
							</button>
						</div>
					</div>
				</div>
				<Footer />
				<Menu isOpen={isMenuOpen} onClose={closeMenu} />
			</div>
		)
	}

	return (
		<div className='w-full min-h-screen flex flex-col'>
			<MainBg />
			<div className='flex-grow'>
				<TopHeader />
				<div className='px-[20px] py-[15px]'>
					<Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

					{/* Back button */}
					<button
						onClick={() => navigate(-1)}
						className='flex items-center text-white mb-4 hover:text-blue-400 transition'
					>
						<svg
							className='w-5 h-5 mr-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 19l-7-7m0 0l7-7m-7 7h18'
							/>
						</svg>
						{t('back', 'Back')}
					</button>

					{/* Game details */}
					<div className='bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 mb-8'>
						<div className='flex flex-col lg:flex-row gap-8'>
							{/* Game image */}
							<div className='lg:w-1/3'>
								<div className='rounded-lg overflow-hidden shadow-lg shadow-blue-500/20 border border-gray-700'>
									{imageLoading ? (
										<div className='w-full h-[300px] bg-gray-800 flex items-center justify-center'>
											<div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
										</div>
									) : (
										<img
											src={imageUrl}
											alt={game.title}
											className='w-full h-auto object-cover'
											onError={handleImageError}
										/>
									)}
								</div>

								<div className='mt-6 space-y-4'>
									{/* Price and buy button */}
									<div className='flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
										<div className='mb-3 sm:mb-0'>
											<p className='text-gray-400 text-sm'>
												{t('price', 'Price')}
											</p>
											<p className='text-2xl font-bold text-white'>
												{game.price ? `$${game.price}` : t('free', 'Free')}
											</p>
										</div>
										<button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-purple-500/20 transition-all duration-200'>
											{t('buyNow', 'Buy Now')}
										</button>
									</div>

									{/* Game info */}
									<div className='bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
										<h3 className='text-white font-medium mb-3'>
											{t('gameInfo', 'Game Info')}
										</h3>
										<div className='space-y-2 text-sm'>
											{game.developerId && (
												<div className='flex justify-between'>
													<span className='text-gray-400'>
														{t('developer', 'Developer')}:
													</span>
													<span className='text-white'>{game.developerId}</span>
												</div>
											)}
											{game.publisherId && (
												<div className='flex justify-between'>
													<span className='text-gray-400'>
														{t('publisher', 'Publisher')}:
													</span>
													<span className='text-white'>{game.publisherId}</span>
												</div>
											)}
											{game.releaseDate && (
												<div className='flex justify-between'>
													<span className='text-gray-400'>
														{t('releaseDate', 'Release Date')}:
													</span>
													<span className='text-white'>
														{new Date(game.releaseDate).toLocaleDateString()}
													</span>
												</div>
											)}
											{game.appCategoryId && (
												<div className='flex justify-between'>
													<span className='text-gray-400'>
														{t('category', 'Category')}:
													</span>
													<span className='text-white'>
														{game.appCategoryId}
													</span>
												</div>
											)}
											{game.ageRating && (
												<div className='flex justify-between'>
													<span className='text-gray-400'>
														{t('ageRating', 'Age Rating')}:
													</span>
													<span className='text-white'>{game.ageRating}+</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Game details */}
							<div className='lg:w-2/3'>
								<h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
									{game.title}
								</h1>

								<div className='flex items-center mb-6'>
									<RatingStars rating={4} />
									<span className='ml-2 text-white'>4.0</span>
								</div>

								<div className='prose prose-invert max-w-none'>
									<div className='text-gray-300 leading-relaxed'>
										{formatParagraphs(game.description)}
									</div>
								</div>

								{/* System Requirements */}
								{game.systemRequirements && (
									<div className='mt-8'>
										<h2 className='text-xl font-bold text-white mb-4'>
											{t('systemRequirements', 'System Requirements')}
										</h2>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											{/* Minimum Requirements */}
											<div className='bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
												<h3 className='text-white font-medium mb-3'>
													{t('minimum', 'Minimum')}
												</h3>
												<div className='space-y-2 text-sm'>
													{game.systemRequirements.minimum &&
														Object.entries(game.systemRequirements.minimum).map(
															([key, value]) => (
																<div key={key} className='flex flex-col'>
																	<span className='text-gray-400'>{key}:</span>
																	<span className='text-white'>{value}</span>
																</div>
															)
														)}
												</div>
											</div>

											{/* Recommended Requirements */}
											<div className='bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
												<h3 className='text-white font-medium mb-3'>
													{t('recommended', 'Recommended')}
												</h3>
												<div className='space-y-2 text-sm'>
													{game.systemRequirements.recommended &&
														Object.entries(
															game.systemRequirements.recommended
														).map(([key, value]) => (
															<div key={key} className='flex flex-col'>
																<span className='text-gray-400'>{key}:</span>
																<span className='text-white'>{value}</span>
															</div>
														))}
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Similar Games Pricing Section */}
					{similarGames.length > 0 && (
						<div className='mb-8'>
							<h2 className='text-white text-xl font-bold mb-6'>
								{t('pricing.similarGames', 'Similar Games')}
							</h2>

							<div className='bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800'>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
									{similarGames.map(similarGame => (
										<Link
											key={similarGame.id}
											to={`/game/${similarGame.id}`}
											className='bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-4 border border-blue-800/50 hover:border-blue-600/70 transition-colors'
										>
											<div className='flex flex-col h-full'>
												<div className='flex justify-between items-start mb-2'>
													<h3 className='text-white font-medium truncate mr-2'>
														{similarGame.title || similarGame.name}
													</h3>
													<PriceTag price={similarGame.price} />
												</div>
												<div className='text-gray-400 text-sm mb-3'>
													{similarGame.appCategoryId ||
														t('gameDetail.category', 'Category')}
												</div>
												<div className='mt-auto pt-2'>
													<button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm py-2 px-3 rounded transition-colors'>
														{t('gameDetail.viewDetails', 'View Details')}
													</button>
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer />
			<Menu isOpen={isMenuOpen} onClose={closeMenu} />
		</div>
	)
}

export default GameDetail
