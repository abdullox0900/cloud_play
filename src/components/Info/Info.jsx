import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCloud, FaGamepad, FaHeadset, FaRocket } from 'react-icons/fa'
import Header from '../Header/Header'
import MainBg from '../MainBg/MainBg'
import TopHeader from '../TopHeader/TopHeader'

const Info = () => {
	const { t } = useTranslation()
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = term => {
		setSearchTerm(term)
		// You can implement search functionality for the Info page if needed
	}

	return (
		<div className='min-h-screen pb-16 relative'>
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
				<h1 className='text-2xl font-bold mb-6 text-center text-[#2E90FA] mt-4'>
					Cloud Play
				</h1>

				<div className='bg-[#111111]/90 rounded-xl p-4 mb-6 shadow-lg border border-[#333333]/30'>
					<div className='flex items-center mb-3'>
						<FaCloud className='text-[#2E90FA] mr-3 text-xl' />
						<h2 className='text-xl font-semibold text-[#2E90FA]'>
							Cloud Gaming
						</h2>
					</div>
					<p className='text-gray-400 mb-3'>
						Play your favorite games instantly without downloads or powerful
						hardware. Our cloud servers handle all the processing, delivering
						high-quality gaming directly to your device.
					</p>
				</div>

				<div className='bg-[#111111]/90 rounded-xl p-4 mb-6 shadow-lg border border-[#333333]/30'>
					<div className='flex items-center mb-3'>
						<FaGamepad className='text-[#2E90FA] mr-3 text-xl' />
						<h2 className='text-xl font-semibold text-[#2E90FA]'>
							Game Library
						</h2>
					</div>
					<p className='text-gray-400 mb-3'>
						Access hundreds of popular games across all genres. From
						action-packed adventures to strategic puzzles, our library has
						something for every gamer.
					</p>
				</div>

				<div className='bg-[#111111]/90 rounded-xl p-4 mb-6 shadow-lg border border-[#333333]/30'>
					<div className='flex items-center mb-3'>
						<FaRocket className='text-[#2E90FA] mr-3 text-xl' />
						<h2 className='text-xl font-semibold text-[#2E90FA]'>
							Performance
						</h2>
					</div>
					<p className='text-gray-400 mb-3'>
						Experience low-latency gaming with our optimized streaming
						technology. Play at up to 4K resolution with 60 FPS on any
						compatible device.
					</p>
				</div>

				<div className='bg-[#111111]/90 rounded-xl p-4 mb-6 shadow-lg border border-[#333333]/30'>
					<div className='flex items-center mb-3'>
						<FaHeadset className='text-[#2E90FA] mr-3 text-xl' />
						<h2 className='text-xl font-semibold text-[#2E90FA]'>Support</h2>
					</div>
					<p className='text-gray-400'>
						Our dedicated support team is available 24/7 to help with any
						issues. Contact us through the app or visit our support center for
						assistance.
					</p>
				</div>

				<div className='text-center text-sm text-gray-500 mt-8 mb-20'>
					<p>Cloud Play © 2023</p>
					<p>Version 1.0.0</p>
				</div>
			</div>
		</div>
	)
}

export default Info
