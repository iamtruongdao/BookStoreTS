export const formatMoney = (amount?: number) => {
  return Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount || 0)
}
export function formatDateStringToVietnamese(dateString: string) {
  // Tạo đối tượng Date từ chuỗi ISO
  const date = new Date(dateString)

  // Mảng tên các thứ trong tuần bằng tiếng Việt
  const weekdaysVN = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

  // Lấy tên thứ trong tuần
  const weekday = weekdaysVN[date.getDay()]

  // Format ngày tháng theo dạng dd/MM/yyyy
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  // Kết hợp thành chuỗi định dạng cuối cùng
  return `${weekday}, ${day}/${month}/${year}`
}

// Sử dụng với chuỗi ngày ISO
const isoDateString = '2025-04-17T14:56:38.629Z'
console.log(formatDateStringToVietnamese(isoDateString))
// Kết quả: "Thứ Năm, 17/04/2025"
