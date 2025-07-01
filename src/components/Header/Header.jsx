import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserBalance } from '../../api/balance'
import { getUserPicture } from '../../api/profile'
import { getCurrentUser, isAuthenticated } from '../../api/user'
import defaultAvatar from '../../assets/avatar.jpg' // Using an existing image as default avatar
import moneyIcon from '../../assets/money-icon.svg'
import ProfileMenu from '../ProfileMenu/ProfileMenu'

const Header = ({ toggleMenu, isMenuOpen }) => {
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
			<div className='flex justify-between items-center py-[11px] px-[17px] card-bg-gradient rounded-[8px] mb-[20px]'>
				{isAuth && user ? (
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
				) : (
					<div className='flex gap-2'>
						<button
							className='text-white px-[15px] py-[8px] rounded-[5px] text-[14px] button-bg-gradient'
							onClick={handleLoginClick}
						>
							Kirish
						</button>
						<button
							className='text-white px-[15px] py-[8px] rounded-[5px] text-[14px] button-bg-gradient'
							onClick={handleRegistrationClick}
						>
							Ro'yxatdan o'tish
						</button>
					</div>
				)}
				<div className='flex items-center gap-[11px]'>
					{isAuth && user && (
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
						</>
					)}
					<button className='text-white' onClick={toggleMenu}>
						{isMenuOpen ? (
							// Close (X) icon
							<svg
								width={21}
								height={21}
								viewBox='0 0 21 21'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M4.22217 4.22217L16.7778 16.7778'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
								/>
								<path
									d='M16.7778 4.22217L4.22217 16.7778'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
								/>
							</svg>
						) : (
							// Hamburger icon
							<svg
								width={21}
								height={21}
								viewBox='0 0 21 21'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M0 4.92188C0 4.6608 0.103711 4.41042 0.288317 4.22582C0.472923 4.04121 0.723303 3.9375 0.984375 3.9375H20.0156C20.2767 3.9375 20.5271 4.04121 20.7117 4.22582C20.8963 4.41042 21 4.6608 21 4.92188C21 5.18295 20.8963 5.43333 20.7117 5.61793C20.5271 5.80254 20.2767 5.90625 20.0156 5.90625H0.984375C0.723303 5.90625 0.472923 5.80254 0.288317 5.61793C0.103711 5.43333 0 5.18295 0 4.92188ZM0 10.5C0 10.2389 0.103711 9.98855 0.288317 9.80394C0.472923 9.61934 0.723303 9.51562 0.984375 9.51562H20.0156C20.2767 9.51562 20.5271 9.61934 20.7117 9.80394C20.8963 9.98855 21 10.2389 21 10.5C21 10.7611 20.8963 11.0115 20.7117 11.1961C20.5271 11.3807 20.2767 11.4844 20.0156 11.4844H0.984375C0.723303 11.4844 0.472923 11.3807 0.288317 11.1961C0.103711 11.0115 0 10.7611 0 10.5ZM0.984375 15.0938C0.723303 15.0938 0.472923 15.1975 0.288317 15.3821C0.103711 15.5667 0 15.8171 0 16.0781C0 16.3392 0.103711 16.5896 0.288317 16.7742C0.472923 16.9588 0.723303 17.0625 0.984375 17.0625H20.0156C20.2767 17.0625 20.5271 16.9588 20.7117 16.7742C20.8963 16.5896 21 16.3392 21 16.0781C21 15.8171 20.8963 15.5667 20.7117 15.3821C20.5271 15.1975 20.2767 15.0938 20.0156 15.0938H0.984375Z'
									fill='white'
								/>
							</svg>
						)}
					</button>
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
