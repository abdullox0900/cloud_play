import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated, logoutUser } from '../../api/user'

const Menu = ({ isOpen, onClose }) => {
	const navigate = useNavigate()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const checkAuth = () => {
			setIsLoggedIn(isAuthenticated())
		}

		checkAuth()

		// Add event listener for storage changes
		window.addEventListener('storage', checkAuth)

		return () => {
			window.removeEventListener('storage', checkAuth)
		}
	}, [isOpen]) // Check login status when menu opens

	const handleNavigation = path => {
		navigate(path)
		onClose()
	}

	const handleLogout = () => {
		logoutUser()
		onClose()
		// Dispatch storage event to update other components
		window.dispatchEvent(new Event('storage'))
		// Navigate to home page
		navigate('/')
	}

	if (!isOpen) return null

	return (
		<div className='fixed top-[75px] left-[20px] right-[20px] bottom-[0px] bg-[#0A0A0A]/30 backdrop-blur-sm rounded-[8px] z-50 flex justify-center items-start pt-[60px]'>
			<div className='flex flex-col gap-[13px] w-[250px]'>
				<button
					onClick={() => handleNavigation('/')}
					className='py-[18px] w-full text-white text-center transition card-bg-gradient rounded-[6px]'
				>
					Главная
				</button>

				{isLoggedIn ? (
					<>
						<button
							onClick={() => handleNavigation('/add-funds')}
							className='py-[18px] w-full text-white text-center transition card-bg-gradient rounded-[6px]'
						>
							Пополнить счет
						</button>

						<button
							onClick={() => handleNavigation('/my-games')}
							className='py-[18px] w-full text-white text-center transition card-bg-gradient rounded-[6px]'
						>
							Мои игры
						</button>

						<button
							onClick={() => handleNavigation('/settings')}
							className='py-[18px] w-full text-white text-center transition card-bg-gradient rounded-[6px]'
						>
							Настройки
						</button>

						<button
							onClick={() => handleNavigation('/support')}
							className='py-[18px] w-full text-white text-center transition card-bg-gradient rounded-[6px]'
						>
							Поддержка
						</button>

						<button
							onClick={handleLogout}
							className='py-[18px] w-full text-white text-center transition button-bg-gradient rounded-[6px]'
						>
							Выход
						</button>
					</>
				) : (
					<>
						<button
							onClick={() => handleNavigation('/login')}
							className='py-[18px] w-full text-white text-center transition card-bg-gradient rounded-[6px]'
						>
							Вход
						</button>

						<button
							onClick={() => handleNavigation('/register')}
							className='py-[18px] w-full text-white text-center transition button-bg-gradient rounded-[6px]'
						>
							Регистрация
						</button>
					</>
				)}
			</div>

			{/* Close overlay when clicking outside */}
			<div className='absolute inset-0 -z-10' onClick={onClose} />
		</div>
	)
}

export default Menu
