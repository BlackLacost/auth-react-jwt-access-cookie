import { useQuery } from 'react-query'
import { fetchApi } from '../../fetchApi'

export const useProducts = () => {
  return useQuery('products', async () => {
    const res = await fetchApi.get('products')
    return res.data
  })
}
