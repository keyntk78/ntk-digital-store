import React, { memo, useEffect, useState } from 'react'
import icons from '../../../utils/icons'
import { apiGetProducts } from '../../../apis/product'
import { secondsToHms } from '../../../utils/helper'
import { Countdown, ButtonXL, ProductCardInfo } from '../index'
import moment from 'moment'
const { AiFillStar, FaBars } = icons
let idInterval

const SectionDealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [exprireTime, setExprireTime] = useState(false)
  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 5) + 1,
      totalRating: 5
    })
    if (response.success) {
      setDealDaily(response.metadata.data[0])
      const today = `${moment().format('MM/DD/YYYY')} 5:00:00`
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
      const number = secondsToHms(seconds)
      setHour(number.h)
      setMinute(number.m)
      setSecond(number.s)
    } else {
      setHour(0)
      setMinute(59)
      setSecond(59)
    }
  }

  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchDealDaily()
  }, [exprireTime])

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1)
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1)
          setSecond(59)
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1)
            setMinute(59)
            setSecond(59)
          } else {
            setExprireTime(!exprireTime)
          }
        }
      }
    }, 1000)

    return () => {
      clearInterval(idInterval)
    }
  }, [second, minute, hour, exprireTime])

  return (
    <div className='border w-full flex-auto p-5'>
      <div className='flex justify-between items-center'>
        <span className='flex-1'>
          <AiFillStar size={20} color='orange' />
        </span>
        <span className='flex-2 text-[20px] text-center font-semibold uppercase'>
          Ưu đãi hằng ngày
        </span>
        <span className='flex-1'></span>
      </div>
      <div className='w-full flex flex-col items-center pt-3'>
        <img
          src={
            dealDaily?.thumb ||
            'https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg'
          }
          alt={dealDaily?.slug}
          className='w-full object-contain'
        />

        <ProductCardInfo
          clsArea={'mt-4 items-center'}
          title={dealDaily?.title}
          totalRating={dealDaily?.totalRating}
          price={dealDaily?.price}
          sizeIcon={20}
        />
      </div>
      <div className='flex items-center justify-center gap-2 mt-4'>
        <Countdown value={hour} measure={'Giờ'} />
        <Countdown value={minute} measure={'Phút'} />
        <Countdown value={second} measure={'Giây'} />
      </div>
      <div>
        <ButtonXL icon={<FaBars />} title={'Xem chi tiết'} />
      </div>
    </div>
  )
}

export default memo(SectionDealDaily)
