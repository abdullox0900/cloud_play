import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCog, FaCoins, FaGamepad, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.jpg'
import Header from '../Header/Header'
import MainBg from '../MainBg/MainBg'
import TopHeader from '../TopHeader/TopHeader'

const Profile = () => {
	const { t } = useTranslation()
	const [balance] = useState(25.5)
	const [gamesCount] = useState(3)
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = term => {
		setSearchTerm(term)
		// You can implement search functionality for the Profile page if needed
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
				<div className='flex flex-col items-center pt-4 pb-8'>
					<div className='w-24 h-24 rounded-full overflow-hidden border-4 border-[#2E90FA] shadow-lg shadow-[#2E90FA]/30 mb-4'>
						<img
							src={avatar}
							alt='User Avatar'
							className='w-full h-full object-cover'
						/>
					</div>
					<h1 className='text-xl font-bold text-white'>John Doe</h1>
					<p className='text-[#2E90FA]'>Premium User</p>
				</div>

				<div className='grid grid-cols-2 gap-4 mb-6'>
					<div className='bg-[#111111]/90 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg border border-[#333333]/30'>
						<FaCoins className='text-yellow-400 text-2xl mb-2' />
						<p className='text-gray-400 text-sm'>Balance</p>
						<p className='text-white font-bold text-xl'>
							${balance.toFixed(2)}
						</p>
					</div>

					<div className='bg-[#111111]/90 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg border border-[#333333]/30'>
						<FaGamepad className='text-[#2E90FA] text-2xl mb-2' />
						<p className='text-gray-400 text-sm'>Games</p>
						<p className='text-white font-bold text-xl'>{gamesCount}</p>
					</div>
				</div>

				<div className='space-y-4 mb-20'>
					<Link to='/my-games' className='block'>
						<div className='bg-[#111111]/90 p-4 rounded-xl flex items-center shadow-lg border border-[#333333]/30'>
							<FaGamepad className='text-[#2E90FA] text-xl mr-4' />
							<div>
								<h3 className='font-semibold'>My Games</h3>
								<p className='text-sm text-gray-400'>
									View your purchased games
								</p>
							</div>
						</div>
					</Link>

					<Link to='/add-funds' className='block'>
						<div className='bg-[#111111]/90 p-4 rounded-xl flex items-center shadow-lg border border-[#333333]/30'>
							<FaCoins className='text-yellow-400 text-xl mr-4' />
							<div>
								<h3 className='font-semibold'>Add Funds</h3>
								<p className='text-sm text-gray-400'>
									Add money to your account
								</p>
							</div>
						</div>
					</Link>

					<Link to='/settings' className='block'>
						<div className='bg-[#111111]/90 p-4 rounded-xl flex items-center shadow-lg border border-[#333333]/30'>
							<FaCog className='text-[#2E90FA] text-xl mr-4' />
							<div>
								<h3 className='font-semibold'>Settings</h3>
								<p className='text-sm text-gray-400'>
									Manage your account settings
								</p>
							</div>
						</div>
					</Link>

					<Link to='/support' className='block'>
						<div className='bg-[#111111]/90 p-4 rounded-xl flex items-center shadow-lg border border-[#333333]/30'>
							<FaUser className='text-[#2E90FA] text-xl mr-4' />
							<div>
								<h3 className='font-semibold'>Support</h3>
								<p className='text-sm text-gray-400'>
									Get help with your account
								</p>
							</div>
						</div>
					</Link>

					<Link to='/logout' className='block'>
						<div className='bg-[#1F1F1F]/90 p-4 rounded-xl flex items-center shadow-lg border border-[#333333]/30'>
							<FaSignOutAlt className='text-red-400 text-xl mr-4' />
							<div>
								<h3 className='font-semibold'>Logout</h3>
								<p className='text-sm text-gray-400'>
									Sign out from your account
								</p>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Profile
