export const validateRequired = (fieldName, value, setInvalidField) => {
  console.log(value)
  if (!value.trim()) {
    setInvalidField((prev) => [
      ...prev,
      { name: fieldName, message: 'Trường này không được để trống' }
    ])
    return false
  }
  return true
}

export const validateEmail = (fieldName, value, setInvalidField) => {
  if (!/\S+@\S+\.\S+/.test(value)) {
    setInvalidField((prev) => [
      ...prev,
      { name: fieldName, message: 'Email không hợp lệ' }
    ])
    return false
  }
  return true
}

export const validatePassword = (fieldName, value, setInvalidField) => {
  if (value.length < 8) {
    setInvalidField((prev) => [
      ...prev,
      { name: fieldName, message: 'Mật khẩu phải có ít nhất 8 ký tự' }
    ])
    return false
  }
  return true
}

export const validateMinLength = (
  fieldName,
  value,
  minLength,
  setInvalidField
) => {
  if (value.length < minLength) {
    setInvalidField((prev) => [
      ...prev,
      { name: fieldName, message: `Yêu cầu tối thiểu ${minLength} ký tự` }
    ])
    return false
  }
  return true
}

export const validateNumberRequired = (fieldName, value, setInvalidField) => {
  if (value === 0) {
    setInvalidField((prev) => [
      ...prev,
      { name: fieldName, message: 'Trường này không được để trống' }
    ])
    return false
  }
  return true
}
export const validateFileRequired = (fieldName, value, setInvalidField) => {
  if (value instanceof File) {
    // Kiểm tra nếu giá trị là một file
    if (!value.name) {
      setInvalidField((prev) => [
        ...prev,
        { name: fieldName, message: 'Bạn phải chọn một tệp' }
      ])
      return false
    }
    return true
  } else {
    setInvalidField((prev) => [
      ...prev,
      { name: fieldName, message: 'Trường này không được để trống' }
    ])
    return false
  }
}
export const validateArrRequired = (fieldName, value, setInvalidField) => {
  if (Array.isArray(value)) {
    // Kiểm tra nếu giá trị là một mảng
    if (value.length === 0) {
      setInvalidField((prev) => [
        ...prev,
        { name: fieldName, message: 'Trường này không được để trống' }
      ])
      return false
    }
  }

  return true
}
