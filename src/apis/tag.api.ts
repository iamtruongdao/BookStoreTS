import axios from '@/config/axios'
import { BackendResponse } from '@/types'
import { Tag } from '@/types'
export const getAllTagApi = () => {
  return axios.get<void, BackendResponse<Tag[]>>('tag')
}
export const getTagBySlugApi = (slug: string, pageSize: number, pageNumber: number) => {
  return axios.get<void, BackendResponse<Tag>>(`tag/slug/${slug}`, {
    params: {
      pageSize,
      pageNumber
    }
  })
}
