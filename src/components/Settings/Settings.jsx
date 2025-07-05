import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaBell, FaLanguage, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import MainBg from '../MainBg/MainBg'

const Settings = () => {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
	const [notifications, setNotifications] = useState(true)
	const [privacy, setPrivacy] = useState(false)

	// Update language when changed
	useEffect(() => {
		const savedLanguage = localStorage.getItem('preferredLanguage')
		if (savedLanguage) {
			setSelectedLanguage(savedLanguage)
		}
	}, [])

	const changeLanguage = e => {
		const lang = e.target.value
		setSelectedLanguage(lang)
		i18n.changeLanguage(lang)
		localStorage.setItem('preferredLanguage', lang)
	}

	const handleSave = () => {
		// Save settings
		alert('Settings saved successfully!')
	}

	return (
		<div className='min-h-screen bg-[#0A0A0A] pb-20'>
			<MainBg />
			<div className='max-w-md mx-auto p-4'>
				<div className='flex items-center mb-6'>
					<button onClick={() => navigate('/')} className='text-white mr-4'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
					</button>
					<h1 className='text-white text-xl font-bold'>
						{t('settings.title')}
					</h1>
				</div>

				<div className='bg-[#111111]/90 rounded-xl p-6 border border-[#333333]/30 mb-6'>
					<div className='mb-6'>
						<div className='flex items-center mb-3'>
							<FaLanguage className='text-[#2E90FA] mr-2' />
							<h2 className='text-white text-lg font-semibold'>
								{t('settings.language')}
							</h2>
						</div>
						<select
							value={selectedLanguage}
							onChange={changeLanguage}
							className='w-full bg-[#0A0A0A]/90 border border-[#333333]/30 rounded-md p-3 text-white'
						>
							<option value='en'>{t('language.english')}</option>
							<option value='ru'>{t('language.russian')}</option>
							<option value='uz'>{t('language.uzbek')}</option>
						</select>
					</div>

					<div className='mb-6'>
						<div className='flex items-center mb-3'>
							<FaBell className='text-[#2E90FA] mr-2' />
							<h2 className='text-white text-lg font-semibold'>
								{t('settings.notifications')}
							</h2>
						</div>
						<div className='flex items-center'>
							<label className='inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									checked={notifications}
									onChange={() => setNotifications(!notifications)}
									className='sr-only peer'
								/>
								<div className="relative w-11 h-6 bg-[#0A0A0A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E90FA]"></div>
							</label>
						</div>
					</div>

					<div className='mb-6'>
						<div className='flex items-center mb-3'>
							<FaLock className='text-[#2E90FA] mr-2' />
							<h2 className='text-white text-lg font-semibold'>
								{t('settings.privacy')}
							</h2>
						</div>
						<div className='flex items-center'>
							<label className='inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									checked={privacy}
									onChange={() => setPrivacy(!privacy)}
									className='sr-only peer'
								/>
								<div className="relative w-11 h-6 bg-[#0A0A0A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E90FA]"></div>
							</label>
						</div>
					</div>

					<button
						onClick={handleSave}
						className='w-full bg-[#2E90FA] text-white py-3 rounded-md font-medium hover:bg-[#1570CD] transition-all'
					>
						{t('settings.save')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Settings
