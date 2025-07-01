import React, { useState } from 'react'
import instructionThumb from '../../assets/bg-img.webp' // Rasmni shu joyga joylang yoki o'zgartiring

const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ' // O'zingiz xohlagan video ID

const InstructionSection = () => {
	const [showVideo, setShowVideo] = useState(false)

	return (
		<div className='mt-[40px] mb-[40px]'>
			<h2 className='text-white text-[18px] font-bold mb-[15px]'>Инструкция</h2>
			<div className='relative rounded-[10px] overflow-hidden bg-black/20 h-[250px] flex items-center justify-center banner-shadow'>
				<div className='absolute inset-0 z-10 w-full h-full bg-black/20 banner-shadow'></div>
				{showVideo ? (
					<iframe
						title='Instruction Video'
						width='100%'
						height='100%'
						src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`}
						allow='autoplay; encrypted-media'
						allowFullScreen
						className='absolute inset-0 w-full h-full'
					/>
				) : (
					<>
						<img
							src={instructionThumb}
							alt='Instruction Thumbnail'
							className='absolute inset-0 w-full h-full object-cover'
						/>
						<button
							onClick={() => setShowVideo(true)}
							className='z-20 rounded-full flex items-center justify-center relative w-[76px] h-[76px] play-button-animation'
						>
							<svg
								width={78}
								height={78}
								viewBox='0 0 78 78'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='relative z-10'
							>
								<path
									d='M34.4907 51.665L50.7937 41.1675C51.6211 40.649 52.0348 39.9293 52.0348 39.0085C52.0348 38.0877 51.6211 37.3623 50.7937 36.8325L34.4865 26.335C33.6422 25.7343 32.7667 25.6819 31.86 26.1777C30.9533 26.6736 30.5 27.4471 30.5 28.4983V49.5017C30.5 50.5529 30.9533 51.3264 31.86 51.8223C32.7667 52.3181 33.6422 52.2671 34.4865 51.6693M39.0128 77.25C33.7257 77.25 28.7533 76.247 24.0952 74.241C19.4401 72.2322 15.3898 69.5065 11.9445 66.064C8.49917 62.6215 5.77208 58.5755 3.76325 53.926C1.75442 49.2765 0.75 44.3054 0.75 39.0128C0.75 33.7201 1.75442 28.7476 3.76325 24.0952C5.76925 19.4401 8.49067 15.3898 11.9275 11.9445C15.3643 8.49917 19.4118 5.77208 24.0698 3.76325C28.7278 1.75442 33.7002 0.75 38.9872 0.75C44.2743 0.75 49.2467 1.75442 53.9048 3.76325C58.5599 5.76925 62.6102 8.49208 66.0555 11.9318C69.5008 15.3714 72.2279 19.4188 74.2368 24.074C76.2456 28.7292 77.25 33.7002 77.25 38.9872C77.25 44.2743 76.247 49.2467 74.241 53.9048C72.235 58.5627 69.5093 62.613 66.064 66.0555C62.6187 69.498 58.5727 72.2251 53.926 74.2368C49.2793 76.2484 44.3083 77.2528 39.0128 77.25ZM39 73C48.4917 73 56.5312 69.7062 63.1187 63.1187C69.7062 56.5312 73 48.4917 73 39C73 29.5083 69.7062 21.4687 63.1187 14.8812C56.5312 8.29375 48.4917 5 39 5C29.5083 5 21.4687 8.29375 14.8812 14.8812C8.29375 21.4687 5 29.5083 5 39C5 48.4917 8.29375 56.5312 14.8812 63.1187C21.4687 69.7062 29.5083 73 39 73Z'
									fill='white'
								/>
							</svg>
						</button>
					</>
				)}
			</div>
		</div>
	)
}

export default InstructionSection
