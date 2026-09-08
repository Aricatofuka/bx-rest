<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import {
  applyConnection,
  EMPTY_CONNECTION,
  isConnectionValid,
  loadConnection,
  mergeSandboxResult,
  recipes,
  runSnippet,
  saveConnection,
  t,
  type SandboxResult
} from 'bx-rest-demo-shared'
import { BxRestKey } from './bxRestPlugin'
import ConnectionForm from './ConnectionForm.vue'
import RecipePicker from './RecipePicker.vue'
import CodeEditor from './CodeEditor.vue'
import ResultPanel from './ResultPanel.vue'
import ToastHost from './ToastHost.vue'

const bxRest = inject(BxRestKey)
if (!bxRest) throw new Error('bxRestPlugin не установлен — проверьте app.use(bxRestPlugin) в main.ts')

const connection = ref({ ...EMPTY_CONNECTION })
const applied = ref(false)
const isValid = computed(() => isConnectionValid(connection.value))

onMounted(() => {
  const saved = loadConnection()
  if (saved) {
    connection.value = saved
    if (isConnectionValid(saved)) {
      applyConnection(saved)
      applied.value = true
    }
  }
})

function connect() {
  if (!isConnectionValid(connection.value)) return
  applyConnection(connection.value)
  saveConnection({ ...connection.value })
  applied.value = true
}

const code = ref(recipes[0].code)
const results = ref<SandboxResult[]>([])

function run() {
  results.value = []
  runSnippet(code.value, {
    bxRest,
    onResult: result => {
      results.value = mergeSandboxResult(results.value, result)
    }
  })
}
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1>{{ t.app.title('Vue') }}</h1>
      <p>{{ t.app.subtitle }}</p>
    </header>

    <ConnectionForm v-model="connection" :applied="applied" :is-valid="isValid" @connect="connect" />

    <main class="app__main">
      <section class="app__editor">
        <RecipePicker @pick="recipe => (code = recipe.code)" />
        <CodeEditor v-model="code" />
        <button type="button" class="run-button" :disabled="!applied" @click="run">{{ t.editor.runButton }}</button>
        <p v-if="!applied" class="app__hint">{{ t.editor.connectFirstHint }}</p>
      </section>

      <section class="app__results">
        <h2>{{ t.results.heading }}</h2>
        <ResultPanel :results="results" />
      </section>
    </main>

    <ToastHost />
  </div>
</template>
