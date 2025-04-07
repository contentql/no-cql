import { env } from '@env'
import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: env.NEXT_PUBLIC_WEBSITE_URL,
})

export default axiosConfig
