<template>
  <div v-if="post" class="flex flex-col">
    <div class="sm:flex sm:items-start sticky top-0">
      <div
        class="text-center sm:text-left w-full bg-white rounded-t-md border-b-gray-100"
      >
        <div class="flex px-5 py-2">
          <NavRouter />
          <DialogTitle
            as="h3"
            class="text-lg leading-6 font-medium text-gray-900 flex text-center my-auto ml-4"
            >Chi tiết</DialogTitle
          >
        </div>
      </div>
    </div>

    <div class="w-full h-full bg-blue-50/[0.8] p-5">
      <div class="flex border-b border-gray-300">
        <div class="flex items-center w-full space-x-2 pb-2">
          <Likes :fill="iconColor" />
          <span class="text-[#106ba3] text-sm"
            >Mickey và 1 người khác đã thích</span
          >
        </div>
        <div class="m-1">
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-[#106ba3] hover:bg-[#0b517c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b517c]"
          >
            <Likes :fill="btnColor" class="mr-1" />
            Thích
          </button>
        </div>
      </div>
      <div class="text-3xl font-semibold py-3">{{ post[0].title }}</div>
      <div class="flex items-center justify-between pb-3">
        <div class="flex text-gray-500 text-sm divide-x space-x-2">
          <div>{{ post[0].postSource.name }}</div>
          <div class="text-sm text-gray-500">
            {{ new Date(post[0].date).toLocaleDateString() }} lúc
            {{ new Date(post[0].date).toLocaleTimeString() }}
          </div>
        </div>
        <div class="space-x-1">
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#106ba3] hover:bg-[#0b517c]/[0.2] focus:outline-none"
          >
            <Share :fill="iconColor" />
            Chia sẻ
          </button>

          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#106ba3] hover:bg-[#0b517c]/[0.2] focus:outline-none"
          >
            <Repost :fill="iconColor" />
            Đăng lại
          </button>

          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#106ba3] hover:bg-[#0b517c]/[0.2] focus:outline-none"
          >
            <Replies :fill="iconColor" class="mr-1" />
            Bình luận
          </button>
        </div>
      </div>
      <div class="h-full overflow-auto">
        <div v-html="post[0].content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavRouter from '../../../kits/nav-router/index.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Likes from '../../../svg/likes.vue'
import Share from '../../../svg/share.vue'
import Replies from '../../../svg/replies.vue'
import Repost from '../../../svg/repost.vue'

export default {
  components: {
    NavRouter,
    Likes,
    Share,
    Replies,
    Repost,
  },
  setup() {
    // data
    const route = useRoute()
    const post = ref(null)
    const postID = route.params.id
    const iconColor = ref('#106ba3')
    const btnColor = ref('white')

    // methods
    const fetchPost = async () => {
      post.value = await (await axios.get(`/news/${postID}/`)).data
    }
    onMounted(() => {
      fetchPost()
    })

    return {
      post,
      iconColor,
      btnColor,
    }
  },
}
</script>

<style></style>
