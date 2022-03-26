const locale = 'vi'

export const formatDate = (date) => {
  const _d = new Date(date)
  return Intl.DateTimeFormat(locale, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(_d)
}

export const formatNumber = (num) => {
  const _n = Number(num)
  return Intl.NumberFormat(locale).format(_n)
}

export const formatCurrency = (num) => {
  const _n = Number(num)
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'VND',
  }).format(_n)
}

export const formatDateAtTime = (date) => {
  const _date = new Date(date)
  return `${_date.toLocaleDateString()} lúc ${_date.toLocaleTimeString()}`
}
