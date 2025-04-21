import axios from '@/config/axios'
import { BackendResponse, Post } from '@/types'
export const getPostBySlugApi = (slug: string) => {
  return axios.get<void, BackendResponse<Post>>(`post/get-by-slug/${slug}`)
}
