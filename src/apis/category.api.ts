import axios from '@/config/axios'
import { BackendResponse, Category } from '@/types'
export const getCategoryApi = () => {
  return axios.get<void, BackendResponse<Category[]>>('categories')
}

export const getCategoryBySlugApi = (slug: string) => {
  return axios.get<void, BackendResponse<Category>>(`categories/${slug}`)
}
