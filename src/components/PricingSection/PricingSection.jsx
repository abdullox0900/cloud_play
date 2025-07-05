import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useGames } from '../../api'

const PricingSection = () => {
	const { t } = useTranslation()
	const { games, isLoading, isError } = useGames()

	// Get a selection of games with different price points
	const getPricedGames = () => {
		if (!games || games.length === 0) return []

		// Sort games by price
		const sortedGames = [...games].sort((a, b) => {
			const priceA = a.price || 0
			const priceB = b.price || 0
			return priceA - priceB
		})

		// Get free games
		const freeGames = sortedGames
			.filter(game => !game.price || game.price === 0)
			.slice(0, 2)

		// Get budget games (under $10)
		const budgetGames = sortedGames
			.filter(game => game.price > 0 && game.price < 10)
			.slice(0, 2)

		// Get standard games ($10-30)
		const standardGames = sortedGames
			.filter(game => game.price >= 10 && game.price <= 30)
			.slice(0, 2)

		// Get premium games (over $30)
		const premiumGames = sortedGames.filter(game => game.price > 30).slice(0, 2)

		return {
			free: freeGames,
			budget: budgetGames,
			standard: standardGames,
			premium: premiumGames,
		}
	}

	const pricedGames = getPricedGames()

	if (isLoading) {
		return (
			<div className='my-8'>
				<h2 className='text-white text-xl font-bold mb-6'>
					{t('pricing.title', 'Game Pricing')}
				</h2>
				<div className='bg-gray-800/50 backdrop-blur-sm rounded-lg p-6'>
					<div className='animate-pulse flex flex-col space-y-4'>
						<div className='h-4 bg-gray-700 rounded w-1/4'></div>
						<div className='h-10 bg-gray-700 rounded'></div>
						<div className='h-10 bg-gray-700 rounded'></div>
						<div className='h-10 bg-gray-700 rounded'></div>
					</div>
				</div>
			</div>
		)
	}

	if (isError || !games || games.length === 0) {
		return null // Don't show section if there's an error or no games
	}

	return (
		<div className='my-8'>
			<h2 className='text-white text-xl font-bold mb-6'>
				{t('pricing.title', 'Game Pricing')}
			</h2>

			<div className='bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Free Games */}
					<div className='bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-5 border border-blue-800/50'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-white text-lg font-bold'>
								{t('pricing.free', 'Free Games')}
							</h3>
							<span className='bg-green-500 text-white text-xs font-bold px-2 py-1 rounded'>
								{t('pricing.freeTag', 'FREE')}
							</span>
						</div>
						<p className='text-gray-300 text-sm mb-4'>
							{t(
								'pricing.freeDescription',
								'Start playing these games without spending a penny'
							)}
						</p>
						<div className='space-y-2'>
							{pricedGames.free &&
								pricedGames.free.map(game => (
									<Link
										key={game.id}
										to={`/game/${game.id}`}
										className='flex items-center justify-between p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors'
									>
										<span className='text-white truncate'>
											{game.title || game.name}
										</span>
										<span className='text-green-400 font-medium'>
											{t('pricing.free', 'Free')}
										</span>
									</Link>
								))}
							{(!pricedGames.free || pricedGames.free.length === 0) && (
								<div className='p-2 rounded-lg bg-gray-800/50'>
									<span className='text-gray-400'>
										{t('pricing.noGamesAvailable', 'No games available')}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Budget Games */}
					<div className='bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-5 border border-blue-800/50'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-white text-lg font-bold'>
								{t('pricing.budget', 'Budget Games')}
							</h3>
							<span className='bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded'>
								{t('pricing.under', 'UNDER')} $10
							</span>
						</div>
						<p className='text-gray-300 text-sm mb-4'>
							{t(
								'pricing.budgetDescription',
								'Great games at affordable prices'
							)}
						</p>
						<div className='space-y-2'>
							{pricedGames.budget &&
								pricedGames.budget.map(game => (
									<Link
										key={game.id}
										to={`/game/${game.id}`}
										className='flex items-center justify-between p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors'
									>
										<span className='text-white truncate'>
											{game.title || game.name}
										</span>
										<span className='text-blue-400 font-medium'>
											${game.price?.toFixed(2)}
										</span>
									</Link>
								))}
							{(!pricedGames.budget || pricedGames.budget.length === 0) && (
								<div className='p-2 rounded-lg bg-gray-800/50'>
									<span className='text-gray-400'>
										{t('pricing.noGamesAvailable', 'No games available')}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Standard Games */}
					<div className='bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-5 border border-blue-800/50'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-white text-lg font-bold'>
								{t('pricing.standard', 'Standard Games')}
							</h3>
							<span className='bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded'>
								$10-30
							</span>
						</div>
						<p className='text-gray-300 text-sm mb-4'>
							{t(
								'pricing.standardDescription',
								'Popular titles at standard prices'
							)}
						</p>
						<div className='space-y-2'>
							{pricedGames.standard &&
								pricedGames.standard.map(game => (
									<Link
										key={game.id}
										to={`/game/${game.id}`}
										className='flex items-center justify-between p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors'
									>
										<span className='text-white truncate'>
											{game.title || game.name}
										</span>
										<span className='text-purple-400 font-medium'>
											${game.price?.toFixed(2)}
										</span>
									</Link>
								))}
							{(!pricedGames.standard || pricedGames.standard.length === 0) && (
								<div className='p-2 rounded-lg bg-gray-800/50'>
									<span className='text-gray-400'>
										{t('pricing.noGamesAvailable', 'No games available')}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Premium Games */}
					<div className='bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-5 border border-blue-800/50'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-white text-lg font-bold'>
								{t('pricing.premium', 'Premium Games')}
							</h3>
							<span className='bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded'>
								{t('pricing.premium', 'PREMIUM')}
							</span>
						</div>
						<p className='text-gray-300 text-sm mb-4'>
							{t('pricing.premiumDescription', 'Top-tier gaming experiences')}
						</p>
						<div className='space-y-2'>
							{pricedGames.premium &&
								pricedGames.premium.map(game => (
									<Link
										key={game.id}
										to={`/game/${game.id}`}
										className='flex items-center justify-between p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors'
									>
										<span className='text-white truncate'>
											{game.title || game.name}
										</span>
										<span className='text-yellow-400 font-medium'>
											${game.price?.toFixed(2)}
										</span>
									</Link>
								))}
							{(!pricedGames.premium || pricedGames.premium.length === 0) && (
								<div className='p-2 rounded-lg bg-gray-800/50'>
									<span className='text-gray-400'>
										{t('pricing.noGamesAvailable', 'No games available')}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='mt-6 text-center'>
					<Link
						to='/'
						className='inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 transition-all duration-200'
					>
						{t('pricing.viewAllGames', 'View All Games')}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default PricingSection
