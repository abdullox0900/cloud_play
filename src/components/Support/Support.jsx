import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import MainBg from '../MainBg/MainBg'

const Support = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		// Handle form submission
		alert('Your message has been sent!')
	}

	return (
		<div className='min-h-screen bg-[#0A0A0A] pb-20'>
			<MainBg />
			<div className='max-w-md mx-auto p-4'>
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
					<h1 className='text-white text-xl font-bold'>{t('support.title')}</h1>
				</div>

				<div className='bg-[#111111]/90 rounded-xl p-6 border border-[#333333]/30 mb-6'>
					<h2 className='text-[#2E90FA] text-lg font-semibold mb-4'>
						{t('support.contactUs')}
					</h2>
					<form onSubmit={handleSubmit}>
						<div className='mb-4'>
							<input
								type='text'
								className='w-full bg-[#0A0A0A]/90 border border-[#333333]/30 rounded-md p-3 text-white'
								placeholder='Name'
							/>
						</div>
						<div className='mb-4'>
							<input
								type='email'
								className='w-full bg-[#0A0A0A]/90 border border-[#333333]/30 rounded-md p-3 text-white'
								placeholder='Email'
							/>
						</div>
						<div className='mb-4'>
							<textarea
								className='w-full bg-[#0A0A0A]/90 border border-[#333333]/30 rounded-md p-3 text-white h-32'
								placeholder='Message'
							></textarea>
						</div>
						<button
							type='submit'
							className='w-full bg-[#2E90FA] text-white py-3 rounded-md font-medium hover:bg-[#1570CD] transition-all'
						>
							{t('support.submit')}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Support
