import type { AccountOrderBook } from "@/features/account/accountType";
import type { OrderBook } from "@/features/order-book/orderBookType";
import type { OrderDetail } from "@/features/order/orderType";

export const mapOrderDetail = (order: OrderBook | AccountOrderBook): OrderDetail => {
  return {
    pkFrontOrder: order.pkFrontOrder,
    side: order.side,
    orderNo: order.orderNo,
    shareCode: order.shareCode,
    orderShowPrice: order.orderShowPrice,
    orderVolume: order.orderVolume,
    accountCode: order.accountCode,
    orderTime: order.orderTime,
    marketingId: (order as OrderBook).marketingId,
    chanel: order.chanel,
    rejectText: order.rejectText,
  };
}

