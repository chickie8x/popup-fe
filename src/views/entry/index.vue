<template>
  <TransitionRoot as="template" :show="true">
    <Dialog as="div" class="fixed z-10 inset-0">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all p-4 w-full h-screen"
          >
            <router-view />
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, TransitionRoot, TransitionChild } from '@headlessui/vue'
</script>
