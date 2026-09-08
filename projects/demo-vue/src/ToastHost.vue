<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { onStorageWarning, t } from 'bx-rest-demo-shared'

const AUTO_HIDE_MS = 7000

// Слушает предупреждения о сбоях хранилища (см. bx-rest-demo-shared/notifications.ts)
// и показывает короткий тост — полная ошибка уже ушла в консоль на момент события.
const message = ref<string | null>(null)
let unsubscribe: (() => void) | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function close() {
  message.value = null
  if (hideTimer) clearTimeout(hideTimer)
}

onMounted(() => {
  unsubscribe = onStorageWarning(warning => {
    message.value = warning.message
    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = setTimeout(() => (message.value = null), AUTO_HIDE_MS)
  })
})

onBeforeUnmount(() => {
  unsubscribe?.()
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <div v-if="message" class="toast" role="alert">
    <span>{{ message }}</span>
    <button type="button" class="toast__close" :aria-label="t.toast.close" @click="close">×</button>
  </div>
</template>
