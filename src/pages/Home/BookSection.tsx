import { BookCard } from '@/components/BookCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Book } from '@/types'
import { MouseEventHandler } from 'react'
import Carousel from 'react-multi-carousel'
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
}

interface BookSectionProps {
  title: string
  books: Book[]
  viewMoreLink: string
}

export function BookSection({ title = 'Sách mới', books, viewMoreLink = 's' }: BookSectionProps) {
  return (
    <div className='!p-6'>
      <div className='border-t-2 border-green-600 !pt-4 !mb-12'>
        <div className='flex items-center justify-between !mb-6'>
          <h2 className='text-2xl font-bold text-green-600'>{title}</h2>
          <Link
            to={viewMoreLink}
            className='text-green-700 flex items-center hover:text-green-800 cursor-pointer hover:bg-green-50 p-2'
          >
            Xem thêm
            <ChevronRight className='ml-1 h-4 w-4' />
          </Link>
        </div>

        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass='carousel-container'
          removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'
          customLeftArrow={<CusTomLeft />}
          customRightArrow={<CusTomRight />}
        >
          {books.map((book) => (
            <div className=' pl-2 flex justify-center !md:pl-4 '>
              <BookCard book={book} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

const CusTomLeft = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> | undefined }) => {
  return (
    <Button
      onClick={onClick}
      variant='outline'
      size='icon'
      className={`w-10 h-10 top-1/3  rounded-full cursor-pointer bg-[#00000080] absolute hover:bg-gray-700 border-2 border-white/20 flex items-center justify-center transition-all duration-200 p-0 shadow-md`}
      aria-label='Go to previous slide'
    >
      <div className='flex items-center justify-center'>
        <ChevronLeft size={12} className='text-white ml-0.5' />
      </div>
    </Button>
  )
}
const CusTomRight = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> | undefined }) => {
  return (
    <Button
      onClick={onClick}
      variant='outline'
      size='icon'
      className={`w-10 h-10 right-0 top-1/3 rounded-full cursor-pointer bg-[#00000080] absolute hover:bg-gray-700 border-2 border-white/20 flex items-center justify-center transition-all duration-200 p-0 shadow-md`}
      aria-label='Go to previous slide'
    >
      <div className='flex items-center justify-center'>
        <ChevronRight size={12} className='text-white ml-0.5' />
      </div>
    </Button>
  )
}
