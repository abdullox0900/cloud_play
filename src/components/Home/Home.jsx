import React, { useEffect, useState } from 'react'
import { getCurrentUser, isAuthenticated } from '../../api/user'
import Banner from '../Banner/Banner'
import DownloadSection from '../DownloadSection/DownloadSection'
import GamesList from '../GamesList/GamesList'
import Header from '../Header/Header'
import InstructionSection from '../InstructionSection/InstructionSection'
import MainBg from '../MainBg/MainBg'
import Menu from '../Menu/Menu'
import SearchBar from '../SearchBar/SearchBar'

const Home = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [isAuth, setIsAuth] = useState(isAuthenticated())
	const [userData, setUserData] = useState(getCurrentUser())

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
		setUserData(getCurrentUser())

		// Add event listener for storage changes
		const handleStorageChange = () => {
			setIsAuth(isAuthenticated())
			setUserData(getCurrentUser())
		}

		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
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
		<div className='w-full px-[20px] py-[15px] pb-[105px]'>
			<MainBg />
			<Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
			<SearchBar onSearch={handleSearch} />
			<Banner />
			<GamesList searchTerm={searchTerm} />
			<InstructionSection />
			<DownloadSection />
			<Menu isOpen={isMenuOpen} onClose={closeMenu} />
		</div>
	)
}

export default Home
