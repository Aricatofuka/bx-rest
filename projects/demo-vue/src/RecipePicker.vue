<script setup lang="ts">
import { recipes, type Recipe } from 'bx-rest-demo-shared'

const emit = defineEmits<{ pick: [recipe: Recipe] }>()
</script>

<template>
  <div class="recipe-picker">
    <button
      v-for="recipe in recipes"
      :key="recipe.id"
      type="button"
      class="recipe-picker__item"
      :title="recipe.description"
      @click="emit('pick', recipe)"
    >
      {{ recipe.title }}
    </button>
  </div>
</template>
