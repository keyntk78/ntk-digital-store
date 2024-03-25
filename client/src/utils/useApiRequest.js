import { useDispatch } from 'react-redux'
import { setLoading } from '../store/appAdmin/appAdminSlice'

const useApiRequest = () => {
  const dispatch = useDispatch()

  const makeRequest = async (apiFunction, ...args) => {
    dispatch(setLoading(true)) // Bật trạng thái loading

    try {
      const responseData = await apiFunction(...args)
      return responseData // Trả về dữ liệu nếu request thành công
    } catch (error) {
      throw error // Ném lỗi nếu có lỗi xảy ra
    } finally {
      dispatch(setLoading(false)) // Tắt trạng thái loading sau khi request hoàn thành
    }
  }

  return makeRequest
}

export default useApiRequest
