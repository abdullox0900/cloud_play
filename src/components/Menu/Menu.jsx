import React from 'react'
import { useNavigate } from 'react-router-dom'

const Menu = ({ isOpen, onClose }) => {
	const navigate = useNavigate()

	const handleNavigation = path => {
		navigate(path)
		onClose()
	}

	if (!isOpen) return null

	return (
		<div className='fixed top-[75px] left-[20px] right-[20px] bottom-[0px] bg-[#0A0A0A]/30 backdrop-blur-sm rounded-[8px] z-50 flex justify-center items-start pt-[60px]'>
			<div className='flex flex-col gap-[13px] w-[250px]'>
				<button
					onClick={() => handleNavigation('/add-funds')}
					className='py-[18px] w-full text-white text-center transition card-bg-gradient rounded-[6px]'
				>
					Пополнить счёт
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
					onClick={() => handleNavigation('/logout')}
					className='py-[18px] w-full text-white text-center transition card-bg-gradient rounded-[6px]'
				>
					Выйти
				</button>
			</div>

			{/* Close overlay when clicking outside */}
			<div className='absolute inset-0 -z-10' onClick={onClose} />
		</div>
	)
}

export default Menu
