import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getCategoryAction } from '@/redux/slice/categorySlice'
import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Nav = () => {
  const { categories } = useAppSelector((state) => state.category)
  const dispatch = useAppDispatch()
  const fetchCategories = async () => {
    dispatch(getCategoryAction())
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <NavigationMenu className='hidden md:flex' viewport={false}>
      <NavigationMenuList className='gap-3 cursor-pointer'>
        <NavigationMenuItem>
          <NavLink
            to={'/'}
            className={({ isActive }) => (isActive ? 'text-green-600 border-b-2 border-blue-600' : 'text-gray-700')}
          >
            <NavigationMenuLink className=' text-base  font-medium '>Trang chủ</NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className='text-gray-800 text-base cursor-pointer'>Tin Sách</NavigationMenuTrigger>
          <NavigationMenuContent className='border-none p-0 top-[57px] '>
            <div className='w-48'>
              <ul className='bg-[#fff]'>
                <li>
                  <Link to={'/'} className='block hover:text-green-600 w-full  p-2 border-b border-b-[#ddd]'>
                    Tin tức mới
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className='block hover:text-green-600 p-2 border-b border-b-[#ddd]'>
                    Tin tức mới
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className='block hover:text-green-600 !p-2 border-b border-b-[#ddd]'>
                    Tin tức mới
                  </Link>
                </li>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className='group relative'>
          <NavigationMenuTrigger className='text-gray-800 cursor-pointer text-base'>Sách Nhã Nam</NavigationMenuTrigger>
          <NavigationMenuContent className='left-[-220px] border-none p-0 !top-[40px] w-full'>
            {/* Dropdown Panel */}
            <div className='z-10 bg-white shadow-lg w-full min-w-[980px] '>
              <div className='grid grid-cols-4 gap-x-4 p-6'>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <Link to={`/category/${category.slug}`} className='text-gray-800 p-2  hover:text-green-400'>
                      {category.name}
                    </Link>
                  ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink
            to={'/author'}
            className={({ isActive }) => (isActive ? 'text-green-600 border-b-2 border-blue-600' : 'text-gray-700')}
          >
            <NavigationMenuLink className=' text-base '>Tác giả</NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink
            to={'/cuocthi'}
            className={({ isActive }) => (isActive ? 'text-green-600 border-b-2 border-blue-600' : 'text-gray-700')}
          >
            <NavigationMenuTrigger className=' text-base cursor-pointer'>Cuộc Thi</NavigationMenuTrigger>
          </NavLink>
          <NavigationMenuContent className='border-none p-0 bg-white !top-[50px] '>
            <div className='p-4 w-48 shadow-lg'>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='block !p-2 hover:text-green-600'>
                    Cuộc thi hiện tại
                  </a>
                </li>
                <li>
                  <a href='#' className='block !p-2 hover:text-green-600'>
                    Cuộc thi đã kết thúc
                  </a>
                </li>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink
            to={'/venhanam'}
            className={({ isActive }) => (isActive ? 'text-green-600 border-b-2 border-blue-600' : 'text-gray-700')}
          >
            <NavigationMenuLink className='text-gray-800  text-base'>Về Nhã Nam</NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className='text-gray-800 text-base cursor-pointer'>Liên hệ</NavigationMenuTrigger>
          <NavigationMenuContent className='!top-[50px] p-0 bg-white border-none'>
            <div className='p-4 w-48'>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='block  hover:text-green-600'>
                    Thông tin liên hệ
                  </a>
                </li>
                <li>
                  <a href='#' className='block hover:text-green-600'>
                    Hỗ trợ
                  </a>
                </li>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Nav
