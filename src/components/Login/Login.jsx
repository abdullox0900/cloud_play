import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/user'
import logo from '../../assets/logo.png'
import MainBg from '../MainBg/MainBg'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()

	// Handle username change
	const handleUsernameChange = e => {
		setUsername(e.target.value)
	}

	// Handle password change
	const handlePasswordChange = e => {
		setPassword(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		// Validate form
		if (!username || !password) {
			setError('Please fill in all fields')
			return
		}

		setIsLoading(true)
		setError('')

		try {
			// Login the user
			console.log('Login boshlandi...')
			const result = await loginUser({ username, password })
			console.log('Login muvaffaqiyatli:', result)

			// Trigger storage event for other tabs
			window.dispatchEvent(new Event('storage'))

			// Navigate to home page after a short delay to allow state updates
			setTimeout(() => {
				navigate('/')
			}, 100)
		} catch (error) {
			console.error('Login error:', error)

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
			if (errorMessage.includes('401')) {
				errorMessage = "Noto'g'ri login yoki parol."
			} else if (errorMessage.includes('404')) {
				errorMessage = 'Foydalanuvchi topilmadi.'
			}

			setError(`Login bo'lmadi: ${errorMessage}`)
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
					Kirish
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
								placeholder='Enter username'
								className='w-full px-[10px] py-[16px] text-[12px] rounded-[8px] text-white placeholder-white/50 input-bg-gradient'
								disabled={isLoading}
							/>
						</div>
					</div>

					<div className='mb-6'>
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
							placeholder='••••••••'
							className='w-full px-[10px] py-[16px] text-[12px] rounded-[8px] text-white placeholder-white/50 input-bg-gradient'
							disabled={isLoading}
						/>
					</div>

					<button
						type='submit'
						className='w-full text-white py-[16px] rounded-[6px] font-bold text-[12px] button-bg-gradient'
						disabled={isLoading}
					>
						{isLoading ? 'Processing...' : 'Login'}
					</button>

					<div className='mt-4 text-center relative z-10'>
						<p className='text-white text-sm'>
							Hisobingiz yo'qmi?{' '}
							<button
								type='button'
								className='text-blue-400 hover:text-blue-300'
								onClick={() => navigate('/register')}
							>
								Ro'yxatdan o'tish
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
