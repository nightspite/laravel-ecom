import { Cart, Order } from "@/types"

export const formatMoney = (amount?: number) => {
  if (!amount || amount < 0) {
    return '$ -'
  }

  return `$${amount?.toFixed(2)}`
}

export const sumOrderTotal = (order: Order) => {
  return order.order_product.reduce((acc, item) => {
    return acc + item.product.price * item.quantity
  }, 0)
}

export const sumCartTotal = (cart: Cart) => {
  return cart.cart_product.reduce((acc, item) => {
    return acc + item.product.price * item.quantity
  }, 0)
}