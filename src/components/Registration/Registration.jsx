import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import MainBg from '../MainBg/MainBg'

const Registration = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		// Here you would typically handle the registration logic
		// For now, we'll just navigate to the main page
		navigate('/')
	}

	return (
		<div className='w-full h-screen flex items-center justify-center px-[20px] '>
			<MainBg />
			<div className='card-bg-gradient px-[20px] pt-[20px] pb-[40px] w-full rounded-[15px] border-gradient'>
				<div className='flex items-center justify-center mb-[15px] w-[165px] h-[155px] mx-auto'>
					<img src={logo} alt='' />
				</div>
				<h1 className='text-white text-[22px] font-bold text-center mb-[21px]'>
					Регистрация
				</h1>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='login'
							className='block text-white mb-[6px] ml-[11px] font-light'
						>
							Логин
						</label>
						<input
							type='text'
							id='login'
							value={login}
							onChange={e => setLogin(e.target.value)}
							placeholder='Введите логин'
							className='w-full px-[10px] py-[16px] text-[12px] rounded-[8px] text-white/50 placeholder-white/50 input-bg-gradient'
						/>
					</div>

					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block text-white mb-[6px] ml-[11px] font-light'
						>
							Пароль
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder='••••••'
							className='w-full px-[10px] py-[16px] text-[12px] rounded-[8px] text-white/50 placeholder-white/50 input-bg-gradient'
						/>
					</div>

					<button
						type='submit'
						className='w-full text-white py-[16px] rounded-[6px] font-bold text-[12px] button-bg-gradient'
					>
						Отправить
					</button>
				</form>
			</div>
		</div>
	)
}

export default Registration
