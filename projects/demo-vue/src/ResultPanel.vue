<script setup lang="ts">
import { formatResultValueHtml, t, type SandboxResult } from 'bx-rest-demo-shared'

defineProps<{ results: SandboxResult[] }>()
</script>

<template>
  <p v-if="results.length === 0" class="result-panel__empty">
    {{ t.results.empty }}
  </p>
  <div v-else class="result-panel">
    <div v-for="result in results" :key="result.callId" :class="['result-card', `result-card--${result.status}`]">
      <div class="result-card__header">
        <span>{{ t.results.callLabel(result.callId) }}</span>
        <span>{{ t.results.status[result.status] }}</span>
      </div>
      <!-- formatResultValueHtml сама экранирует данные ответа и оборачивает
           только JSON-токены в <span> — безопасно вставлять через v-html. -->
      <pre v-if="result.status !== 'pending'" class="result-card__body" v-html="formatResultValueHtml(result.value)"></pre>
    </div>
  </div>
</template>
