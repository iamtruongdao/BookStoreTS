import { Link } from 'react-router-dom'

import { ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface NewsArticle {
  id: string
  title: string
  image: string
  excerpt: string
  date: string
  url: string
}

export function ArticleSection() {
  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Nhân chứng kể lại cuộc chiến khốc liệt bảo vệ biên giới năm 1979',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qEQIKLW4fYJzVHNRD5aIKZbbaUEUpA.png',
      excerpt: 'Trên tay bác sĩ Nguyễn Thái Long, người đồng đội bị thương nặng chỉ kịp nói lên những lời cuối...',
      date: 'Thứ Ba, 25/02/2025',
      url: '/news/article-1'
    },
    {
      id: '2',
      title: 'Sách của đại đức Hàn Quốc bán hết 5.000 bản trong tháng đầu ra mắt tại Việt Nam',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qEQIKLW4fYJzVHNRD5aIKZbbaUEUpA.png',
      excerpt: 'Là tác giả của nhiều đầu sách được độc giả Hàn Quốc nói riêng và châu Á nói chung yêu...',
      date: 'Thứ Hai, 24/02/2025',
      url: '/news/article-2'
    },
    {
      id: '3',
      title: 'Con gái nhà thơ Chế Lan Viên tái ngộ bạn đọc với tập truyện ngắn - tản văn',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qEQIKLW4fYJzVHNRD5aIKZbbaUEUpA.png',
      excerpt: 'Nhà văn Phan Thị Vàng Anh, con gái nhà thơ Chế Lan Viên tái ngộ bạn đọc với tập truyện ngắn...',
      date: 'Thứ Hai, 24/02/2025',
      url: '/news/article-3'
    },
    {
      id: '4',
      title: 'Cuốn sách về văn hóa đọc gây tiếng vang trong giới trẻ',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qEQIKLW4fYJzVHNRD5aIKZbbaUEUpA.png',
      excerpt: 'Cuốn sách mới của tác giả Nguyễn Nhật Ánh đã nhanh chóng trở thành hiện tượng với hơn 10.000 bản...',
      date: 'Chủ Nhật, 23/02/2025',
      url: '/news/article-4'
    },
    {
      id: '5',
      title: 'Nhà Nam ra mắt bộ sách mới về lịch sử Việt Nam',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qEQIKLW4fYJzVHNRD5aIKZbbaUEUpA.png',
      excerpt: 'Bộ sách gồm 5 cuốn với nội dung phong phú về các giai đoạn lịch sử quan trọng của dân tộc...',
      date: 'Thứ Bảy, 22/02/2025',
      url: '/news/article-5'
    }
  ]

  return (
    <div className='!p-6'>
      <div className='border-t-2 border-green-600 !pt-4 !mb-12'>
        <div className='flex items-center justify-between !mb-6'>
          <h2 className='text-2xl font-bold text-green-600'>Sách Nhà Nam trên báo chí</h2>
          <Link
            to={'/author'}
            className='text-green-700 flex items-center hover:text-green-800 cursor-pointer hover:bg-green-50 p-2'
          >
            Xem thêm
            <ChevronRight className='!ml-1 h-4 w-4' />
          </Link>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: false
          }}
          className='w-full'
        >
          <CarouselContent className='!-ml-2 md:-ml-4'>
            {newsArticles.map((article) => (
              <CarouselItem key={article.id} className='!pl-2 !md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3'>
                <Link to={article.url} className='h-full flex-col items-center flex justify-center'>
                  <Card className='border-none shadow-sm py-0  gap-1 w-[90%] rounded-none  '>
                    <CardContent className='p-0 shrink-0 h-[250px] w-full'>
                      <div className='relative aspect-[4/3] w-full h-full overflow-hidden'>
                        <img
                          src={article.image || '/placeholder.svg'}
                          alt={article.title}
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='object-cover h-full'
                        />
                      </div>
                    </CardContent>
                    <CardFooter className='!px-1 flex flex-col flex-1  !pt-0 '>
                      <div>
                        <h3 className='font-bold text-base line-clamp-2 !mb-2'>{article.title}</h3>
                        <p className='text-sm text-gray-600 line-clamp-2'>{article.excerpt}</p>
                      </div>
                      <p className='text-xs text-gray-500'>{article.date}</p>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-0 bg-white shadow-md' />
          <CarouselNext className='right-0 bg-white shadow-md' />
        </Carousel>
      </div>
    </div>
  )
}
