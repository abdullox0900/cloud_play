import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './SearchModal.css'

const SearchModal = ({ isOpen, onClose, onSearch }) => {
	const { t } = useTranslation()
	const [searchTerm, setSearchTerm] = useState('')

	// Reset search term when modal opens
	useEffect(() => {
		if (isOpen) {
			setSearchTerm('')
		}
	}, [isOpen])

	const handleSubmit = e => {
		e.preventDefault()
		onSearch(searchTerm)
		onClose()
	}

	// Close modal when clicking outside
	const handleOutsideClick = e => {
		if (e.target.classList.contains('modal-backdrop')) {
			onClose()
		}
	}

	// Close on escape key
	useEffect(() => {
		const handleEscape = e => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-start justify-center pt-20 modal-backdrop'
			onClick={handleOutsideClick}
		>
			<div className='bg-[#111111]/90 backdrop-blur-md w-full max-w-md mx-4 rounded-[10px] border border-[#333333]/30 shadow-lg'>
				<div className='p-4'>
					<form onSubmit={handleSubmit}>
						<div className='relative'>
							<input
								type='text'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								placeholder={t('search', 'Поиск')}
								className='w-full bg-[#1A1A1A] text-white border border-[#333333]/30 rounded-[8px] py-3 px-4 pl-10 outline-none search-input-focus'
								autoFocus
							/>
							<div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60'>
								<svg
									width='18'
									height='18'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M15 15L19 19M1 9C1 11.1217 1.84285 13.1566 3.34315 14.6569C4.84344 16.1571 6.87827 17 9 17C11.1217 17 13.1566 16.1571 14.6569 14.6569C16.1571 13.1566 17 11.1217 17 9C17 6.87827 16.1571 4.84344 14.6569 3.34315C13.1566 1.84285 11.1217 1 9 1C6.87827 1 4.84344 1.84285 3.34315 3.34315C1.84285 4.84344 1 6.87827 1 9Z'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
						</div>
						<div className='flex justify-end mt-4'>
							<button
								type='button'
								onClick={onClose}
								className='px-4 py-2 mr-2 text-white bg-[#1A1A1A] rounded-[8px] hover:bg-[#222222]'
							>
								{t('cancel', 'Отмена')}
							</button>
							<button
								type='submit'
								className='px-4 py-2 text-white bg-[#2E90FA] rounded-[8px] hover:bg-[#2E90FA]/90'
							>
								{t('search', 'Поиск')}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SearchModal
