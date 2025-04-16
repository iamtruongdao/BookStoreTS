import React from 'react'
type NewsItemProp = {
  w: string
  h: string
  image: string
  title?: string
  date?: string
  border?: boolean
}
const NewsItem: React.FC<NewsItemProp> = (props) => {
  const { w, h, image, title, date, border = false } = props
  return (
    <div className={`py-4 cursor-pointer ${!border ? 'border-b-[1px] border-b-[#BBBBBF]' : ''}   last:border-b-0 `}>
      <div
        className={`flex overflow-hidden ${border ? 'border-[1px] border-[#BBBBBF]' : ''} rounded-md shadow-sm`}
        style={{ height: h }}
      >
        <div style={{ width: w }} className={`shrink-0 h-full  `}>
          <img src={image} alt='Hành trình khám phá' className={`w-full h-full  object-cover`} />
        </div>
        <div className={`w-[calc(100%-${w})]   p-4 bg-white`}>
          <h3 className='font-medium mb-2 text-sm line-clamp-2'>
            {title && 'Hành trình khám phá sự phát triển của nghệ thuật âm thanh qua các...'}
          </h3>
          <p className='text-gray-500 text-xs'>{date && 'Thứ Hai, 17/03/2025'}</p>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
