import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default axios
