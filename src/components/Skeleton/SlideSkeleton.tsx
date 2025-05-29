import { CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const CarouselItemSkeleton = () => {
  return (
    <CarouselItem>
      <div className=''>
        <Card className='border-none shadow-none py-0'>
          <CardContent className='flex  items-center  px-0'>
            <div className='flex flex-col w-full'>
              <div className=' w-full h-[534px]'>
                <Skeleton className='w-[1000px] h-full' />
              </div>
              <div className='md:w-2/5 lg:w-full !p-6 flex justify-between'>
                <div>
                  <Skeleton className='h-6 w-[500px] mb-2' />
                  <Skeleton className='h-4 w-[500px]' />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  )
}

export const CarouselSkeleton = ({ count = 3 }) => {
  return (
    <div className='flex space-x-4'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex-shrink-0'>
          <CarouselItemSkeleton />
        </div>
      ))}
    </div>
  )
}
