<template>
  <div class=" w-full flex flex-col divide-y bg-gray-100 overflow-auto">
    <div class=" p-2 flex items-start w-full" v-for="newsItem in newsItems" :key="newsItem.id">
      <div class="news-thumbnail w-[100px] h-[100px]">
        <img class=" object-cover w-[100px] h-[100px]" :src= newsItem.images[0].imageUrl  alt="">
      </div>
      <div class="general-info ml-2 flex-1">
        <p class="mb-2">
          <span class="text-sm mr-1">{{ newsItem.taggedSymbols[0].symbol }}</span>
          <span class=" text-green-600 text-sm">+{{ newsItem.taggedSymbols[0].percentChange.toFixed(2) }}%</span>
        </p>
        <p class=" text-base font-semibold mb-2">{{ newsItem.title }}</p>
        <div class=" flex justify-between">
          <p class="text-sm text-gray-500">{{ new Date(newsItem.date).toLocaleDateString() }} lúc {{ new Date(newsItem.date).toLocaleTimeString() }}</p>
          <div class="flex items-center space-x-2 text-sm text-gray-400">
            <svg fill="#a7b6c2" data-icon="thumbs-up" width="14" height="14" viewBox="0 0 16 16"><desc>thumbs-up</desc><path d="M15.99 9.62c-.08-.58-.73-.96-1.43-1.05-.15-.02-.32-.04-.49-.05.06-.01.11-.01.16-.02.71-.08 1.23-.47 1.15-1.05-.08-.58-.73-.96-1.43-1.05-.34-.04-.72-.07-1.13-.09h-.01c-.24-.01-.49-.02-.75-.02-.48-.02-1.11-.04-1.59-.08-.36-.03-.41-.28-.37-.53.35-.9.54-1.91.5-2.91-.04-.85-.6-1.68-1.41-1.77-.67-.07-1.16.39-.99.98C8.76 3.91 6.13 6.2 4 7.49v6c1.66 1.03 4.35 1.56 7.48 1.5.19 0 .39-.01.62-.02h.09c.22-.01.46-.03.73-.05.71-.06 1.54-.51 1.5-1.09-.03-.51-.4-.79-.87-.93.27-.02.54-.04.79-.06.71-.06 1.24-.45 1.17-1.04-.06-.58-.7-.97-1.41-1.07-.02 0-.05-.01-.07-.01.29-.02.57-.03.81-.05.71-.03 1.23-.47 1.15-1.05zM2 7H0v7h2c.55 0 1-.45 1-1V8c0-.56-.45-1-1-1z" fill-rule="evenodd"></path></svg>
            <span>{{ newsItem.totalLikes }}</span>
            <svg fill="#a7b6c2" data-icon="chat" width="14" height="14" viewBox="0 0 16 16"><desc>chat</desc><path d="M6 10c-1.1 0-2-.9-2-2V3H1c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1v2a1.003 1.003 0 001.71.71L5.41 13H10c.55 0 1-.45 1-1v-1.17l-.83-.83H6zm9-10H6c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h4.59l2.71 2.71c.17.18.42.29.7.29.55 0 1-.45 1-1V9c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1z" fill-rule="evenodd"></path></svg>
            <span>{{ newsItem.totalShares }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
export default {
  name: 'News',

  setup(){
    const newsItems = ref([])
    axios.get('/api/posts?symbol=ACB&type=1&offset=0&limit=20')
      .then((res)=>{
        newsItems.value = res.data
        for( const item of newsItems.value){
          if(item.images[0].imageUrl === null){
            const imageID = item.images[0].imageID
            item.images[0].imageUrl=`https://static.fireant.vn/posts/image/${imageID}`
          }
          console.log(item.images[0].imageUrl)
        }
      })
      .catch((err)=>{
        console.log(err)
      })



      return {
        newsItems,
      }
  }
}
</script>
