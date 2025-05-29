import { getBookFilterApi } from '@/apis/book.api'
import { createDiscount, updateDiscount } from '@/apis/discount.api'
import Pagination from '@/components/Pagination'
import { Button } from '@/components/ui/button'
import { ApplyTo, Book, Discount, DiscountType } from '@/types'
import { formatMoney } from '@/utils'
import { debounce } from 'lodash'
import { Calendar, Eye, EyeOff, Gift, Percent, Search, Settings, ShoppingBag, Users, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Mock data for books - replace with your actual API call

const VoucherCreator = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [discount, setDiscount] = useState<Discount>(
    location.state || {
      code: '',
      name: '',
      description: '',
      value: 0,
      minOrderValue: 0,
      type: DiscountType.Percentage,
      applyTo: ApplyTo.All,
      isActive: true,
      maxUsage: 0,
      useCount: 0,
      maxUsagePerUser: 1,
      productIds: [],
      endDate: new Date(),
      id: '',
      startDate: new Date(),
      userUsage: []
    }
  )

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<Book[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [books, setBooks] = useState<Book[]>([])
  const [totalPage, setTotalPages] = useState(0)
  const handleSearchOnchange = debounce((value: string) => {
    setSearchTerm(value)
  }, 300)
  const fetchBookData = useCallback(async () => {
    const params = new URLSearchParams()

    // Xây dựng filter request
    if (searchTerm) params.append('searchString', searchTerm)
    if (currentPage) params.append('pageNumber', currentPage.toString())
    params.append('pageSize', '6') // Luôn có giá trị mặc định

    const queryParams: Record<string, string> = Object.fromEntries(params.entries())
    const response = await getBookFilterApi(queryParams)
    if (response.code === 0) {
      setBooks(response.data.items)
      setTotalPages(response.data.totalPages)
    }
  }, [currentPage, searchTerm])
  // Filter books based on search term

  // Pagination calculations
  console.log(discount)

  const handlePageChange = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1)
  }
  // Reset to first page when search changes
  useEffect(() => {
    if (location.state) {
      const { startDate, endDate, products } = location.state as Discount
      setStartDate(new Date(startDate).toISOString().slice(0, 16))
      setEndDate(new Date(endDate).toISOString().slice(0, 16))
      setSelectedProducts(products)
    }
  }, [location.state])
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])
  useEffect(() => {
    if (discount.applyTo === ApplyTo.Specific) {
      fetchBookData()
    }
  }, [currentPage, searchTerm, discount.applyTo])
  // Handle product selection
  const handleProductSelect = (book: Book) => {
    const isSelected = selectedProducts.some((p) => p.id === book.id)
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== book.id))
      setDiscount({
        ...discount,
        productIds: discount.productIds.filter((id) => id !== book.id)
      })
    } else {
      setSelectedProducts([...selectedProducts, book])
      setDiscount({
        ...discount,
        productIds: [...discount.productIds, book.id]
      })
    }
  }

  // Remove selected product
  const removeSelectedProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
    setDiscount({
      ...discount,
      productIds: discount.productIds.filter((id) => id !== productId)
    })
  }

  const handleSubmit = async () => {
    if (!discount.name || !discount.code || !startDate || !endDate) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc!')
      return
    }

    if (discount.applyTo === ApplyTo.Specific && discount.productIds.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 sản phẩm để áp dụng voucher!')
      return
    }

    const newDiscount = {
      ...discount,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userUsage: []
    }
    const res = location.state ? await updateDiscount(newDiscount) : await createDiscount(newDiscount)
    if (res.code === 0) {
      toast.success(!location.state ? 'Tạo voucher thành công!' : 'cập nhật thành công')
      navigate('/admin/voucher', { replace: true })
    } else {
      toast.error(!location.state ? 'Tạo voucher thất bại!' : 'cập nhật thất bại')
    }
    console.log('Created voucher:', newDiscount)
    alert('Tạo voucher thành công!')
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='mb-4'>
        <Button variant='ghost' onClick={() => navigate('/admin/voucher')}>
          ← Quay lại danh sách
        </Button>
      </div>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm border p-6 mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Tạo Voucher Mới</h1>
              <p className='text-gray-600 mt-1'>Tạo voucher giảm giá cho khách hàng</p>
            </div>
            <div className='flex gap-3'>
              <button
                type='button'
                onClick={() => setShowPreview(!showPreview)}
                className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
              >
                {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPreview ? 'Ẩn xem trước' : 'Xem trước'}
              </button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Form */}
          <div className='lg:col-span-2'>
            <div className='space-y-6'>
              {/* Basic Information */}
              <div className='bg-white rounded-lg shadow-sm border p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                  <Gift size={20} className='text-orange-500' />
                  Thông tin cơ bản
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Tên voucher *</label>
                    <input
                      type='text'
                      value={discount.name}
                      onChange={(e) => setDiscount({ ...discount, name: e.target.value })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                      placeholder='Nhập tên voucher'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Mã voucher *</label>
                    <input
                      type='text'
                      value={discount.code}
                      onChange={(e) => setDiscount({ ...discount, code: e.target.value.toUpperCase() })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono'
                      placeholder='VD: SAVE20'
                      required
                    />
                  </div>
                </div>

                <div className='mt-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Mô tả voucher</label>
                  <textarea
                    value={discount.description}
                    onChange={(e) => setDiscount({ ...discount, description: e.target.value })}
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                    placeholder='Mô tả chi tiết về voucher...'
                  />
                </div>
              </div>

              {/* Discount Configuration */}
              <div className='bg-white rounded-lg shadow-sm border p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                  <Percent size={20} className='text-orange-500' />
                  Cấu hình giảm giá
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Loại giảm giá *</label>
                    <select
                      value={discount.type}
                      onChange={(e) => setDiscount({ ...discount, type: e.target.value as DiscountType })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                    >
                      <option value={DiscountType.Percentage}>Phần trăm (%)</option>
                      <option value={DiscountType.FixedAmount}>Số tiền cố định (₫)</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Giá trị giảm *</label>
                    <div className='relative'>
                      <input
                        type='text'
                        value={discount.value || ''}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === '' || /^\d*\.?\d*$/.test(value)) {
                            setDiscount({ ...discount, value: value === '' ? 0 : Number(value) })
                          }
                        }}
                        className='w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                        placeholder='0'
                        required
                      />
                      <span className='absolute right-3 top-2 text-gray-500'>
                        {discount.type === DiscountType.Percentage ? '%' : '₫'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Giá trị đơn hàng tối thiểu</label>
                    <input
                      type='text'
                      value={discount.minOrderValue || ''}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '' || /^\d*$/.test(value)) {
                          setDiscount({ ...discount, minOrderValue: value === '' ? 0 : Number(value) })
                        }
                      }}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                      placeholder='0'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Áp dụng cho</label>
                    <select
                      value={discount.applyTo}
                      onChange={(e) => {
                        setDiscount({ ...discount, applyTo: e.target.value as ApplyTo })
                        if (e.target.value === ApplyTo.All) {
                          setSelectedProducts([])
                          setDiscount((prev) => ({ ...prev, productIds: [] }))
                        }
                      }}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                    >
                      <option value={ApplyTo.All}>Tất cả sản phẩm</option>
                      <option value={ApplyTo.Specific}>Sản phẩm cụ thể</option>
                    </select>
                  </div>
                </div>

                {/* Product Selection */}
                {discount.applyTo === ApplyTo.Specific && (
                  <div className='mt-4'>
                    <div className='flex items-center justify-between mb-3'>
                      <label className='block text-sm font-medium text-gray-700'>Chọn sản phẩm áp dụng</label>
                      <button
                        type='button'
                        onClick={() => setShowProductModal(true)}
                        className='flex items-center gap-2 px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm'
                      >
                        <ShoppingBag size={16} />
                        Chọn sản phẩm
                      </button>
                    </div>

                    {selectedProducts.length > 0 ? (
                      <div className='space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2'>
                        {selectedProducts.map((product) => (
                          <div key={product.id} className='flex items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                            <img
                              src={product.avatar}
                              alt={product.productName}
                              className='w-10 h-12 object-cover rounded'
                            />
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-medium text-gray-900 truncate'>{product.productName}</p>
                              {/* <p className='text-xs text-gray-500'>{product.authorName}</p> */}
                              <p className='text-xs text-orange-600 font-medium'>
                                {formatMoney(product.productPrice - (product.productPrice * product.discount) / 100)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeSelectedProduct(product.id)}
                              className='p-1 text-gray-400 hover:text-red-500'
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg'>
                        Chưa chọn sản phẩm nào
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Time Settings */}
              <div className='bg-white rounded-lg shadow-sm border p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                  <Calendar size={20} className='text-orange-500' />
                  Thời gian áp dụng
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Ngày bắt đầu *</label>
                    <input
                      type='datetime-local'
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Ngày kết thúc *</label>
                    <input
                      type='datetime-local'
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Usage Limits */}
              <div className='bg-white rounded-lg shadow-sm border p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                  <Users size={20} className='text-orange-500' />
                  Giới hạn sử dụng
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Số lượng voucher tối đa</label>
                    <input
                      type='text'
                      value={discount.maxUsage || ''}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '' || /^\d*$/.test(value)) {
                          setDiscount({ ...discount, maxUsage: value === '' ? 0 : Number(value) })
                        }
                      }}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                      placeholder='Không giới hạn'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Số lần sử dụng tối đa mỗi người
                    </label>
                    <input
                      type='text'
                      value={discount.maxUsagePerUser || ''}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '' || (/^\d+$/.test(value) && Number(value) >= 1)) {
                          setDiscount({ ...discount, maxUsagePerUser: value === '' ? 1 : Number(value) })
                        }
                      }}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                      placeholder='1'
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className='bg-white rounded-lg shadow-sm border p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                  <Settings size={20} className='text-orange-500' />
                  Trạng thái
                </h2>

                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='isActive'
                    checked={discount.isActive}
                    onChange={(e) => setDiscount({ ...discount, isActive: e.target.checked })}
                    className='w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500'
                  />
                  <label htmlFor='isActive' className='ml-2 text-sm font-medium text-gray-700'>
                    Kích hoạt voucher ngay lập tức
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={handleSubmit}
                  className='flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 font-medium transition-colors'
                >
                  {location.state ? 'Cập nhật voucher' : 'Tạo voucher'}
                </button>
                <button
                  type='button'
                  className='px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors'
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className='lg:col-span-1'>
              <div className='sticky top-6'>
                <div className='bg-white rounded-lg shadow-sm border p-6'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Xem trước voucher</h3>

                  <div className='border-2 border-dashed border-orange-200 rounded-lg p-4 bg-orange-50'>
                    <div className='text-center'>
                      <div className='bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-2'>
                        {discount.code || 'VOUCHER'}
                      </div>

                      <h4 className='font-semibold text-gray-900 mb-1'>{discount.name || 'Tên voucher'}</h4>

                      <div className='text-2xl font-bold text-orange-500 mb-2'>
                        {discount.type === DiscountType.Percentage
                          ? `${discount.value || 0}% OFF`
                          : `${formatMoney(discount.value || 0)} OFF`}
                      </div>

                      {discount.minOrderValue > 0 && (
                        <p className='text-sm text-gray-600 mb-2'>Đơn hàng từ {formatMoney(discount.minOrderValue)}</p>
                      )}

                      <p className='text-xs text-gray-500'>{discount.description || 'Mô tả voucher'}</p>

                      {startDate && endDate && (
                        <div className='mt-3 pt-3 border-t border-orange-200'>
                          <p className='text-xs text-gray-500'>
                            HSD: {new Date(startDate).toLocaleDateString('vi-VN')} -{' '}
                            {new Date(endDate).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='mt-4 space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Loại:</span>
                      <span className='font-medium'>
                        {discount.type === DiscountType.Percentage ? 'Phần trăm' : 'Số tiền cố định'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Áp dụng:</span>
                      <span className='font-medium'>
                        {discount.applyTo === ApplyTo.All ? 'Tất cả sản phẩm' : `${selectedProducts.length} sản phẩm`}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Giới hạn:</span>
                      <span className='font-medium'>
                        {discount.maxUsage ? `${discount.maxUsage} lượt` : 'Không giới hạn'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Trạng thái:</span>
                      <span className={`font-medium ${discount.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {discount.isActive ? 'Kích hoạt' : 'Tạm dừng'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Selection Modal */}
      {showProductModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden'>
            <div className='p-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-900'>Chọn sản phẩm</h3>
                <button onClick={() => setShowProductModal(false)} className='p-2 text-gray-400 hover:text-gray-600'>
                  <X size={20} />
                </button>
              </div>

              <div className='mt-4 relative'>
                <Search className='absolute left-3 top-2.5 text-gray-400' size={20} />
                <input
                  type='text'
                  placeholder='Tìm kiếm sách...'
                  defaultValue={searchTerm}
                  onChange={(e) => handleSearchOnchange(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                />
              </div>
            </div>

            <div className='p-6 overflow-y-auto max-h-96'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {books.length > 0 &&
                  books.map((book) => {
                    const isSelected = selectedProducts.some((p) => p.id === book.id)
                    return (
                      <div
                        key={book.id}
                        onClick={() => handleProductSelect(book)}
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type='checkbox'
                          checked={isSelected}
                          onChange={() => {}}
                          className='w-4 h-4 text-orange-600 rounded focus:ring-orange-500'
                        />

                        <img src={book.avatar} alt={book.productName} className='w-12 h-16 object-cover rounded' />

                        <div className='flex-1 min-w-0'>
                          <h4 className='font-medium text-gray-900 mb-1 line-clamp-2'>{book.productName}</h4>
                          <p className='text-sm text-gray-600 mb-1'>{book.authorName}</p>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm font-semibold text-orange-600'>
                              {formatMoney(book.discountPrice || book.productPrice)}
                            </span>
                            {book.discountPrice && (
                              <span className='text-xs text-gray-500 line-through'>
                                {formatMoney(book.productPrice)}
                              </span>
                            )}
                          </div>
                          <p className='text-xs text-gray-500 mt-1'>Còn lại: {book.productQuantity}</p>
                        </div>
                      </div>
                    )
                  })}
              </div>

              {books.length === 0 && <div className='text-center py-8 text-gray-500'>Không tìm thấy sản phẩm nào</div>}

              {/* Pagination */}
              {totalPage > 1 && (
                <div className='flex items-center justify-between mt-6 pt-4 border-t border-gray-200'>
                  {/* <div className='text-sm text-gray-600'>
                    Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredBooks.length)} trong
                    {filteredBooks.length} sản phẩm
                  </div> */}

                  <Pagination currentPage={currentPage} pageCount={totalPage} onPageChange={handlePageChange} />
                </div>
              )}
            </div>

            <div className='p-6 border-t border-gray-200 flex items-center justify-between'>
              <p className='text-sm text-gray-600'>Đã chọn {selectedProducts.length} sản phẩm</p>
              <div className='flex gap-3'>
                <button
                  onClick={() => setShowProductModal(false)}
                  className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
                >
                  Hủy
                </button>
                <button
                  onClick={() => setShowProductModal(false)}
                  className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600'
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoucherCreator
