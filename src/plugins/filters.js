import { formatNumber, formatDate, formatCurrency } from '../utils/formatters'

export default {
  install(app) {
    app.config.globalProperties.$filters = {
      formatDate,
      formatNumber,
      formatCurrency,
    }
  },
}
