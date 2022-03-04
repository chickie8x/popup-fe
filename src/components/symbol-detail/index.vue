<template>
  <div class="sm:flex sm:items-start">
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
      <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
        FPT
      </DialogTitle>

      <div class="mt-2 flex">
        <div class="block">
          <div class="font-bold">CTCP FPT</div>
          <span> FPT:HSX </span>
        </div>

        <div class="block ml-auto">
          <div class="font-bold">93.40</div>
          <span class="text-green"> +0.30 / +0.32% </span>
        </div>
      </div>

      <div class="mt-2">
        <CTabs v-model="tab" :tabs="tabs" />
      </div>

      <div class="mt-4">
        <component :is="tab.component" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { DialogTitle } from '@headlessui/vue';
import CTabs from '../kits/tabs/index.vue';

import News from '../tabs/news/index.vue';
import Overal from '../tabs/overal/index.vue';
import TechnicalChart from '../tabs/technical-chart/index.vue';
import Dividend from '../tabs/dividend/index.vue';
import Finance from '../tabs/finance/index.vue';
import CompanyDetail from '../tabs/company-detail/index.vue';
import HistoryPrice from '../tabs/history-price/index.vue';
import ShareHolder from '../tabs/shareholder/index.vue';

const tabs = [
  { name: 'Tổng quan', key: 'tongquan', component: Overal },
  { name: 'Tin tức', key: 'tintuc', component: News },
  { name: 'Biểu đồ kỹ thuật', key: 'bieudokythuat', component: TechnicalChart },
  { name: 'Hồ sơ công ty', key: 'hosocongty', component: CompanyDetail },
  { name: 'Cổ đông', key: 'codong', component: ShareHolder },
  { name: 'Cổ tức', key: 'cotuc', component: Dividend },
  { name: 'Tài chính', key: 'taichinh', component: Finance },
  { name: 'Giá quá khứ', key: 'giaquakhu', component: HistoryPrice },
];



export default {
  components: {
    CTabs,
    DialogTitle,
    TechnicalChart,
  },

  setup() {
    // const http = inject('axios')
    const tab = ref(tabs[0]);
    // http.get('/api/symbols/FPT/profile')
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    return {
      tab,
      tabs,
    };
  },
};
</script>
