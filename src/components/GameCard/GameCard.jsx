import React, { useState } from 'react'
import { useGameImage } from '../../api'
import fallbackImage from '../../assets/card/img-1.png'

const GameCard = ({ id, title }) => {
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

	return (
		<div
			className={`relative w-full rounded-[10px] p-[6px] overflow-hidden card-bg-gradient transition-transform duration-300 ${
				isHovered ? 'scale-[1.02]' : ''
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isLoading ? (
				<div className='w-full h-[128px] bg-gray-700 rounded-[6px] mb-[5px] flex items-center justify-center'>
					<span className='text-white'>Loading...</span>
				</div>
			) : isError || imgError ? (
				<img
					src={getRandomFallbackImage()}
					alt={title || 'Game'}
					className='w-full h-[128px] object-cover rounded-[6px] mb-[5px]'
				/>
			) : (
				<img
					src={imageUrl}
					alt={title || 'Game'}
					className='w-full h-[128px] object-cover rounded-[6px] mb-[5px]'
					onError={handleImageError}
				/>
			)}
			<div className='text-center text-white text-[12px] mb-[5px] truncate px-1'>
				{title || 'Game'}
			</div>
			<button className='w-full text-white text-[14px] px-[10px] py-[6px] rounded-[6px] button-bg-gradient hover:opacity-90 transition-opacity'>
				Играть
			</button>
		</div>
	)
}

export default GameCard
