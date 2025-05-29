import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const PostSkeleton: React.FC = () => {
  const skeletonItems = Array(9).fill(null)

  return (
    <div className='grid grid-cols-3 gap-6'>
      {skeletonItems.map((_, index) => (
        <div key={index} className='flex flex-col items-center space-y-3'>
          <div className='flex flex-col items-center space-y-2'>
            <Skeleton className='w-60 h-40  bg-gray-200' />
            <Skeleton className='h-4 w-30 !mt-4 bg-gray-200' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostSkeleton
