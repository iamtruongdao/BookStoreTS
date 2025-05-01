import { getAuthorByIdApi } from '@/apis/author.api'
import { getBookByAuthorApi } from '@/apis/book.api'
import Breadscrumb from '@/components/Breadscrumb'
import CarouselCustom from '@/components/Carousel'
import { useAppDispatch } from '@/hooks'
import ProfileCard from '@/pages/AuthorDetail/ProfileCard'
import BookInfo from '@/components/BookInfo'
import { setLoading } from '@/redux/slice/appSlice'
import { Author, Book } from '@/types'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookSection } from '../Home/BookSection'

const AuthorDetail = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [author, setAuthor] = useState<Author>({
    authorName: '',
    authorDescription: '',
    id: '',
    avatar: '',
    slug: ''
  })
  const [book, setBook] = useState<Book>({
    author: '',
    authorName: '',
    avatar: '',
    category: [],
    discount: 0,
    isPublic: false,
    productDescription: '',
    productName: '',
    productPrice: 0,
    productQuantity: 0
  })
  const getAuthorById = async () => {
    dispatch(setLoading(true))
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    const res = await getAuthorByIdApi(id)
    if (res.code === 0) {
      await getBook(res.data.id)
      setAuthor(res.data)

      dispatch(setLoading(false))
    }
  }
  const getBook = async (author: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const res = await getBookByAuthorApi(author)
    if (res.code === 0) {
      setBook(res.data)
    }
  }
  useEffect(() => {
    getAuthorById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <>
      <div className='text-sm !p-4 text-gray-600 !mb-4 bg-green-50'>
        <Breadscrumb
          breadcrumb={
            _.every(author, (value) => !_.isNil(value) && value !== '') && id ? { [id]: author.authorName } : {}
          }
        />
      </div>
      <ProfileCard author={author} />
      <BookInfo book={book} />
      <BookSection title='Sách cùng loại' />
    </>
  )
}

export default AuthorDetail
