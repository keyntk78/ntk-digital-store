import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Login,
  Home,
  Public,
  Products,
  DetailProduct,
  Blogs,
  FinalRegister
} from './pages/public'
import path from './utils/path'
import { getCategories } from './store/app/asyncAction'
import { useDispatch } from 'react-redux'
import {
  BrandAdmin,
  Dashboard,
  LayoutAdmin,
  PageButtons,
  PageCheckBox,
  PageTextFiled,
  ProductAdmin,
  ProductCategoryAdmin,
  UserAdmin
} from './pages/admin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datetime/css/react-datetime.css'
import PageAutocomplete from './pages/admin/ui/PageAutocomplete'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div className='min-h-screen'>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.PRODUCTS} element={<Products />} />
            <Route path={path.BLOGS} element={<Blogs />} />
            <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
          </Route>
          <Route path={path.ADMIN} element={<LayoutAdmin />}>
            <Route path={path.ADMIN_DASHBOARD} element={<Dashboard />} />
            <Route path={path.ADMIN_PRODUCTS} element={<ProductAdmin />} />
            <Route path={path.ADMIN_USERS} element={<UserAdmin />} />
            <Route path={path.ADMIN_BRAND} element={<BrandAdmin />} />
            <Route path={path.ADMIN_CATE} element={<ProductCategoryAdmin />} />
            <Route path={path.ADMIN_BUTOTONS} element={<PageButtons />} />
            <Route path={path.ADMIN_TEXTFILEDS} element={<PageTextFiled />} />
            <Route path={path.ADMIN_CHECKBOX} element={<PageCheckBox />} />

            <Route
              path={path.ADMIN_AUTOCOMPLETEIS}
              element={<PageAutocomplete />}
            />
          </Route>
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
          <Route path={path.LOGIN} element={<Login />}></Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
