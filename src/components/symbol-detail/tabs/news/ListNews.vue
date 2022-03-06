<template>
    <div
        class="w-full h-full overflow-scroll flex flex-col divide-y bg-gray-100"
        ref="scrollElement"
        @scroll="sendEmit"
    >
        <ListNewsItem v-for="(item, index) in listItems" :key="index" :post="item" />
    </div>
</template>

<script>
import ListNewsItem from "./ListNewsItem.vue";
import { ref } from 'vue'
export default {
    props: ['listItems'],
    components: { ListNewsItem },

    setup(_, context) {
        const scrollElement = ref(null)
        const scrollH=ref(1500)
        function sendEmit(e) {
            const element = scrollElement.value
            if (element.scrollTop > scrollH.value) {
                context.emit('loadmoreposts')
                scrollH.value +=1500
            }  
        }
        return {
            sendEmit,
            scrollElement,
            scrollH,
        }
    }
}
</script>
