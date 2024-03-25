import path from './path'
import icons from './icons'

const {
  AiOutlineDashboard,
  RxComponent2,
  IoIosArrowForward,
  CiShop,
  IoSettingsOutline
} = icons

export const navigation = [
  {
    id: 1,
    value: 'TRANG CHỦ',
    path: `/${path.HOME}`
  },
  {
    id: 2,
    value: 'SẢN PHẨM',
    path: `/${path.PRODUCTS}`
  },
  {
    id: 3,
    value: 'TIN CÔNG NGHỆ',
    path: `/${path.BLOGS}`
  }
]

export const tabSellerHome = [
  { id: 1, name: 'Bán chạy' },
  { id: 2, name: 'Mới nhất' }
]

export const sidebarAdmin = [
  {
    id: 1,
    value: 'Trang chủ',
    path: `/${path.ADMIN}`,
    icon: <AiOutlineDashboard className='h-5 w-5' />
  },
  {
    id: 2,
    value: 'Cửa hàng',
    path: '',
    icon: <CiShop className='h-5 w-5' />,
    child: [
      {
        id: 3,
        value: 'Sản phẩm',
        path: `/${path.ADMIN}/${path.ADMIN_PRODUCTS}`,
        icon: <IoIosArrowForward />,
        breadcrumb: [
          { name: 'Trang chủ', path: `/${path.ADMIN}` },
          { name: 'Sản phẩm' }
        ]
      },
      {
        id: 4,
        value: 'Loại sản phẩm',
        path: `/${path.ADMIN}/${path.ADMIN_CATE}`,
        icon: <IoIosArrowForward />,
        breadcrumb: [
          { name: 'Trang chủ', path: `/${path.ADMIN}` },
          { name: 'Loại sản phẩm' }
        ]
      },
      {
        id: 11,
        value: 'Thương hiệu',
        path: `/${path.ADMIN}/${path.ADMIN_BRAND}`,
        icon: <IoIosArrowForward />,
        breadcrumb: [
          { name: 'Trang chủ', path: `/${path.ADMIN}` },
          { name: 'Thương hiệu' }
        ]
      }
    ]
  },
  {
    id: 5,
    value: 'Hệ thống',
    path: '',
    icon: <IoSettingsOutline className='h-5 w-5' />,
    child: [
      {
        id: 6,
        value: 'Người dùng',
        path: `/${path.ADMIN}/${path.ADMIN_USERS}`,
        icon: <IoIosArrowForward />,
        breadcrumbTitile: 'Danh sách người dùng',
        breadcrumb: [
          { name: 'Trang chủ', path: `/${path.ADMIN}` },
          { name: 'Người dùng' }
        ]
      }
    ]
  },
  {
    id: 7,
    value: 'Components',
    path: '',
    icon: <RxComponent2 className='h-5 w-5' />,
    child: [
      {
        id: 8,
        value: 'Buttons',
        path: `/${path.ADMIN}/${path.ADMIN_BUTOTONS}`,
        icon: <IoIosArrowForward />,
        breadcrumbTitile: 'Danh sách người dùng',
        breadcrumb: [
          { name: 'Trang chủ', path: `/${path.ADMIN_BUTOTONS}` },
          { name: 'Buttons' }
        ]
      },
      {
        id: 9,
        value: 'TextFileds',
        path: `/${path.ADMIN}/${path.ADMIN_TEXTFILEDS}`,
        icon: <IoIosArrowForward />,
        breadcrumbTitile: 'Danh sách người dùng',
        breadcrumb: [
          { name: 'Trang chủ', path: `/${path.ADMIN_TEXTFILEDS}` },
          { name: 'TextFiles' }
        ]
      },
      {
        id: 10,
        value: 'Autocomplete',
        path: `/${path.ADMIN}/${path.ADMIN_AUTOCOMPLETEIS}`,
        icon: <IoIosArrowForward />,
        breadcrumbTitile: 'Danh sách người dùng',
        breadcrumb: [
          { name: 'Trang chủ', path: `/${path.V}` },
          { name: 'Selects' }
        ]
      },
      {
        id: 12,
        value: 'Checkbox',
        path: `/${path.ADMIN}/${path.ADMIN_CHECKBOX}`,
        icon: <IoIosArrowForward />,
        breadcrumbTitile: 'Danh sách người dùng',
        breadcrumb: [
          { name: 'Trang chủ', path: `/${path.V}` },
          { name: 'Checkbox' }
        ]
      }
    ]
  }
]
