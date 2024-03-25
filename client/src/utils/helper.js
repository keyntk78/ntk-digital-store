import icons from './icons'
import {
  validateArrRequired,
  validateEmail,
  validateFileRequired,
  validateMinLength,
  validateNumberRequired,
  validatePassword,
  validateRequired
} from './validationRules'
export const fortmatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString().replace(/,/g, '.')

const { AiFillStar, AiOutlineStar } = icons

export const renderStarFromNumber = (number, size, color) => {
  const star = []
  for (let i = 0; i < +number; i++) {
    star.push(
      <AiFillStar key={i} color={color || 'orange'} size={size || 16} />
    )
  }
  for (let i = 5; i > +number; i--) {
    star.push(
      <AiOutlineStar key={i} color={color || 'orange'} size={size || 16} />
    )
  }

  return star
}

export function secondsToHms(d) {
  d = Number(d) / 1000
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor((d % 3600) % 60)
  return { h, m, s }
}

export const validate = (payload, validationRules, setInvalidField) => {
  let invalids = 0
  for (const fieldName in payload) {
    const value = payload[fieldName]
    const rules = validationRules[fieldName] || [] // Lấy quy tắc validate của trường hoặc mảng trống nếu không có

    for (const rule of rules) {
      // Phân tích quy tắc validate thành tên và giá trị (nếu có)
      const [ruleName, ruleValue] = rule.split(':')

      // Thực hiện kiểm tra tính hợp lệ dựa trên quy tắc
      switch (ruleName) {
        case 'require':
          if (!validateRequired(fieldName, value, setInvalidField)) {
            invalids++
          }
          break
        case 'arr_require':
          if (!validateArrRequired(fieldName, value, setInvalidField)) {
            invalids++
          }
          break
        case 'number_require':
          if (!validateNumberRequired(fieldName, value, setInvalidField)) {
            invalids++
          }
          break
        case 'file_require':
          if (!validateFileRequired(fieldName, value, setInvalidField)) {
            invalids++
          }
          break
        case 'email':
          if (!validateEmail(fieldName, value, setInvalidField)) {
            invalids++
          }
          break
        case 'password':
          if (!validatePassword(fieldName, value, setInvalidField)) {
            invalids++
          }
          break
        case 'min':
          if (
            !validateMinLength(fieldName, value, ruleValue, setInvalidField)
          ) {
            invalids++
          }
          break
        // Thêm các quy tắc kiểm tra khác nếu cần
        default:
          break
      }
    }
  }
  return invalids
}
