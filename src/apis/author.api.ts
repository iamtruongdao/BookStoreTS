import axios from '@/config/axios'
import { Author, BackendResponse, Paginate } from '@/types'

export const getAuthorApi = (params: { pageSize: number; pageNumber: number }) => {
  return axios.get<void, BackendResponse<Paginate<Author>>>('authors/paginate', {
    params
  })
}
export const getAuthorByIdApi = (slug?: string) => {
  return axios.get<void, BackendResponse<Author>>(`authors/${slug}`)
}
