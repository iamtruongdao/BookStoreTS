import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-dropdown-menu'

export const OrderSkeleton = () => (
  <article className='order-item'>
    <Card className='border-none gap-0 py-0 shadow-sm overflow-hidden'>
      <CardHeader className='bg-white p-5 pb-3'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='h-5 bg-gray-200 rounded w-40 animate-pulse'></div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-6 bg-gray-200 rounded-full w-20 animate-pulse'></div>
            <div className='h-6 bg-gray-200 rounded-full w-24 animate-pulse'></div>
          </div>
        </div>
      </CardHeader>
      <Separator className='bg-gray-100' />
      <CardContent className='bg-white p-5'>
        <div className='mb-3'></div>

        {/* Skeleton for product items */}
        {[1, 2].map((index) => (
          <div key={index} className='flex py-3 border-b border-gray-100 last:border-b-0'>
            <div className='h-20 w-20 flex-shrink-0'>
              <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
            </div>
            <div className='ml-4 flex-1'>
              <div className='h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse'></div>
              <div className='flex justify-between items-center'>
                <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div>
                <div className='h-6 bg-gray-200 rounded-full w-12 animate-pulse'></div>
              </div>
            </div>
          </div>
        ))}

        <div className='mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg'>
          <div className='flex items-start'>
            <div className='h-4 bg-gray-200 rounded w-16 mr-2 animate-pulse'></div>
            <div className='h-4 bg-gray-200 rounded w-60 animate-pulse'></div>
          </div>
        </div>
      </CardContent>
      <Separator className='bg-gray-100' />
      <CardFooter className='bg-white p-5'>
        <div className='flex items-center text-gray-600'>
          <div className='h-4 w-4 bg-gray-200 rounded mr-2 animate-pulse'></div>
          <div className='h-4 bg-gray-200 rounded w-32 animate-pulse'></div>
        </div>
        <div className='flex-1 ml-4'>
          <div className='flex justify-end text-sm text-gray-600'>
            <div className='flex flex-col items-end'>
              <div className='flex items-center justify-between w-56'>
                <div className='h-4 bg-gray-200 rounded w-16 animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div>
              </div>
              <div className='flex items-center justify-between w-56 mt-1'>
                <div className='h-4 bg-gray-200 rounded w-24 animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded w-16 animate-pulse'></div>
              </div>
              <div className='flex items-center justify-between w-56 mt-2 pt-2 border-t border-gray-100'>
                <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded w-24 animate-pulse'></div>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
      <Separator className='bg-gray-100' />
      <div className='bg-white p-5 flex justify-end space-x-3'>
        <div className='h-8 bg-gray-200 rounded-full w-20 animate-pulse'></div>
        <div className='h-8 bg-gray-200 rounded-full w-24 animate-pulse'></div>
      </div>
    </Card>
  </article>
)
