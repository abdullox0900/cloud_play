import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaGamepad, FaHome, FaInfoCircle, FaUser } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import './Toolbar.css'

const Toolbar = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const [activeTab, setActiveTab] = useState(() => {
		const path = location.pathname
		if (path === '/') return 'home'
		if (path === '/profile') return 'profile'
		if (path === '/my-games') return 'games'
		if (path === '/info') return 'info'
		return 'home'
	})

	const handleTabClick = tab => {
		setActiveTab(tab)
	}

	return (
		<div className='fixed bottom-0 left-0 right-0 z-50 toolbar-bg'>
			<div className='flex justify-around items-center py-[10px]'>
				<Link
					to='/'
					className={`flex flex-col items-center justify-center w-1/4 h-full ${
						activeTab === 'home'
							? 'text-[#2E90FA] toolbar-icon-active'
							: 'text-gray-400'
					}`}
					onClick={() => handleTabClick('home')}
				>
					<div
						className={`toolbar-icon-container p-2 rounded-full ${
							activeTab === 'home'
								? 'bg-[#111111] shadow-inner shadow-[#2E90FA]/30'
								: ''
						}`}
					>
						<FaHome size={20} className='toolbar-icon' />
					</div>
					<span className='text-xs mt-1'>{t('toolbar.home')}</span>
				</Link>

				<Link
					to='/profile'
					className={`flex flex-col items-center justify-center w-1/4 h-full ${
						activeTab === 'profile'
							? 'text-[#2E90FA] toolbar-icon-active'
							: 'text-gray-400'
					}`}
					onClick={() => handleTabClick('profile')}
				>
					<div
						className={`toolbar-icon-container p-2 rounded-full ${
							activeTab === 'profile'
								? 'bg-[#111111] shadow-inner shadow-[#2E90FA]/30'
								: ''
						}`}
					>
						<FaUser size={20} className='toolbar-icon' />
					</div>
					<span className='text-xs mt-1'>{t('toolbar.profile')}</span>
				</Link>

				<Link
					to='/my-games'
					className={`flex flex-col items-center justify-center w-1/4 h-full ${
						activeTab === 'games'
							? 'text-[#2E90FA] toolbar-icon-active'
							: 'text-gray-400'
					}`}
					onClick={() => handleTabClick('games')}
				>
					<div
						className={`toolbar-icon-container p-2 rounded-full ${
							activeTab === 'games'
								? 'bg-[#111111] shadow-inner shadow-[#2E90FA]/30'
								: ''
						}`}
					>
						<FaGamepad size={20} className='toolbar-icon' />
					</div>
					<span className='text-xs mt-1'>{t('toolbar.myGames')}</span>
				</Link>

				<Link
					to='/info'
					className={`flex flex-col items-center justify-center w-1/4 h-full ${
						activeTab === 'info'
							? 'text-[#2E90FA] toolbar-icon-active'
							: 'text-gray-400'
					}`}
					onClick={() => handleTabClick('info')}
				>
					<div
						className={`toolbar-icon-container p-2 rounded-full ${
							activeTab === 'info'
								? 'bg-[#111111] shadow-inner shadow-[#2E90FA]/30'
								: ''
						}`}
					>
						<FaInfoCircle size={20} className='toolbar-icon' />
					</div>
					<span className='text-xs mt-1'>{t('toolbar.info')}</span>
				</Link>
			</div>
		</div>
	)
}

export default Toolbar
