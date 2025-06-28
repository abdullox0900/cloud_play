import React, { useEffect, useState } from 'react'
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

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	return (
		<div className='w-full px-[20px] py-[15px] pb-[105px]'>
			<MainBg />
			<Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
			<SearchBar />
			<Banner />
			<GamesList />
			<InstructionSection />
			<DownloadSection />
			<Menu isOpen={isMenuOpen} onClose={closeMenu} />
		</div>
	)
}

export default Home
