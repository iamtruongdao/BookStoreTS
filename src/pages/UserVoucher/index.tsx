import { deleteVoucher, getVoucherSave } from '@/apis/userDiscount.api'
import Pagination from '@/components/Pagination'
import { ApplyTo, Discount, DiscountType, UserDiscount } from '@/types'
import { formatMoney } from '@/utils'
import { Calendar, Gift, ShoppingCart, Tag, Trash2, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// Các enums và helper functions cần thiết

// Cấu trúc dữ liệu cho voucher

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}

const isExpired = (endDate: Date) => {
  return new Date(endDate) < new Date()
}

const isComingSoon = (startDate: Date) => {
  return new Date(startDate) > new Date()
}

const getDiscountText = (discount: Discount) => {
  if (discount.type === DiscountType.Percentage) {
    return `Giảm ${discount.value}%`
  } else {
    return `Giảm ${formatMoney(discount.value)}`
  }
}

const getUsagePercentage = (useCount: number, maxUsage: number) => {
  return Math.round((useCount / maxUsage) * 100)
}

export default function UserVouchers() {
  // Sample data - normally this would come from your backend
  const [savedDiscounts, setSavedDiscounts] = useState<UserDiscount[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const handlePageChange = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1)
  }
  const getListVoucherSave = async () => {
    const res = await getVoucherSave({ pageNumber: currentPage, pageSize: 10 })
    if (res.code === 0) {
      setTotalPage(res.data.totalPages)
      setSavedDiscounts(res.data.items)
    }
  }
  const handleDelete = async (id: string) => {
    const res = await deleteVoucher(id)
    if (res.code === 0) {
      toast.success('xóa thành công')
      getListVoucherSave()
    }
  }
  useEffect(() => {
    getListVoucherSave()
  }, [currentPage])
  // Handle removing a voucher

  return (
    <div className='max-w-6xl mx-auto px-4 py-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Voucher đã lưu</h1>

      {/* Voucher grid - 2 columns */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {savedDiscounts.length > 0 &&
          savedDiscounts.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-sm border transition-all hover:shadow-md ${
                isExpired(item.discount.endDate) ? 'opacity-60' : ''
              } ${isComingSoon(item.discount.startDate) ? 'border-blue-200' : ''}`}
            >
              <div className='p-4'>
                <div className='flex items-start justify-between'>
                  {/* Left side - Discount info */}
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold'>
                        {getDiscountText(item.discount)}
                      </div>
                      {item.discount.applyTo === ApplyTo.Specific && (
                        <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'>Sản phẩm chỉ định</span>
                      )}
                      {isComingSoon(item.discount.startDate) && (
                        <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'>Sắp diễn ra</span>
                      )}
                      {isExpired(item.discount.endDate) && (
                        <span className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs'>Đã hết hạn</span>
                      )}
                    </div>

                    <h3 className='font-semibold text-gray-800 mb-1'>{item.discount.name}</h3>
                    <p className='text-gray-600 text-sm mb-3'>{item.discount.description}</p>

                    {/* Conditions */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs text-gray-500'>
                      <div className='flex items-center gap-1'>
                        <ShoppingCart className='w-3 h-3' />
                        <span>Đơn tối thiểu: {formatMoney(item.discount.minOrderValue)}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-3 h-3' />
                        <span>HSD: {formatDate(item.discount.endDate.toString())}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Users className='w-3 h-3' />
                        <span>Tối đa {item.discount.maxUsagePerUser} lần/người</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Tag className='w-3 h-3' />
                        <span>
                          Còn {item.discount.maxUsage - item.discount.useCount}/{item.discount.maxUsage}
                        </span>
                      </div>
                    </div>

                    {/* Usage progress */}
                    <div className='mt-3'>
                      <div className='flex justify-between text-xs text-gray-500 mb-1'>
                        <span>Đã dùng</span>
                        <span>{getUsagePercentage(item.discount.useCount, item.discount.maxUsage)}%</span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-1.5'>
                        <div
                          className='bg-gradient-to-r from-orange-500 to-pink-500 h-1.5 rounded-full transition-all'
                          style={{
                            width: `${getUsagePercentage(item.discount.useCount, item.discount.maxUsage)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Coupon code and remove button */}
                  <div className='ml-4 flex flex-col items-end'>
                    <div className='bg-orange-50 border-2 border-dashed border-orange-300 rounded-lg p-3 min-w-24'>
                      <div className='text-center'>
                        <div className='text-xs text-gray-500 mb-1'>Mã giảm giá</div>
                        <div className='font-mono font-bold text-orange-600 text-sm'>{item.discount.code}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className='mt-3 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 active:scale-95'
                    >
                      <Trash2 className='w-4 h-4' />
                      Xóa voucher
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {savedDiscounts.length > 0 && (
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} pageCount={totalPage} />
      )}
      {/* Empty state */}
      {savedDiscounts.length === 0 && (
        <div className='text-center py-12 bg-white rounded-lg shadow-sm'>
          <div className='text-gray-400 mb-4'>
            <Gift className='w-16 h-16 mx-auto' />
          </div>
          <h3 className='text-lg font-medium text-gray-700 mb-2'>Không có voucher nào</h3>
          <p className='text-gray-600'>Bạn chưa lưu voucher nào. Hãy khám phá các ưu đãi và lưu lại để sử dụng sau!</p>
          <button className='mt-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all'>
            Khám phá voucher
          </button>
        </div>
      )}
    </div>
  )
}
