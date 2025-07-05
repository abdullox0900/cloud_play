import React from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Banner.css'

const Banner = () => {
	// Sample banner images - replace with your actual banner images
	const banners = [
		{
			id: 1,
			image:
				'https://as1.ftcdn.net/v2/jpg/06/56/57/60/1000_F_656576099_9lT1LGtCi78orv7P62Ro1JH8lNj9YSsU.jpg',
			title: 'Game Banner 1',
		},
		{
			id: 2,
			image:
				'https://as2.ftcdn.net/v2/jpg/06/22/98/73/1000_F_622987317_ZI4LiPgOzTxQQ6LQiEULYVWtVNMkQBgY.jpg',
			title: 'Game Banner 2',
		},
		{
			id: 3,
			image:
				'https://as1.ftcdn.net/v2/jpg/06/30/47/88/1000_F_630478800_qOgZUQY0vZtpJlnzLiVKkJHgXsUQTVRZ.jpg',
			title: 'Game Banner 3',
		},
	]

	return (
		<div className='mb-[20px]'>
			<Swiper
				spaceBetween={0}
				centeredSlides={true}
				autoplay={{
					delay: 3500,
					disableOnInteraction: false,
				}}
				pagination={false}
				navigation={false}
				modules={[Autoplay]}
				className='banner-swiper'
			>
				{banners.map(banner => (
					<SwiperSlide key={banner.id}>
						<div className='relative rounded-lg overflow-hidden h-[170px] banner-shadow'>
							<img
								src={banner.image}
								alt={banner.title}
								className='w-full h-full object-cover'
							/>
							<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4'>
								<h3 className='text-white text-lg font-bold'>{banner.title}</h3>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default Banner
