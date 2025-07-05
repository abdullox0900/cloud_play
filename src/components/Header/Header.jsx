import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getUserBalance } from '../../api/balance'
import { getUserPicture } from '../../api/profile'
import { getCurrentUser, isAuthenticated } from '../../api/user'
import defaultAvatar from '../../assets/avatar.jpg'
import logo from '../../assets/logo.png'
import moneyIcon from '../../assets/money-icon.svg'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import './Header.css'

const Header = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [user, setUser] = useState(null)
	const [userPicture, setUserPicture] = useState(null)
	const [isAuth, setIsAuth] = useState(isAuthenticated())
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
	const [userBalance, setUserBalance] = useState(0)

	// Check if user is logged in on component mount and when localStorage changes
	useEffect(() => {
		const checkAuth = async () => {
			const isAuthenticated = isAuth
			setIsAuth(isAuthenticated)

			const userData = getCurrentUser()
			if (userData) {
				setUser(userData)

				// Get user profile picture if authenticated
				if (isAuthenticated && userData.userId) {
					try {
						// Fetch user picture
						const picture = await getUserPicture(userData.userId)
						setUserPicture(picture)

						// Fetch user balance
						const balance = await getUserBalance(userData.userId)
						setUserBalance(Math.floor(balance || 0)) // Ensure we have a whole number
					} catch (err) {
						console.error('Error fetching user data:', err)
					}
				}
			} else {
				setUser(null)
				setUserPicture(null)
				setUserBalance(0)
			}
		}

		checkAuth()

		// Add event listener for storage changes
		window.addEventListener('storage', checkAuth)

		return () => {
			window.removeEventListener('storage', checkAuth)
		}
	}, [])

	const handleRegistrationClick = () => {
		navigate('/registration')
	}

	const handleLoginClick = () => {
		navigate('/login')
	}

	const toggleProfileMenu = () => {
		setIsProfileMenuOpen(!isProfileMenuOpen)
	}

	const closeProfileMenu = () => {
		setIsProfileMenuOpen(false)
	}

	// Format balance with thousand separators (Uzbek style)
	const formatBalance = balance => {
		// Convert to string and remove any decimal part
		const wholeNumber = Math.floor(balance).toString()

		// Add thousand separators
		return wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	}

	return (
		<div className='relative'>
			<div className='flex justify-between items-center py-[11px] px-[17px] header-bg rounded-[8px]'>
				{/* Logo on the left */}
				<div className='flex items-center'>
					<img src={logo} alt='Cloud Play' className='h-8' />
				</div>

				{/* Right side with auth buttons or user info */}
				<div className='flex items-center gap-3'>
					{isAuth && user ? (
						<>
							<div className='flex items-center gap-[7px]'>
								<div>
									<img src={moneyIcon} alt='money' />
								</div>
								<div className='flex items-center gap-[2px]'>
									<span className='text-yellow-400'>
										{formatBalance(userBalance)}
									</span>
									<span className='text-white'>сум</span>
								</div>
							</div>
							<span className='text-white h-[28px] w-[1px] bg-white/40'></span>
							<div
								className='flex items-center gap-2 cursor-pointer'
								onClick={toggleProfileMenu}
							>
								<div className='w-[36px] h-[36px] rounded-full overflow-hidden'>
									{userPicture ? (
										<img
											src={`data:image/jpeg;base64,${userPicture}`}
											alt={user.username}
											className='w-full h-full object-cover'
										/>
									) : (
										<img
											src={defaultAvatar}
											alt={user.username}
											className='w-full h-full object-cover'
										/>
									)}
								</div>
								<div className='text-white text-[14px]'>@{user.username}</div>
							</div>
						</>
					) : (
						<div className='flex gap-2'>
							<button
								className='text-white px-[15px] py-[8px] rounded-[5px] text-[14px] header-button-clip-path'
								onClick={handleLoginClick}
							>
								{t('navigation.login')}
							</button>
							<button
								className='text-white px-[15px] py-[8px] rounded-[5px] text-[14px] header-button-clip-path'
								onClick={handleRegistrationClick}
							>
								{t('navigation.register')}
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Profile Menu */}
			{isAuth && (
				<ProfileMenu isOpen={isProfileMenuOpen} onClose={closeProfileMenu} />
			)}
		</div>
	)
}

export default Header
