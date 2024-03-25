import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    config.headers['x-api-key'] =
      'dc201978ab8f673266fc131828c074cd8e38c0725dd6c45f583ec5eb994eb52987cb3993a32b8277444489ff2b1a50f4b4b9b645575c3e173a663376524077b4'

    config.headers['Accept-Language'] = 'vi'

    if (config.isFormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }

    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    console.error('Response error:', error)
    // For example, show an error message to the user
    // alert('Response error: ' + error.message);
    // Or perform another action based on the error
    // ...
    // Return an empty object or any other value to continue the Promise chain without rejection
    return {}
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    return error.response.data
  }
)

export default instance
