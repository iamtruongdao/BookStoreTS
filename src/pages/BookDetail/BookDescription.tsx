import React, { FC } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Book } from '@/types'
import NewsItem from '@/components/NewsItem'
import logo from '@/assets/logo.webp'
// Book type definition
const newsItems = [
  {
    title: 'Sự kiện: NHỮNG CÂU CHUYỆN NGHỆ THUẬT - Giới thiệu bộ sách pháp',
    date: 'Thứ Hai, 24/03/2025',
    image: '/path/to/book-event-image.jpg'
  },
  {
    title: 'Trò chuyện về cuốn sách: Chuyện nhà Tí của nhà văn Phan Thị Vàng Anh',
    date: 'Thứ Hai, 17/03/2025',
    image: '/path/to/book-discussion-image.jpg'
  },
  {
    title: 'Sự kiện: Giao lưu với tác giả và dịch giả "Bỗ con gà"',
    date: 'Thứ Hai, 03/03/2025',
    image: '/path/to/author-event-image.jpg'
  },
  {
    title: '"Quyền lực" của đất đại',
    date: 'Chủ Nhật, 02/03/2025',
    image: '/path/to/power-book-image.jpg'
  },
  {
    title: 'Sự kiện: Ra mắt cuốn sách ĐẤT ĐAI - Ham muốn sở hữu định hình',
    date: 'Thứ Sáu, 01/02/2025',
    image: '/path/to/land-book-image.jpg'
  }
]
type BookDescriptionProps = {
  bookDetails: Book
}
const BookDescription: FC<BookDescriptionProps> = ({ bookDetails }) => {
  return (
    <div className='min-h-screen  p-4'>
      <div className='container flex justify-between max-w-7xl'>
        {/* Left section - Book description */}
        <div className='w-8/12'>
          <Card className='shadow-none border-none'>
            <CardContent>
              <h1 className='text-2xl font-bold text-green-600 mb-4'>Giới thiệu sách</h1>

              <ScrollArea className='h-[60vh] pr-4'>
                <div
                  dangerouslySetInnerHTML={{ __html: bookDetails.productDescription }}
                  className='space-y-4 text-gray-700'
                ></div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right section - Book details */}
        <div className='w-4/12'>
          <Card className='shadow-md mb-6 border-none'>
            <CardContent>
              <h2 className='text-2xl font-bold text-green-600 mb-4'>Thông tin chi tiết</h2>
              <ul className='space-y-3'>
                <li className='flex justify-between items-start'>
                  <span className='text-gray-600 flex items-center'>
                    <span className='mr-2'>•</span> Tác giả
                  </span>
                  <span className='font-medium text-right'>{bookDetails.authorName}</span>
                </li>
                <li className='flex justify-between items-start'>
                  <span className='text-gray-600 flex items-center'>
                    <span className='mr-2'>•</span> Dịch giả
                  </span>
                  <span className='font-medium text-right'>{bookDetails.translator}</span>
                </li>
                {/* <li className='flex justify-between items-start'>
                    <span className='text-gray-600 flex items-center'>
                      <span className='mr-2'>•</span> Nhà xuất bản
                    </span>
                    <span className='font-medium text-right'>{bookDetails.publisher}</span>
                  </li> */}
                {/* <li className='flex justify-between items-start'>
                    <span className='text-gray-600 flex items-center'>
                      <span className='mr-2'>•</span> Kích thước
                    </span>
                    <span className='font-medium text-right'>{bookDetails.}</span>
                  </li> */}
                <li className='flex justify-between items-start'>
                  <span className='text-gray-600 flex items-center'>
                    <span className='mr-2'>•</span> Số trang
                  </span>
                  <span className='font-medium text-right'>{bookDetails.pageNumber}</span>
                </li>
                <li className='flex justify-between items-start'>
                  <span className='text-gray-600 flex items-center'>
                    <span className='mr-2'>•</span> Ngày phát hành
                  </span>
                  <span className='font-medium text-right'>{bookDetails.publicDate}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Book publisher section */}
          <Card className='shadow-md border-none'>
            <CardContent>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold text-green-600'>Giới thiệu sách Nhà Nam</h2>
                <Badge className='bg-green-500 hover:bg-green-600'>
                  <span className='text-white'>New</span>
                </Badge>
              </div>

              <div className='relative'>
                <div className='space-y-2'>
                  {newsItems.map((item, index) => (
                    <NewsItem border key={index} w='150px' h='120px' title={item.title} date={item.date} image={logo} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BookDescription
