import { getAuthorApi } from '@/apis/author.api'
import { ArticleSection } from '@/pages/Home/ArticleSection'
import Blog from '@/pages/Home/Blog'
import { BookSection } from '@/pages/Home/BookSection'
import SectionAuthor from '@/pages/Home/SectionAuthor'
import { Author } from '@/types'
import { useEffect, useState } from 'react'

const Home = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  const getAuthorSection = async () => {
    const res = await getAuthorApi({ pageNumber: 1, pageSize: 10 })
    if (res.code === 0) {
      setAuthors(res.data.items)
    }
  }
  useEffect(() => {
    getAuthorSection()
  }, [])
  return (
    <>
      <Blog />
      <SectionAuthor authors={authors} />
      <BookSection title='Sách mới' />
      <BookSection title='Sắp xuất bản' />
      <ArticleSection />
    </>
  )
}

export default Home
