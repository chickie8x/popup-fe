import { formatDate, fixedTwo, formatNumberComma } from '@/utils/formatters'

export const gqk = {
  date: {
    title: 'Ngày',
    valueFn: (item) => {
      return formatDate(item.date)
    },
  },
  change: {
    title: 'Thay đổi',
    classes: (item) => {
      return item.change >= 0 ? 'text-green-500' : 'text-red-500'
    },
    formater: fixedTwo,
  },
  percent: {
    title: '%',
    classes: (item) => {
      return item.percent >= 0 ? 'text-green-500' : 'text-red-500'
    },
    formater: fixedTwo,
  },
  priceOpen: {
    title: 'Mở',
    classes: (item) => {
      return item.priceOpenClasses
    },
    formater: fixedTwo,
  },
  priceHigh: {
    title: 'Cao',
    formater: fixedTwo,
    classes: (item) => {
      return item.priceHighClasses
    },
  },
  priceLow: {
    title: 'Thấp',
    classes: (item) => {
      return item.priceLowClasses
    },
    formater: fixedTwo,
  },
  priceClose: {
    title: 'Đóng',
    classes: (item) => {
      return item.priceClose - item.priceOpen >= 0
        ? 'text-green-500'
        : 'text-red-500'
    },
    formater: fixedTwo,
  },
  totalVolume: {
    title: 'Tổng KL',
    formater: formatNumberComma,
  },
  totalValue: {
    title: 'Tổng GT',
    valueFn: (item) => parseInt(item.dealVolume * item.priceAverage),
    formater: formatNumberComma,
  },
}

export const giaodich = {
  date: {
    title: 'Ngày',
    valueFn: (item) => {
      return formatDate(item.date)
    },
  },
  currentForeignRoom: {
    title: 'Room NN',
  },
  buyForeignQuantity: {
    title: 'Mua',
    formater: formatNumberComma,
  },
  sellForeignQuantity: {
    title: 'Bán',
    formater: formatNumberComma,
  },
  buySellForeignQuantity: {
    title: 'Mua-Bán',
    classes: (item) => {
      return item.buyForeignQuantity - item.sellForeignQuantity >= 0
        ? 'text-green-500'
        : 'text-red-500'
    },
    valueFn: (item) => {
      return formatNumberComma(
        item.buyForeignQuantity - item.sellForeignQuantity,
      )
    },
  },
  buyForeignValue: {
    title: 'Mua',
    valueFn: (item) => {
      return parseInt(item.buyForeignValue / 1000)
    },
    formater: formatNumberComma,
  },
  sellForeignValue: {
    title: 'Bán',
    valueFn: (item) => {
      return parseInt(item.sellForeignValue / 1000)
    },
    formater: formatNumberComma,
  },
  buySellForeignValue: {
    title: 'Mua-Bán',
    valueFn: (item) => {
      return formatNumberComma(
        parseInt((item.buyForeignValue - item.sellForeignValue) / 1000),
      )
    },
    classes: (item) => {
      return item.buyForeignValue - item.sellForeignValue >= 0
        ? 'text-green-500'
        : 'text-red-500'
    },
  },
}

export const cungcau = {
  date: {
    title: 'Ngày',
    valueFn: (item) => {
      return formatDate(item.date)
    },
  },
  buyCount: {
    title: 'SL Đặt Mua',
    formater: formatNumberComma,
  },
  buyQuantity: {
    title: 'KL Đặt Mua',
    formater: formatNumberComma,
  },
  sellCount: {
    title: 'SL Đặt Bán',
    formater: formatNumberComma,
  },
  sellQuantity: {
    title: 'KL Đặt Bán',
    formater: formatNumberComma,
  },
  totalVolume: {
    title: 'Tổng KL',
    formater: formatNumberComma,
  },
  totalValue: {
    title: 'Tổng GT',
    valueFn: (item) => {
      return parseInt(item.totalValue / 1000)
    },
    formater: formatNumberComma,
  },
}

export default { gqk, giaodich, cungcau }
