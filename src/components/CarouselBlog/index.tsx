import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.webp'

type Props = {
  slide: Array<number>
  opts: boolean
}
const CarouselBlog: React.FC<Props> = (props) => {
  const { slide, opts } = props
  return (
    <div className='lg:col-span-2 bg-white rounded-md flex-2/3 overflow-hidden shadow-sm'>
      <Carousel opts={{ loop: opts }} className='w-full'>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className=''>
                <Card className='border-none py-0'>
                  <CardContent className='flex  items-center  px-0'>
                    <div className='flex flex-col w-full'>
                      <div className=' w-full h-[534px]'>
                        <img
                          src={logo}
                          alt='Sự kiện giao lưu với tác giả và dịch giả'
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='md:w-2/5 lg:w-full !p-6 flex justify-between'>
                        <div>
                          <Link to={'/'} className='text-xl !my-2 font-medium mb-4 hover:text-green-400'>
                            Sự kiện giao lưu với tác giả và dịch giả "Bố con cá gai"
                          </Link>
                          <p className='text-gray-500 text-sm'>Thứ Hai, 03/03/2025</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default CarouselBlog
