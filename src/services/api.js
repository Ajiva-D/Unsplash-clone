import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: `Client-ID zhvE8PwxKv0bxBt4j51R2jtRsMq4LtHzPasnPKkUteM`,
  },
})