import { Skeleton } from '../ui/skeleton'

type NewsItemSkeletonProp = {
  w: string
  h: string
  border?: boolean
}
export const NewsItemSkeleton: React.FC<NewsItemSkeletonProp> = (props) => {
  const { w, h, border = false } = props
  return (
    <div
      className={`py-4 cursor-pointer ${!border ? 'border-b-[1px] border-b-[#BBBBBF]' : ''}  first:pt-0  last:border-b-0 `}
    >
      <div
        className={`flex overflow-hidden ${border ? 'border-[1px] border-[#BBBBBF]' : ''} rounded-md shadow-sm`}
        style={{ height: h }}
      >
        <div style={{ width: w }} className={`shrink-0 h-full  `}>
          <Skeleton className='h-full w-full mb-2' />
        </div>
        <div className={`w-full p-4 bg-white`}>
          <Skeleton className='h-6 w-3/4 mb-2' />
          <Skeleton className='h-6 w-3/4 mb-2' />
        </div>
      </div>
    </div>
  )
}
