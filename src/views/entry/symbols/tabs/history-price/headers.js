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
  buyCount: {
    title: 'SL Đặt Mua',
  },
  buyQuantity: {
    title: 'KL Đặt Mua',
  },
  sellCount: {
    title: 'SL Đặt Bán',
  },
  sellQuantity: {
    title: 'KL Đặt Bán',
  },
  totalVolume: {
    title: 'Tổng KL',
  },
  totalValue: {
    title: 'Tổng GT',
  },
}

export const cungcau = {
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
  },
  sellForeignQuantity: {
    title: 'Bán',
  },
  buySellForeignQuantity: {
    title: 'Mua-Bán',
    classes: (item) => {
      return item.buySellForeignQuantityClasses
    },
  },
  buyForeignValue: {
    title: 'Mua',
  },
  sellForeignValue: {
    title: 'Bán',
  },
  buySellForeignValue: {
    title: 'Mua-Bán',
    classes: (item) => {
      return item.buySellForeignValueClasses
    },
  },
}

export default { gqk, giaodich, cungcau }
