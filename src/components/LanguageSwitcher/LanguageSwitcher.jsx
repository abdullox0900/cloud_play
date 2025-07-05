import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
	const { i18n, t } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef(null)

	const changeLanguage = lng => {
		i18n.changeLanguage(lng)
		setIsOpen(false)
		// Save language preference to localStorage
		localStorage.setItem('preferredLanguage', lng)
	}

	// Get current language code for display
	const getCurrentLanguageCode = () => {
		switch (i18n.language) {
			case 'en':
				return 'EN'
			case 'ru':
				return 'RU'
			case 'uz':
				return 'UZ'
			default:
				return 'EN'
		}
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = event => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				className='flex items-center justify-center w-8 h-8 text-xs font-bold text-white  border border-white/10 rounded-full hover:from-purple-700 hover:to-blue-600 focus:outline-none shadow-lg shadow-blue-500/30 transition-all duration-200'
				onClick={() => setIsOpen(!isOpen)}
				aria-label='Change language'
			>
				{getCurrentLanguageCode()}
			</button>

			{isOpen && (
				<div className='absolute right-0 w-32 mt-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg shadow-purple-500/20 z-[99999]'>
					<ul className='py-1'>
						<li>
							<button
								className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors ${
									i18n.language === 'en'
										? 'text-blue-400 font-medium'
										: 'text-white'
								}`}
								onClick={() => changeLanguage('en')}
							>
								{t('language.english')}
							</button>
						</li>
						<li>
							<button
								className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors ${
									i18n.language === 'ru'
										? 'text-blue-400 font-medium'
										: 'text-white'
								}`}
								onClick={() => changeLanguage('ru')}
							>
								{t('language.russian')}
							</button>
						</li>
						<li>
							<button
								className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors ${
									i18n.language === 'uz'
										? 'text-blue-400 font-medium'
										: 'text-white'
								}`}
								onClick={() => changeLanguage('uz')}
							>
								{t('language.uzbek')}
							</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default LanguageSwitcher
