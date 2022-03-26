<template>
  <div v-if="post" class="flex flex-col overflow-y-scroll h-full">
    <div class="sm:flex sm:items-start sticky top-0">
      <div
        class="text-center sm:text-left w-full bg-white rounded-t-md border-b-gray-100"
      >
        <div class="flex mb-2">
          <NavRouter />
          <DialogTitle
            as="h3"
            class="text-lg leading-6 font-medium text-gray-900 flex text-center my-auto ml-4"
          >
            Chi tiết
          </DialogTitle>
        </div>
      </div>
    </div>

    <div class="w-full h-full p-5">
      <div class="text-3xl font-semibold py-3">{{ post.title }}</div>
      <div class="flex items-center justify-between pb-3">
        <div class="flex text-gray-500 text-sm divide-x space-x-2">
          <div>{{ post.postSource.name }}</div>
          <div class="text-sm text-gray-500 ml-2">
            {{ $filters.formatDate(post.date) }}
          </div>
        </div>
        <div class="space-x-1">
          <!--          <button-->
          <!--            type="button"-->
          <!--            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#106ba3] hover:bg-[#0b517c]/[0.2] focus:outline-none"-->
          <!--          >-->
          <!--            <ShareIcon />-->
          <!--            Chia sẻ-->
          <!--          </button>-->

          <!--          <button-->
          <!--            type="button"-->
          <!--            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#106ba3] hover:bg-[#0b517c]/[0.2] focus:outline-none"-->
          <!--          >-->
          <!--            <RepostIcon />-->
          <!--            Đăng lại-->
          <!--          </button>-->

          <!--          <button-->
          <!--            type="button"-->
          <!--            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#106ba3] hover:bg-[#0b517c]/[0.2] focus:outline-none"-->
          <!--          >-->
          <!--            <ReplyIcon class="mr-1" />-->
          <!--            Bình luận-->
          <!--          </button>-->
        </div>
      </div>
      <div>
        <div v-html="post.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { DialogTitle } from '@headlessui/vue'

export default {
  name: 'NewDetail',

  components: {
    DialogTitle,
  },

  setup() {
    // Data
    const route = useRoute()
    const post = ref(null)
    const postID = route.params.id

    // Methods
    const fetchPost = async () => {
      post.value = await (await axios.get(`/news/${postID}/`)).data
    }

    // Hooks
    onMounted(() => {
      fetchPost()
    })

    return {
      post,
    }
  },
}
</script>
