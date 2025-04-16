import axios from '@/config/axios'
import { BackendResponse, Book, Paginate } from '@/types'
export const getBookApi = (slug?: string) => {
  return axios.get<void, BackendResponse<Book>>(`products/${slug}`)
}
export const getBookByAuthorApi = (author: string) => {
  return axios.get<void, BackendResponse<Book>>(`products/get-by-author/${author}`)
}
export const getBookFilterApi = (params: Record<string, string>) => {
  return axios.get<void, BackendResponse<Paginate<Book>>>(`products/paginate`, {
    params
  })
}
