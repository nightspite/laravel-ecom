export const formatMoney = (amount?: number) => {
  if (!amount || amount < 0) {
    return '$ -'
  }

  return `$${amount?.toFixed(2)}`
}