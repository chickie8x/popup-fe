import axios from 'axios'

axios.defaults.baseURL = 'http://112.213.94.77:1995'
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default axios
