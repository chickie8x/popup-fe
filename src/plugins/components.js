import TButton from '../components/kits/t-button/index.vue'
import TButtons from '../components/kits/t-buttons/index.vue'
import NavRouter from '../components/kits/nav-router/index.vue'
import CTabs from '../components/kits/tabs/index.vue'
import CTable from '../components/kits/table/index.vue'

import LikeIcon from '@/components/kits/svg/likes.vue'
import ReplyIcon from '../components/kits/svg/reply.vue'
import ChevronUpIcon from '../components/kits/svg/chevron-up.vue'
import RepostIcon from '../components/kits/svg/repost.vue'
import ShareIcon from '../components/kits/svg/share.vue'

import { DialogTitle } from '@headlessui/vue'

import InfiniteLoading from 'vue-infinite-loading'
import Vue2 from 'vue2'
import * as Vue3 from 'vue'
import toVue3 from 'vue-2-3/to-vue-3'
toVue3.register(Vue2, Vue3)

export default {
  install(app) {
    app.component('DialogTitle', DialogTitle)
    app.component('CTabs', CTabs)
    app.component('CTable', CTable)
    app.component('TButton', TButton)
    app.component('TButtons', TButtons)
    app.component('NavRouter', NavRouter)

    // Icons
    app.component('LikeIcon', LikeIcon)
    app.component('ShareIcon', ShareIcon)
    app.component('ReplyIcon', ReplyIcon)
    app.component('RepostIcon', RepostIcon)
    app.component('ChevronUpIcon', ChevronUpIcon)

    // Misc
    app.component('InfiniteLoading', toVue3(InfiniteLoading))
  },
}
