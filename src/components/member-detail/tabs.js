import Profile from './tabs/profile/index.vue'
import Transaction from './tabs/transaction/index.vue'
import News from './tabs/news/index.vue'

export default [
  { name: 'Hồ sơ', key: 'hoso', component: Profile },
  { name: 'Giao dịch', key: 'giaodich', component: Transaction },
  { name: 'Tin tức', key: 'tintuc', component: News },
]
