import React from 'react'

const Banner = () => {
	return (
		<div className='mb-[38px]'>
			<div className='relative rounded-lg overflow-hidden h-[170px] banner-shadow'>
				<img
					src={
						'https://as1.ftcdn.net/v2/jpg/06/56/57/60/1000_F_656576099_9lT1LGtCi78orv7P62Ro1JH8lNj9YSsU.jpg'
					}
					alt=''
					className='w-full h-full object-cover'
				/>
			</div>
		</div>
	)
}

export default Banner
