import { TraderID } from "@/configs"

/**
 * Kiểm tra có được phép xác nhận lệnh thỏa thuận hay không  dựa trên các tham số đầu vào
 * Hàm này đảm bảo chỉ được xác nhận lệnh khi có trạng thái P và là lệnh đối ứng
 *
 * @param status - Trạng thái lệnh
 * @param traderF1 - Trader lệnh F1
 * @param accountF1 - tài khoản lệnh F1
 * @param quote - Trạng thái lệnh
 * @returns true/false
 */

const canConfirmPutthroughOrder = (status: string, traderF1: string, accountF1: string, quote: string) => {
  if (status !== 'P') return false
  if (
    TraderID === traderF1 &&
    (!accountF1 || quote === 'C')
  ) return false

  return true
}

/**
 * Kiểm tra có được phép hủy lệnh thỏa thuận hay không  dựa trên các tham số đầu vào
 * Hàm này đảm bảo chỉ được hủy lệnh khi có trạng thái P và không phải lệnh đối ứng
 *
 * @param status - Trạng thái lệnh
 * @param traderF1 - Trader lệnh F1
 * @param accountF1 - tài khoản lệnh F1
 * @param quote - Trạng thái lệnh
 * @returns true/false
 */


const canCancelPutthroughOrder = (status: string, traderF1: string, accountF1: string, accountF2: string, quote: string) => {
  if (status !== 'P') return false
  if (
    TraderID === traderF1 &&
    (!accountF1 || quote === 'C')
  ) return false
  if (accountF2) return false

  return true
}

const canRejectPutthroughOrder = (status: string, traderF1: string, accountF1: string, quote: string) => {
  if (status !== 'P') return false
}
