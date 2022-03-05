import News from './tabs/news/index.vue'
import Overal from './tabs/overal/index.vue'
import TechnicalChart from './tabs/technical-chart/index.vue'
import Dividend from './tabs/dividend/index.vue'
import Finance from './tabs/finance/index.vue'
import CompanyDetail from './tabs/company-detail/index.vue'
import HistoryPrice from './tabs/history-price/index.vue'
import ShareHolder from './tabs/shareholder/index.vue'

export default [
  { name: 'Tổng quan', key: 'tongquan', component: Overal },
  { name: 'Tin tức', key: 'tintuc', component: News },
  { name: 'Biểu đồ kỹ thuật', key: 'bieudokythuat', component: TechnicalChart },
  { name: 'Hồ sơ công ty', key: 'hosocongty', component: CompanyDetail },
  { name: 'Cổ đông', key: 'codong', component: ShareHolder },
  { name: 'Cổ tức', key: 'cotuc', component: Dividend },
  { name: 'Tài chính', key: 'taichinh', component: Finance },
  { name: 'Giá quá khứ', key: 'giaquakhu', component: HistoryPrice },
]
