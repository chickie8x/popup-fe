import {
  formatNumber,
  formatDate,
  formatCurrency,
  formatDateAtTime,
} from '../utils/formatters'

export default {
  install(app) {
    app.config.globalProperties.$filters = {
      formatDate,
      formatNumber,
      formatCurrency,
      formatDateAtTime,
    }
  },
}
