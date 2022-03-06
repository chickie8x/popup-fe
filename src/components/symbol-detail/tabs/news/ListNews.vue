<template>
    <div
        class="w-full h-full overflow-scroll flex flex-col divide-y bg-gray-100"
        ref="scrollElement"
        @scroll="sendEmit"
    >
        <ListNewsItem v-for="(item, index) in listItems" :key="index" :post="item" />
    </div>
    <button @click="sendEmit">Send Emit</button>
</template>

<script>
import ListNewsItem from "./ListNewsItem.vue";
import { ref, onMounted, onUnmounted } from 'vue'
export default {
    props: ['listItems'],
    components: { ListNewsItem },

    setup(_, context) {
        const scrollElement = ref(null)
        function sendEmit(e) {
            const element = scrollElement.value
            if (element.getBoundingClientRect().bottom < window.innerHeight) {
                context.emit('loadmoreposts')
            }  
        }
        return {
            sendEmit,
            scrollElement,
        }
    }
}
</script>
