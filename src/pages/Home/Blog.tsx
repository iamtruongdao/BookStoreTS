import CarouselBlog from '@/components/CarouselBlog'
import logo from '@/assets/logo.webp'
import NewsItem from '@/components/NewsItem'

const Blog = () => {
  return (
    <div className='w-full bg-[#e9f4ec] py-8 px-4'>
      <div className='container  !mx-auto  max-w-7xl'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main featured event - Takes up 2/3 of the grid on large screens */}
          <CarouselBlog opts slide={[1, 2, 3, 4, 5]} />
          {/* Right sidebar with smaller news items */}
          <div className='lg:col-span-1  space-y-4'>
            {/* News item 1 */}
            {/* <div className=' !pb-4  border-b-[1px] border-b-[#BBBBBF] '>
              <div className='flex overflow-hidden  rounded-md shadow-sm'>
                <div className='w-[196px]'>
                  <img src={logo} alt='Hành trình khám phá' className='w-full h-[125px] object-cover' />
                </div>
                <div className='w-[calc(100%-196px)] !p-4 bg-white'>
                  <h3 className='font-medium mb-2 text-sm'>
                    Hành trình khám phá sự phát triển của nghệ thuật âm thanh qua các...
                  </h3>
                  <p className='text-gray-500 text-xs'>Thứ Hai, 17/03/2025</p>
                </div>
              </div>
            </div> */}
            <NewsItem h='125px' w='196px' image={logo} />
            {/* News item 2 */}
            <div className=' !py-4  border-b-[1px] border-b-[#BBBBBF] '>
              <div className='flex overflow-hidden  rounded-md shadow-sm'>
                <div className='w-[196px]'>
                  <img src={logo} alt='Hành trình khám phá' className='w-full h-[125px] object-cover' />
                </div>
                <div className='w-[calc(100%-196px)] !p-4 bg-white'>
                  <h3 className='font-medium mb-2 text-sm'>
                    Hành trình khám phá sự phát triển của nghệ thuật âm thanh qua các...
                  </h3>
                  <p className='text-gray-500 text-xs'>Thứ Hai, 17/03/2025</p>
                </div>
              </div>
            </div>
            {/* News item 3 */}
            <div className=' !py-4  border-b-[1px] border-b-[#BBBBBF] '>
              <div className='flex overflow-hidden  rounded-md shadow-sm'>
                <div className='w-[196px]'>
                  <img src={logo} alt='Hành trình khám phá' className='w-full h-[125px] object-cover' />
                </div>
                <div className='w-[calc(100%-196px)] !p-4 bg-white'>
                  <h3 className='font-medium mb-2 text-sm'>
                    Hành trình khám phá sự phát triển của nghệ thuật âm thanh qua các...
                  </h3>
                  <p className='text-gray-500 text-xs'>Thứ Hai, 17/03/2025</p>
                </div>
              </div>
            </div>

            {/* News item 4 */}
            <div className=' !py-4    '>
              <div className='flex overflow-hidden  rounded-md shadow-sm'>
                <div className='w-[196px]'>
                  <img src={logo} alt='Hành trình khám phá' className='w-full h-[125px] object-cover' />
                </div>
                <div className='w-[calc(100%-196px)] !p-4 bg-white'>
                  <h3 className='font-medium mb-2 text-sm'>
                    Hành trình khám phá sự phát triển của nghệ thuật âm thanh qua các...
                  </h3>
                  <p className='text-gray-500 text-xs'>Thứ Hai, 17/03/2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
