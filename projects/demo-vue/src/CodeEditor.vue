<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { configureBxRestTypes, DEFAULT_EDITOR_OPTIONS } from 'bx-rest-demo-shared'

const code = defineModel<string>({ required: true })

const container = ref<HTMLDivElement | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

onMounted(() => {
  configureBxRestTypes(monaco)

  if (!container.value) return
  editor = monaco.editor.create(container.value, {
    ...DEFAULT_EDITOR_OPTIONS,
    value: code.value,
    theme: 'vs-dark'
  })

  editor.onDidChangeModelContent(() => {
    code.value = editor?.getValue() ?? ''
  })
})

onBeforeUnmount(() => {
  editor?.dispose()
})

// Подстановка сниппета извне (клик по RecipePicker) — обновляем модель
// редактора, только если значение реально отличается, иначе получим
// бесконечный setValue <-> onDidChangeModelContent.
watch(code, next => {
  if (editor && editor.getValue() !== next) {
    editor.setValue(next)
  }
})
</script>

<template>
  <div ref="container" class="code-editor" style="height: 360px"></div>
</template>
