import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTelegram } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import SearchModal from '../SearchModal/SearchModal'
import './TopHeader.css'

const TopHeader = ({ onSearch }) => {
	const { t } = useTranslation()
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

	const toggleSearchModal = () => {
		setIsSearchModalOpen(!isSearchModalOpen)
	}

	const handleSearch = searchTerm => {
		if (onSearch) {
			onSearch(searchTerm)
		}
		setIsSearchModalOpen(false)
	}

	return (
		<div className='top-header'>
			<div className='container mx-auto'>
				<div className='flex justify-between items-center'>
					<div className='flex items-center'>
						<a
							href='tel:+998901234567'
							className='text-white/70 hover:text-white transition flex items-center text-sm mr-4'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 mr-1'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
								/>
							</svg>
							+998 90 123 45 67
						</a>
						<div className='flex space-x-3'>
							<a
								href='https://t.me/cloudplay'
								target='_blank'
								rel='noopener noreferrer'
								className='text-white/70 hover:text-[#2E90FA] transition'
							>
								<FaTelegram />
							</a>
							<a
								href='https://instagram.com/cloudplay'
								target='_blank'
								rel='noopener noreferrer'
								className='text-white/70 hover:text-[#2E90FA] transition'
							>
								<svg
									className='h-4 w-4'
									viewBox='0 0 24 24'
									fill='currentColor'
								>
									<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
								</svg>
							</a>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<button
							className='text-white/70 hover:text-[#2E90FA] transition p-1'
							onClick={toggleSearchModal}
							aria-label={t('search', 'Поиск')}
						>
							<IoIosSearch size={16} />
						</button>
						<LanguageSwitcher />
					</div>
				</div>
			</div>

			{/* Search Modal */}
			<SearchModal
				isOpen={isSearchModalOpen}
				onClose={() => setIsSearchModalOpen(false)}
				onSearch={handleSearch}
			/>
		</div>
	)
}

export default TopHeader
