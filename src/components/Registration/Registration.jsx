import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUsernameAvailability, registerUser } from '../../api/user'
import logo from '../../assets/logo.png'
import MainBg from '../MainBg/MainBg'

const Registration = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [usernameAvailable, setUsernameAvailable] = useState(null)
	const [passwordMatch, setPasswordMatch] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()

	// Check username availability
	const handleCheckUsername = async () => {
		if (!username.trim()) return

		setIsLoading(true)
		try {
			const isAvailable = await checkUsernameAvailability(username)
			setUsernameAvailable(isAvailable)
		} catch (error) {
			console.error('Error checking username:', error)
			setError('Failed to check username availability')
		} finally {
			setIsLoading(false)
		}
	}

	// Check if passwords match
	const checkPasswordMatch = () => {
		if (repeatPassword) {
			setPasswordMatch(password === repeatPassword)
		}
	}

	// Handle username change
	const handleUsernameChange = e => {
		setUsername(e.target.value)
		setUsernameAvailable(null)
	}

	// Handle username blur (check availability when user leaves the field)
	const handleUsernameBlur = () => {
		handleCheckUsername()
	}

	// Handle password change
	const handlePasswordChange = e => {
		setPassword(e.target.value)
		if (repeatPassword) {
			setPasswordMatch(e.target.value === repeatPassword)
		}
	}

	// Handle repeat password change
	const handleRepeatPasswordChange = e => {
		setRepeatPassword(e.target.value)
		setPasswordMatch(password === e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		// Validate form
		if (!username || !password || !repeatPassword) {
			setError('Please fill in all fields')
			return
		}

		if (!passwordMatch) {
			setError('Passwords do not match')
			return
		}

		if (usernameAvailable === false) {
			setError('Username is already taken')
			return
		}

		setIsLoading(true)
		setError('')

		try {
			// Register the user
			console.log("Ro'yxatdan o'tish boshlandi...")
			const result = await registerUser({ username, password })
			console.log("Ro'yxatdan o'tish muvaffaqiyatli:", result)

			// Trigger storage event for other tabs
			window.dispatchEvent(new Event('storage'))

			// Navigate to home page after a short delay to allow state updates
			setTimeout(() => {
				navigate('/')
			}, 100)
		} catch (error) {
			console.error('Registration error:', error)

			// Xatolik xabarini yaxshiroq ko'rsatish
			let errorMessage = error.message || "Noma'lum xato"

			// JSON formatidagi xatoliklarni tekshirish
			if (errorMessage.includes('{') && errorMessage.includes('}')) {
				try {
					// Xatolik xabaridan JSON qismini ajratib olish
					const jsonStr = errorMessage.substring(
						errorMessage.indexOf('{'),
						errorMessage.lastIndexOf('}') + 1
					)
					const errorData = JSON.parse(jsonStr)

					// Serverdan kelgan xatolik xabarini ko'rsatish
					if (errorData.message) {
						// Xatolik xabarini qisqartirish (stack trace ni olib tashlash)
						const shortMessage = errorData.message.split('\n')[0]
						errorMessage = shortMessage || 'Server xatoligi'
					}
				} catch (e) {
					console.error('Error parsing error message:', e)
				}
			}

			// Xatolik xabarini aniq va tushunarli qilish
			if (errorMessage.includes('UQ_SmartCardUID')) {
				errorMessage =
					"Ro'yxatdan o'tishda texnik xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
			} else if (errorMessage.includes('Email value')) {
				errorMessage = "Bu email allaqachon ro'yxatdan o'tgan."
			} else if (errorMessage.includes('Username')) {
				errorMessage = "Bu foydalanuvchi nomi allaqachon ro'yxatdan o'tgan."
			}

			setError(`Ro'yxatdan o'tib bo'lmadi: ${errorMessage}`)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='w-full h-screen flex items-center justify-center px-[20px]'>
			<MainBg />
			<div className='card-bg-gradient px-[20px] pt-[20px] pb-[40px] w-full rounded-[15px] border-gradient'>
				<div className='flex items-center justify-center mb-[15px] w-[165px] h-[155px] mx-auto'>
					<img src={logo} alt='CloudPlay Logo' />
				</div>
				<h1 className='text-white text-[22px] font-bold text-center mb-[21px]'>
					Регистрация
				</h1>
				{error && (
					<div className='bg-red-500/20 text-red-300 p-2 rounded-md mb-4 text-center'>
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='username'
							className='block text-white mb-[6px] ml-[11px] font-light'
						>
							User Name:
						</label>
						<div className='relative'>
							<input
								type='text'
								id='username'
								value={username}
								onChange={handleUsernameChange}
								onBlur={handleUsernameBlur}
								placeholder='Enter username'
								className='w-full px-[10px] py-[16px] text-[12px] rounded-[8px] text-white placeholder-white/50 input-bg-gradient'
								disabled={isLoading}
							/>
							{usernameAvailable !== null && (
								<span className='absolute right-3 top-1/2 transform -translate-y-1/2'>
									{usernameAvailable ? (
										<svg
											className='w-5 h-5 text-green-500'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
												clipRule='evenodd'
											></path>
										</svg>
									) : (
										<svg
											className='w-5 h-5 text-red-500'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path
												fillRule='evenodd'
												d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
												clipRule='evenodd'
											></path>
										</svg>
									)}
								</span>
							)}
						</div>
						{usernameAvailable === false && (
							<p className='text-red-400 text-xs mt-1 ml-2'>
								Username is already taken
							</p>
						)}
						{usernameAvailable === true && (
							<p className='text-green-400 text-xs mt-1 ml-2'>
								Username is available
							</p>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-white mb-[6px] ml-[11px] font-light'
						>
							Password:
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={handlePasswordChange}
							onBlur={checkPasswordMatch}
							placeholder='••••••••'
							className='w-full px-[10px] py-[16px] text-[12px] rounded-[8px] text-white placeholder-white/50 input-bg-gradient'
							disabled={isLoading}
						/>
					</div>

					<div className='mb-6'>
						<label
							htmlFor='repeatPassword'
							className='block text-white mb-[6px] ml-[11px] font-light'
						>
							Repeat Password:
						</label>
						<div className='relative'>
							<input
								type='password'
								id='repeatPassword'
								value={repeatPassword}
								onChange={handleRepeatPasswordChange}
								placeholder='Repeat Password...'
								className={`w-full px-[10px] py-[16px] text-[12px] rounded-[8px] text-white placeholder-white/50 input-bg-gradient ${
									repeatPassword && !passwordMatch
										? 'border border-red-500'
										: ''
								}`}
								disabled={isLoading}
							/>
							{repeatPassword && (
								<span className='absolute right-3 top-1/2 transform -translate-y-1/2'>
									{passwordMatch ? (
										<svg
											className='w-5 h-5 text-green-500'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
												clipRule='evenodd'
											></path>
										</svg>
									) : (
										<svg
											className='w-5 h-5 text-red-500'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path
												fillRule='evenodd'
												d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
												clipRule='evenodd'
											></path>
										</svg>
									)}
								</span>
							)}
						</div>
						{repeatPassword && !passwordMatch && (
							<p className='text-red-400 text-xs mt-1 ml-2'>
								Passwords do not match.
							</p>
						)}
					</div>

					<button
						type='submit'
						className='w-full text-white py-[16px] rounded-[6px] font-bold text-[12px] button-bg-gradient'
						disabled={
							isLoading || usernameAvailable === false || !passwordMatch
						}
					>
						{isLoading ? 'Processing...' : 'Register'}
					</button>

					<div className='mt-4 text-center relative z-10'>
						<p className='text-white text-sm'>
							Hisobingiz bormi?{' '}
							<button
								type='button'
								className='text-blue-400 hover:text-blue-300'
								onClick={() => navigate('/login')}
							>
								Kirish
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Registration
