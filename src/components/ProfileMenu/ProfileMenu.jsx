import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	getUserPicture,
	getUserProfile,
	updateUserPicture,
	updateUserProfile,
} from '../../api/profile'
import { getCurrentUser } from '../../api/user'
import defaultAvatar from '../../assets/avatar.jpg'

const ProfileMenu = ({ isOpen, onClose }) => {
	const navigate = useNavigate()
	const [userData, setUserData] = useState(null)
	const [userPicture, setUserPicture] = useState(null)
	const [loading, setLoading] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		mobilePhone: '',
	})
	const [isSaving, setIsSaving] = useState(false)
	const [updateStatus, setUpdateStatus] = useState({ type: '', message: '' })
	const [uploadingPicture, setUploadingPicture] = useState(false)

	useEffect(() => {
		const fetchUserData = async () => {
			if (isOpen) {
				setLoading(true)
				const currentUser = getCurrentUser()

				if (currentUser && currentUser.userId) {
					try {
						const profile = await getUserProfile(currentUser.userId)
						const picture = await getUserPicture(currentUser.userId)

						setUserData(profile)
						setUserPicture(picture)

						// Initialize form data with user data
						setFormData({
							firstName: profile?.firstName || '',
							lastName: profile?.lastName || '',
							mobilePhone: profile?.mobilePhone || profile?.phone || '',
						})
					} catch (err) {
						console.error('Error fetching user data:', err)
					} finally {
						setLoading(false)
					}
				}
			}
		}

		fetchUserData()

		// Reset editing mode when menu closes
		if (!isOpen) {
			setIsEditing(false)
			setUpdateStatus({ type: '', message: '' })
		}
	}, [isOpen])

	const handleNavigation = path => {
		navigate(path)
		onClose()
	}

	const handlePictureChange = async e => {
		const file = e.target.files[0]
		if (!file) return

		setUploadingPicture(true)
		setUpdateStatus({ type: '', message: '' })

		const reader = new FileReader()
		reader.onloadend = async () => {
			const base64String = reader.result.split(',')[1]

			try {
				const currentUser = getCurrentUser()
				if (currentUser && currentUser.userId) {
					await updateUserPicture(currentUser.userId, base64String)
					setUserPicture(base64String)
					setUpdateStatus({ type: 'success', message: 'Аватар обновлен' })
				}
			} catch (err) {
				console.error('Error updating profile picture:', err)
				setUpdateStatus({ type: 'error', message: 'Ошибка обновления аватара' })
			} finally {
				setUploadingPicture(false)
			}
		}
		reader.readAsDataURL(file)
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSaveProfile = async () => {
		const currentUser = getCurrentUser()
		if (!currentUser || !currentUser.userId) return

		setIsSaving(true)
		setUpdateStatus({ type: '', message: '' })

		try {
			// Create updated user data object with only the fields we want to update
			const updatedUserData = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				mobilePhone: formData.mobilePhone,
			}

			// Send update request to API
			const result = await updateUserProfile(
				currentUser.userId,
				updatedUserData
			)

			if (result.success) {
				// Update local state
				setUserData({
					...userData,
					...updatedUserData,
				})
				setIsEditing(false)
				setUpdateStatus({ type: 'success', message: 'Профиль обновлен' })
			} else {
				setUpdateStatus({ type: 'error', message: 'Ошибка обновления профиля' })
			}
		} catch (err) {
			console.error('Error updating user profile:', err)
			setUpdateStatus({ type: 'error', message: 'Ошибка обновления профиля' })
		} finally {
			setIsSaving(false)
		}
	}

	if (!isOpen) return null

	// Get username for display
	const username = userData?.username || 'User'

	return (
		<div className='fixed top-[75px] left-[20px] right-[20px] bottom-[0px] bg-[#0A0A0A]/90 backdrop-blur-sm rounded-[8px] z-50 flex justify-center items-start pt-[60px] overflow-y-auto'>
			{loading ? (
				<div className='flex justify-center items-center p-10'>
					<div className='cyberpunk-loader'>
						<div className='text-blue-500 text-xl font-bold'>
							<span className='animate-pulse'>Loading...</span>
						</div>
						<div className='h-1 w-40 mt-3 bg-gray-800 overflow-hidden'>
							<div className='h-full w-1/2 bg-blue-500 animate-[cyberpunk-loading_1.5s_ease-in-out_infinite]'></div>
						</div>
					</div>
				</div>
			) : (
				<div className='w-full max-w-md flex flex-col items-center px-4'>
					{/* Status message */}
					{updateStatus.message && (
						<div
							className={`w-full mb-4 py-2 px-4 rounded-md text-center ${
								updateStatus.type === 'success'
									? 'bg-green-900/50 text-green-400 border border-green-500'
									: updateStatus.type === 'error'
									? 'bg-red-900/50 text-red-400 border border-red-500'
									: ''
							}`}
						>
							{updateStatus.message}
						</div>
					)}

					{/* Profile picture section */}
					<div className='relative'>
						<div className='w-32 h-32 rounded-full overflow-hidden bg-gray-900 mb-4 border-2 border-blue-500 shadow-[0_0_15px_rgba(0,123,255,0.5)]'>
							{uploadingPicture ? (
								<div className='w-full h-full flex items-center justify-center bg-gray-900'>
									<div className='h-8 w-8 border-4 border-t-blue-500 border-blue-500/30 rounded-full animate-spin'></div>
								</div>
							) : userPicture ? (
								<img
									src={`data:image/jpeg;base64,${userPicture}`}
									alt='Profile'
									className='w-full h-full object-cover'
								/>
							) : (
								<img
									src={defaultAvatar}
									alt='Profile'
									className='w-full h-full object-cover'
								/>
							)}
						</div>
						<label className='absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer shadow-[0_0_10px_rgba(0,123,255,0.7)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,123,255,0.9)]'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 text-white'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
								/>
							</svg>
							<input
								type='file'
								className='hidden'
								onChange={handlePictureChange}
								accept='image/*'
								disabled={uploadingPicture}
							/>
						</label>
					</div>

					{/* Username with glitch effect */}
					<h2
						className='text-2xl font-bold text-blue-400 mb-6 glitch-text'
						data-text={`@${username}`}
					>
						@{username}
					</h2>

					{/* Profile data section */}
					<div className='w-full space-y-4 bg-gray-900/80 p-6 rounded-lg border border-blue-500/50 shadow-[0_0_20px_rgba(0,123,255,0.15)]'>
						{isEditing ? (
							// Edit mode
							<>
								<div className='flex flex-col'>
									<label className='text-blue-400 text-sm mb-1'>Имя</label>
									<input
										type='text'
										name='firstName'
										value={formData.firstName}
										onChange={handleInputChange}
										className='bg-gray-800 text-blue-100 p-2 rounded border border-blue-500/50 focus:border-blue-500 focus:outline-none focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]'
									/>
								</div>

								<div className='flex flex-col'>
									<label className='text-blue-400 text-sm mb-1'>Фамилия</label>
									<input
										type='text'
										name='lastName'
										value={formData.lastName}
										onChange={handleInputChange}
										className='bg-gray-800 text-blue-100 p-2 rounded border border-blue-500/50 focus:border-blue-500 focus:outline-none focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]'
									/>
								</div>

								<div className='flex flex-col'>
									<label className='text-blue-400 text-sm mb-1'>Телефон</label>
									<input
										type='text'
										name='mobilePhone'
										value={formData.mobilePhone}
										onChange={handleInputChange}
										className='bg-gray-800 text-blue-100 p-2 rounded border border-blue-500/50 focus:border-blue-500 focus:outline-none focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]'
									/>
								</div>
							</>
						) : (
							// View mode
							<>
								<div className='flex flex-col'>
									<p className='text-blue-400 text-sm'>Имя</p>
									<p className='font-medium text-white text-lg border-b border-blue-500/30 pb-1'>
										{userData?.firstName || 'Не указано'}
									</p>
								</div>

								<div className='flex flex-col'>
									<p className='text-blue-400 text-sm'>Фамилия</p>
									<p className='font-medium text-white text-lg border-b border-blue-500/30 pb-1'>
										{userData?.lastName || 'Не указано'}
									</p>
								</div>

								<div className='flex flex-col'>
									<p className='text-blue-400 text-sm'>Телефон</p>
									<p className='font-medium text-white text-lg border-b border-blue-500/30 pb-1'>
										{userData?.mobilePhone || userData?.phone || 'Не указано'}
									</p>
								</div>
							</>
						)}
					</div>

					{/* Action buttons */}
					<div className='mt-6 flex justify-end w-full'>
						{isEditing ? (
							<div className='flex gap-3'>
								<button
									onClick={() => setIsEditing(false)}
									className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded border border-gray-600 transition-all duration-300'
									disabled={isSaving}
								>
									Отмена
								</button>
								<button
									onClick={handleSaveProfile}
									className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded border border-blue-500 shadow-[0_0_10px_rgba(0,123,255,0.3)] hover:shadow-[0_0_15px_rgba(0,123,255,0.5)] transition-all duration-300 flex items-center'
									disabled={isSaving}
								>
									{isSaving ? (
										<>
											<svg
												className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
											>
												<circle
													className='opacity-25'
													cx='12'
													cy='12'
													r='10'
													stroke='currentColor'
													strokeWidth='4'
												></circle>
												<path
													className='opacity-75'
													fill='currentColor'
													d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
												></path>
											</svg>
											Сохранение...
										</>
									) : (
										'Сохранить'
									)}
								</button>
							</div>
						) : (
							<button
								onClick={() => setIsEditing(true)}
								className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded border border-blue-500 shadow-[0_0_10px_rgba(0,123,255,0.3)] hover:shadow-[0_0_15px_rgba(0,123,255,0.5)] transition-all duration-300'
							>
								Редактировать
							</button>
						)}
					</div>
				</div>
			)}

			{/* Close overlay when clicking outside */}
			<div className='fixed inset-0 -z-10' onClick={onClose} />
		</div>
	)
}

export default ProfileMenu
