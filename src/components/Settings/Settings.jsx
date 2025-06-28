import React from 'react'
import { useNavigate } from 'react-router-dom'
import MainBg from '../MainBg/MainBg'

const Settings = () => {
	const navigate = useNavigate()

	return (
		<div className='w-full h-screen'>
			<MainBg />
			<div className='max-w-md mx-auto h-full p-4'>
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
					<h1 className='text-white text-xl font-bold'>Настройки</h1>
				</div>

				<div className='bg-white/10 backdrop-blur-sm rounded-xl p-6'>
					<p className='text-white text-center'>
						Здесь будут настройки приложения
					</p>
				</div>
			</div>
		</div>
	)
}

export default Settings
