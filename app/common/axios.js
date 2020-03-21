import axios from 'axios'
const instance = axios.create({})

instance.interceptors.response.use(
  function(response) {
    const result = response.data
    if (!result) {
      // todo
    }
    return result.data
  },
  function(error) {
    // todo
    console.log(error)
  },
)

export default instance
