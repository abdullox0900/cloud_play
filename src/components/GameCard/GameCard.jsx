import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useGameImage } from '../../api'
import fallbackImage from '../../assets/card/img-1.png'
import './GameCard.css'

const GameCard = ({ id, title }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { imageData, isLoading, isError } = useGameImage(id)
	const [imgError, setImgError] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

	// Create image source from base64 data
	const imageUrl = imageData
		? `data:image/jpeg;base64,${imageData}`
		: fallbackImage

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

	const handleCardClick = () => {
		navigate(`/game/${id}`)
	}

	const handlePlayClick = e => {
		e.stopPropagation() // Prevent triggering card click
		// Add play game logic here
		console.log(`Play game ${id}`)
	}

	return (
		<div
			className={`relative w-full rounded-[10px] p-[6px] overflow-hidden card-bg-border transition-transform duration-300 cursor-pointer`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleCardClick}
		>
			{isLoading ? (
				<div className='w-full h-[200px] bg-gray-700 rounded-[6px] mb-[5px] flex items-center justify-center card-img-clip-path'>
					<span className='text-white'>Loading...</span>
				</div>
			) : isError || imgError ? (
				<img
					src={getRandomFallbackImage()}
					alt={title || 'Game'}
					className='w-full h-[200px] object-cover rounded-[6px] mb-[5px] card-img-clip-path'
				/>
			) : (
				<img
					src={imageUrl}
					alt={title || 'Game'}
					className='w-full h-[200px] object-cover rounded-[6px] mb-[5px] card-img-clip-path'
					onError={handleImageError}
				/>
			)}
			<div className='text-center text-white text-[12px] my-[10px] truncate px-1'>
				{title || 'Game'}
			</div>
			<button className='card-button-clip-path' onClick={handlePlayClick}>
				{t('play', 'Играть')}
			</button>
		</div>
	)
}

export default GameCard
