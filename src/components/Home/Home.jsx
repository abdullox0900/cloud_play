import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getCurrentUser, isAuthenticated } from '../../api/user'
import Banner from '../Banner/Banner'
import GamesList from '../GamesList/GamesList'
import Header from '../Header/Header'
import MainBg from '../MainBg/MainBg'
import Menu from '../Menu/Menu'
import TopHeader from '../TopHeader/TopHeader'

const Home = () => {
	const { t } = useTranslation()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [user, setUser] = useState(null)
	const [isAuth, setIsAuth] = useState(isAuthenticated())

	useEffect(() => {
		if (isAuth) {
			setUser(getCurrentUser())
		}
	}, [isAuth])

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isMenuOpen])

	// Check authentication status when component mounts or localStorage changes
	useEffect(() => {
		setIsAuth(isAuthenticated())

		// Add event listener for storage changes
		const handleStorageChange = () => {
			setIsAuth(isAuthenticated())
		}

		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	// Load saved language preference on component mount
	useEffect(() => {
		const savedLanguage = localStorage.getItem('preferredLanguage')
		if (savedLanguage) {
			// This will be handled by i18next-browser-languagedetector
			// Just making sure we have the effect for consistency
		}
	}, [])

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	const handleSearch = term => {
		setSearchTerm(term)
	}

	return (
		<div className='relative min-h-screen pb-16'>
			<MainBg />

			{/* TopHeader - Outside container for full width */}
			<div className='w-full fixed top-0 left-0 right-0 z-30'>
				<TopHeader onSearch={handleSearch} />
			</div>

			{/* Fixed Header - Outside container for full width */}
			<div className='w-full px-4 pt-[50px]'>
				<Header />
			</div>

			{/* Main content with padding to account for fixed headers */}
			<div className='container mx-auto px-4 relative z-10 pt-[20px]'>
				<Banner />

				<div className='mb-8'>
					<GamesList searchTerm={searchTerm} />
					{/* <PricingSection /> */}
					{/* <InstructionSection /> */}
					{/* <DownloadSection /> */}
				</div>
			</div>

			<Menu isOpen={isMenuOpen} onClose={closeMenu} />
		</div>
	)
}

export default Home
